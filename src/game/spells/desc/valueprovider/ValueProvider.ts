abstract class ValueProvider {
    
    protected desc: ValueProviderDesc;
    
    constructor(desc: ValueProviderDesc) {
        this.desc = desc;
    }
    
    public getValue(context: GameContext, player: Player, target: Entity, host: Entity): number
    {
        var targetPlayer: TargetPlayer = <TargetPlayer> this.desc.get(ValueProviderArg.TARGET_PLAYER);
        var providingPlayer: Player = targetPlayer == null || targetPlayer == TargetPlayer.SELF ? player : context.getOpponent(player);
        var multiplier: number = this.desc.contains(ValueProviderArg.MULTIPLIER) ? this.desc.getInt(ValueProviderArg.MULTIPLIER) : 1;
        var offset: number = this.desc.contains(ValueProviderArg.OFFSET) ? this.desc.getInt(ValueProviderArg.OFFSET) : 0;
        var value: number = this.provideValue(context, providingPlayer, target, host) * multiplier + offset;
        return value;
    }
    
    protected abstract provideValue(context: GameContext, player: Player, target: Entity, host: Entity): number;
    
}