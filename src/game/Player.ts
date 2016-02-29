class Player {
    
    private name: string;
    private hero: Hero;
    
    private deck: CardCollection;
    private hand: CardCollection = new CardCollection();
    private minions: Minion[] = [];
    
    private id: number = -1;
    
    private mana: number;
    
    public getDeck(): CardCollection {
        return this.deck;
    }
    
    public getHand(): CardCollection {
        return this.hand;
    }
    
    public getHero(): Hero {
        return this.hero;
    }
    
    public getId(): number {
        return this.id;
    }
    
    public getMana(): number {
        return this.mana;
    }
    
    public getMinions(): Minion[] {
        return this.minions;
    }
    
    public setId(id: number) {
        this.id = id;
    }
    
}
