class HeroPower extends SpellCard {
    
    private used: number;
    
    public hasBeenUsed(): number {
        return this.used;
    }
    
    public markUsed(): void {
        this.used++;
    }
    
}