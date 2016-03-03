class GameLogic {

	public static MAX_PLAYERS: number = 2;
	public static MAX_MINIONS: number = 7;
	public static MAX_HAND_CARDS: number = 10;
	public static MAX_HERO_HP: number = 30;
	public static STARTER_CARDS: number = 3;
	public static MAX_MANA: number = 10;
	public static MAX_SECRETS: number = 5;
	public static DECK_SIZE: number = 30;
	public static MAX_DECK_SIZE: number = 60;
	public static TURN_LIMIT: number = 100;

	public static WINDFURY_ATTACKS: number = 2;
	public static MEGA_WINDFURY_ATTACKS: number = 4;

    private targetLogic: TargetLogic = new TargetLogic();
    private actionLogic: ActionLogic = new ActionLogic();
    private spellFactory: SpellFactory = new SpellFactory();
    private ifFactory: IdFactory;
    private context: GameContext;
    
    setContext(context: GameContext) {
        this.context = context;
    }
    
    public canPlayCard(playerId: number, cardReference: CardReference) {
        var player: Player = this.context.getPlayer(playerId);
        var card: Card = this.context.resolveCardReference(cardReference);
        var manaCost: number = this.getModifiedManaCost(player, card);
        if (player.getMana() < manaCost) {
            return false;
        }
        if (card.getCardType() == CardType.HERO_POWER) {
            var power: HeroPower = <HeroPower> card;
            var heroPowerUsages: number = this.getTotalAttributeValue(player, Attribute.HERO_POWER_USAGES);
            if (heroPowerUsages == 0) {
                heroPowerUsages = 1;
            }
            if (power.hasBeenUsed() >= heroPowerUsages) {
                return false;
            }
        }
        else if (card.getCardType() == CardType.MINION) {
            return this.canSummonMoreMinions(player);
        }
        
        if (card instanceof SpellCard) {
            var spellCard: SpellCard = <SpellCard> card;
            return spellCard.canBeCast(this.context, player);
        }
        return true;
    }
    
    public canPlaySecret(player: Player, card: SecretCard): boolean {
        return player.getSecrets().size < GameLogic.MAX_SECRETS && !player.getSecrets().has(card.getCardId());
    }
    
    public canSummonMoreMinions(player: Player): boolean {
        var minionsInPlay: number = 0;
        var minions: Minion[] = player.getMinions();
        for (var i: number = 0; i < minions.length; ++i) {
            var minion: Minion = minions[i];
            if (minion.isDestroyed()) {
                continue;
            }
            minionsInPlay++;
        }
        return minionsInPlay < GameLogic.MAX_MINIONS;
    }
    
    public castSpell(playerId: number, spellDesc: SpellDesc, sourceReference: EntityReference, targetReference: EntityReference, childSpell: boolean): void {
        var player: Player = this.context.getPlayer(playerId);
        var source: Entity = null;
        if (sourceReference != null) {
            source = this.context.resolveSingleTarget(sourceReference);
        }
        var spellCard: SpellCard = null;
        var spellTarget: EntityReference = spellDesc.hasPredefinedTarget() ? spellDesc.getTarget() : targetReference;
        var targets: List<Entity> = this.targetLogic.resolveTargetKey(this.context, player, source, spellTarget);
        // target can only be changed when there is one target
		// note: this code block is basically exclusively for the SpellBender
		// Secret, but it can easily be expanded if targets of area of effect
		// spell should be changeable as well
		var sourceCard: Card = null;
		if (source != null) {
		    sourceCard = source.getEntityType() == EntityType.CARD ? <Card> source : null;
		}
		if (sourceCard != null && this.isSpellCard(sourceCard.getCardType()) && !spellDesc.hasPredefinedTarget() && targets != null && targets.size() == 1) {
		    if (sourceCard instanceof SpellCard) {
		        spellCard = <SpellCard> sourceCard;
		    }
		    
		    if (spellCard != null && spellCard.getTargetRequirement() != TargetSelection.NONE && !childSpell) {
		        var spellTargetEvent: GameEvent = new TargetAquisitionEvent(this.context, playerId, ActionType.SPELL, spellCard, targets.get(0));
		        this.context.fireGameEvent(spellTargetEvent);
		        var targetOverride: Entity = this.context.resolveSingleTarget(<EntityReference> this.context.getEnvironment().get(Environment.TARGET_OVERRIDE));
		        if (targetOverride != null && targetOverride.getId() != IdFactory.UNASSIGNED) {
		            targets.remove(0);
		            targets.add(targetOverride);
		        }
		    }
		}
		
		var spell:Spell = this.spellFactory.getSpell(spellDesc);
		spell.cast(this.context, player, spellDesc, source, targets);
		
	    if (spellCard != null) {
	        this.context.getEnvironment().delete(Environment.TARGET_OVERRIDE);
	    }
    }
    
    public getModifiedManaCost(player: Player, card: Card): number {
        var manaCost: number = card.getManaCost(this.context, player);
        var minValue: number = 0;
        var costModifiers: CardCostModifier[] = this.context.getCardCostModifiers();
        for (var i: number = 0; i < costModifiers.length; ++i) {
            var costModifier: CardCostModifier = costModifiers[i];
            if (!costModifier.appliesTo(card)) {
                continue;
            }
            manaCost = costModifier.process(card, manaCost);
            if (costModifier.getMinValue() > minValue) {
                minValue = costModifier.getMinValue();
            }
        }
        if (card.hasAttribute(Attribute.MANA_COST_MODIFIER)) {
            manaCost += card.getAttributeValue(Attribute.MANA_COST_MODIFIER);
        }
        if (manaCost < minValue) {
            manaCost = minValue;
        }
        if (manaCost > 2147483647) {
            manaCost = 2147483647;
        }
        return manaCost;
    }
    
    public getTotalAttributeValue(player: Player, attr: Attribute): number {
        var total: number = player.getHero().getAttributeValue(attr);
        var minions: Minion[] = player.getMinions();
        for (var i: number = 0; i < minions.length; ++i) {
            var minion: Minion = minions[i];
            if (!minion.hasAttribute(attr))
            {
                continue;
            }
            
            total += minion.getAttributeValue(attr);
        }
        return total;
    }
    
    public isSpellCard(type: CardType) {
        if (type == CardType.CHOOSE_ONE || type == CardType.SPELL) {
            return true;
        }
        return false;
    }
    
}
