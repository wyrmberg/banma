class CardCostModifier implements IGameEventListener {
    
    public appliesTo(card: Card): boolean {
        // TODO
        return false;
    }
    
    public getMinValue(): number {
        // TODO
        return 0;
    }
    
    public process(card: Card, currentManaCost: number): number {
        // TODO
        return currentManaCost;
    }
    
}
