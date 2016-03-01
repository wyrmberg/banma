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
    
}
