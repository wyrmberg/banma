class List<T> {
    
    private list: T[];
    
    constructor() {
        this.list = [];
    }
    
    public add(element: T): void {
        this.list.push(element);
    }
    
    public isEmpty(): boolean {
        return this.list.length == 0;
    }
    
    public contains(element: T): boolean {
        for (var i: number = 0; i < this.list.length; ++i) {
            if (this.list[i] === element) {
                return true;
            }
        }
        return false;
    }
    
    public get(index: number): T {
        return this.list[index];
    }
    
    public remove(index: number): T {
        return this.list.splice(index, 1)[0];
    }
    
    public size(): number {
        return this.list.length;
    }
}