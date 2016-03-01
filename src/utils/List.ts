class List<T> {
    
    private list: T[];
    
    constructor() {
        this.list = [];
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
}