class Player {
    
    private name: string;
    private hero: Hero;
    
    private deck: CardCollection;
    private hand: CardCollection = new CardCollection();
    private setAsideZone: Entity[] = [];
    private graveyard: Entity[] = [];
    private minions: Minion[] = [];
    private secrets: Set<string> = new Set<string>();
    
    private id: number = -1;
    
    private mana: number;
    
    public getDeck(): CardCollection {
        return this.deck;
    }
    
    public getGraveyard(): Entity[] {
        return this.graveyard;
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
    
    public getSecrets(): Set<string> {
        return this.secrets;
    }
    
    public getSetAsideZone(): Entity[] {
        return this.setAsideZone;
    }
    
    public setId(id: number) {
        this.id = id;
    }
    
}
