abstract class EntityFilter {
    
    protected desc: FilterDesc;
    
    constructor(desc: FilterDesc) {
        this.desc = desc;
    }
    
    public matches(context: GameContext, player: Player, entity: Entity): boolean {
        var invert: boolean = this.desc.getBool(FilterArg.INVERT);
        return this.test(context, player, entity) != invert;
    }
    
    protected abstract test(constext: GameContext, player: Player, entity: Entity): boolean;
    
}