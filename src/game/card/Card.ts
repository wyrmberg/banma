abstract class Card extends Entity {
    
    private cardType: CardType;
    
    getCardType(): CardType {
        return this.cardType;
    }
    
}
