class GameLogic {
    
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
        // TODO
        return false;
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
