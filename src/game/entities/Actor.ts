abstract class Actor extends Entity {
    
    public getHp(): number {
        return this.getAttributeValue(Attribute.HP);
    }
    
    public isDestroyed(): boolean {
        return this.getHp() < 1 || super.isDestroyed();
    }
    
}
