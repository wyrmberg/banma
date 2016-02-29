abstract class Condition {
    
    private desc: ConditionDesc;
    
    constructor(desc: ConditionDesc) {
        this.desc = desc;
    }
    
    protected abstract isFullfilledInner(context: GameContext, player: Player, desc: ConditionDesc, target: Entity): boolean;
    
    public isFullfilled(context: GameContext, player: Player, target: Entity): boolean {
        var invert: boolean = this.desc.getBool(ConditionArg.INVERT);
        return this.isFullfilledInner(context, player, this.desc, target) != invert;
    }
    
}