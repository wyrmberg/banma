class Player {
    
    private hero: Hero;
    
    private minions: Minion[] = [];
    
    private id: number = -1;
    
    private mana: number;
    
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
