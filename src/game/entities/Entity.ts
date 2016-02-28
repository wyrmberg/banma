abstract class Entity {
    
    protected attributes: { [index: number]: any };
    
    public getAttributeValue(attribute: Attribute): number {
        var value: any = this.attributes[attribute];
        return value != null ? value : 0;
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
