abstract class Entity {
    
    private name: string;
    protected attributes: { [index: number]: any };
    private id: number = IdFactory.UNASSIGNED;
    private ownerId: number = -1;
    
    public getAttributeValue(attribute: Attribute): number {
        var value: any = this.attributes[attribute];
        return value != null ? value : 0;
    }
    
    public getId(): number {
        return this.id;
    }
    
    public getName(): string {
        return this.name;
    }
    
    public getOwner(): number {
        return this.ownerId;
    }
    
    public hasAttribute(attribute: Attribute): boolean {
        var value: any = this.attributes[attribute];
        if (value == null) {
            return false;
        }
        if (!isNaN(parseFloat(value)) && isFinite(value)) { // IsNumeric
            return value != 0;
        }
        return true;
    }
    
    public isDestroyed(): boolean {
        return this.hasAttribute(Attribute.DESTROYED);
    }
    
}
