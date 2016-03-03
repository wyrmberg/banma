class Desc<T> {
    
    protected arguments: Map<T, any>;
    
    constructor(args: Map<T, any>) {
        this.arguments = args;
    }
    
    public contains(arg: T): boolean {
        return this.arguments.has(arg);
    }
    
    public get(arg: T): any {
        return this.arguments.get(arg);
    }
    
    public getBool(arg: T): boolean {
        return this.arguments.has(arg) ? this.get(arg) : false;
    }
    
    public getInt(arg: T): number {
        return this.arguments.has(arg) ? this.get(arg) : 0;
    }
    
    public getString(arg: T): string {
        return this.arguments.has(arg) ? this.get(arg) : "";
    }
    
    public getValue(arg: T, context: GameContext, player: Player, target: Entity, host: Entity, defaultValue: number): number {
        var storedValue: any = this.arguments.get(arg);
        if (storedValue == null) {
            return defaultValue;
        }
        if (storedValue instanceof ValueProvider) {
            var valueProvider = <ValueProvider> storedValue;
            return valueProvider.getValue(context, player, target, host);
        }
        return storedValue;
    }
    
}