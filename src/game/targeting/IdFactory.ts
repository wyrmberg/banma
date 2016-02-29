class IdFactory {
    
    public static UNASSIGNED: number = -1;
    
    private id: number = 0;
    
    constructor() {
    }
    
    public generateId(): number {
        return ++this.id;
    }
    
}