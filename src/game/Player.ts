class Player {
    
    private id: number = -1;
    
    private mana: number;
    
    setId(id: number) {
        this.id = id;
    }
    
    getMana(): number {
        return this.mana;
    }
    
}
