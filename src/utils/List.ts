class List<T> {
    
    private list: T[];
    
    constructor();
    constructor(list: List<T>);
    constructor(list?: List<T>) {
        this.list = [];
        if (list != null) {
            for (var i: number = 0; i < list.size(); ++i) {
                this.add(list[i]);
            }
        }
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
    
    public indexOf(element: T): number {
        return this.list.indexOf(element);
    }
    
    public remove(element: T): T {
        return this.removeAt(this.list.indexOf(element));
    }
    
    public removeAt(index: number): T {
        return this.list.splice(index, 1)[0];
    }
    
    public size(): number {
        return this.list.length;
    }
}