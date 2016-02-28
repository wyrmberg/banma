abstract class Card extends Entity {
    
    private cardType: CardType
    private manaCostModifier: ValueProvider;
    
    public getBaseManaCost(): number {
        return this.getAttributeValue(Attribute.BASE_MANA_COST);
    }
    
    public getCardType(): CardType {
        return this.cardType;
    }
    
    public getManaCost(context: GameContext, player:Player): number {
        var actualManaCost: number = this.getBaseManaCost();
        if (this.manaCostModifier != null) {
            actualManaCost -= this.manaCostModifier.getValue(context, player, null, this);
        }
        return actualManaCost;
    }
    
}
