class CardReference {
    
    private playerId: number;
    private location: CardLocation;
    private cardId: number;
    private cardName: string;
    
    constructor(playerId: number, location: CardLocation, cardId: number, cardName: string) {
        this.playerId = playerId;
        this.location = location;
        this.cardId = cardId;
        this.cardName = cardName;
    }
    
    public equals(obj: any): boolean {
        if (!(obj instanceof CardReference)) {
            return false;
        }
        var cardReference: CardReference = <CardReference> obj;
        return cardReference.getCardId() == this.getCardId() && cardReference.getPlayerId() == cardReference.getPlayerId();
    }
    
    public getCardId(): number {
        return this.cardId;
    }
    
    public getCardName(): string {
        return this.cardName;
    }
    
    public getLocation(): number {
        return this.location;
    }
    
    public getPlayerId(): number {
        return this.playerId;
    }
    
    public toString(): string {
        return "[CardReference playerId:" + this.playerId + " cardName:" + this.cardName + " cardLocation:" + this.location + " cardId:" + this.cardId + "]";
    }
    
}
