class EntityReference {
    
    private key: number;
    
    constructor(key: number) {
        this.key = key;
    }
    
    public getId(): number {
        return this.key;
    }
    
}