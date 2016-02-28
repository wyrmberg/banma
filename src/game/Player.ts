class Player {
    
    private id: number = -1;
    
    private mana: number;
    private minions: Minion[] = [];
    
    setId(id: number) {
        this.id = id;
    }
    
    getMana(): number {
        return this.mana;
    }
    
    getMinions(): Minion[] {
        return this.minions;
    }
    
}
