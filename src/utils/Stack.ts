class Stack<T> {
    
    private stack: T[];
    
    constructor() {
        this.stack = [];
    }
    
    public isEmpty(): boolean {
        return this.stack.length == 0;
    }
    
    public peek(): T {
        return this.stack[0];
    }
    
}