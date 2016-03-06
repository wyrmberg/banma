abstract class GameEvent {
    
    private context: GameContext;
    private triggerLayer: TriggerLayer = TriggerLayer.DEFAULT;
    private playerId: number;
    
    constructor(context: GameContext, playerId: number) {
        this.context = context;
        this.playerId = playerId;
    }
    
    public setTriggerLayer(triggerLayer: TriggerLayer): void {
        this.triggerLayer = triggerLayer;
    }
    
}