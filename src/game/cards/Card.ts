abstract class Card extends Entity {
    
    private cardType: CardType
    private location: CardLocation;
    private manaCostModifier: ValueProvider;
    private cardId: string;
    
    public getBaseManaCost(): number {
        return this.getAttributeValue(Attribute.BASE_MANA_COST);
    }
    
    public getCardId(): string {
        return this.cardId;
    }
    
    public getCardReference(): CardReference {
        return new CardReference(this.getOwner(), this.getLocation(), this.getId(), this.getName());
    }
    
    public getCardType(): CardType {
        return this.cardType;
    }
    
    public getEntityType(): EntityType {
        return EntityType.CARD;
    }
    
    public getLocation(): CardLocation {
        return this.location;
    }
    
    public getManaCost(context: GameContext, player:Player): number {
        var actualManaCost: number = this.getBaseManaCost();
        if (this.manaCostModifier != null) {
            actualManaCost -= this.manaCostModifier.getValue(context, player, null, this);
        }
        return actualManaCost;
    }
    
}
