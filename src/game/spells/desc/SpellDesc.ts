class SpellDesc extends Desc<SpellArg> {
    
    constructor(_arguments: Map<SpellArg, any>) {
        super(_arguments);
    }
    
    public getTarget(): EntityReference {
        return <EntityReference> this.arguments.get(SpellArg.TARGET);
    }
    
    public hasPredefinedTarget(): boolean {
        return this.arguments.get(SpellArg.TARGET) != null;
    }
    
}