class SpellDesc extends Desc<SpellArg> {
    
    constructor(_arguments: Map<SpellArg, any>) {
        super(_arguments);
    }
    
    public getEntityFilter(): EntityFilter {
        return <EntityFilter> this.get(SpellArg.FILTER);
    }
    
    public getSpellClass(): typeof Spell {
        return this.arguments.get(SpellArg.CLASS);
    }
    
    public getTarget(): EntityReference {
        return <EntityReference> this.arguments.get(SpellArg.TARGET);
    }
    
    public getTargetPlayer(): TargetPlayer {
        return <TargetPlayer> this.get(SpellArg.TARGET_PLAYER);
    }
    
    public hasPredefinedTarget(): boolean {
        return this.arguments.get(SpellArg.TARGET) != null;
    }
    
}