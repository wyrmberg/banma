class CardCollection {
    
    private cards: List<Card>;
    
    public toList(): List<Card> {
        return new List<Card>(this.cards);
    }
    
}