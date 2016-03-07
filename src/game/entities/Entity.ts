abstract class Entity {
    
    private name: string;
    protected attributes: Map<Attribute, any> = new Map<Attribute, any>();
    private id: number = IdFactory.UNASSIGNED;
    private ownerId: number = -1;
    
    public getAttribute(attribute: Attribute): any {
        return this.attributes.get(attribute);
    }
    
    public getAttributes(): Map<Attribute, any> {
        return this.attributes;
    }
    
    public getAttributeValue(attribute: Attribute): number {
        return this.attributes.has(attribute) ? <number> this.attributes.get(attribute) : 0;
    }
    
    public abstract getEntityType(): EntityType;
    
    public getId(): number {
        return this.id;
    }
    
    public getName(): string {
        return this.name;
    }
    
    public getReference(): EntityReference {
        return EntityReference.pointTo(this);
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
    
    public modifyAttribute(attribute: Attribute, value: number): void {
        if (!this.attributes.has(attribute)) {
            this.setAttribute(attribute, 0);
        }
        this.setAttribute(attribute, this.getAttributeValue(attribute) + value);
    }
    
    public removeAttribute(attribute: Attribute): void {
        this.attributes.delete(attribute);
    }
    
    public setAttribute(attribute: Attribute, value: number): void {
        this.attributes.set(attribute, value);
    }
    
}
