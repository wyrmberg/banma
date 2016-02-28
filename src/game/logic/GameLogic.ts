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
        // TODO
        return 0;
    }
    
    public getTotalAttributeValue(player: Player, attr: Attribute): number {
        // TODO
        return 0;
    }
    
}
