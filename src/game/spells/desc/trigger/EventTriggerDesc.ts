class EventTriggerDesc extends Desc<EventTriggerArg> {
    
    public getSourcePlayer(): TargetPlayer {
        return <TargetPlayer> this.get(EventTriggerArg.SOURCE_PLAYER);
    }
    
    public getTargetPlayer(): TargetPlayer {
        return <TargetPlayer> this.get(EventTriggerArg.TARGET_PLAYER);
    }
    
}