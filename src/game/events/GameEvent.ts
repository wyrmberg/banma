abstract class GameEvent {
    
    private context: GameContext;
    private triggerLayer: TriggerLayer = TriggerLayer.DEFAULT;
    private playerId: number;
    
    constructor(context: GameContext, playerId: number) {
        this.context = context;
        this.playerId = playerId;
    }
    
    public getEventSource(): Entity {
        return null;
    }
    
    /**
	 * Spells may specify to be cast on the event target; this is dependent on
	 * the actual event. For example, a SummonEvent may return the summoned
	 * minion, a DamageEvent may return the damaged minion/hero, etc.
	 */
    public abstract getEventTarget(): Entity;
    
    public abstract getEventType(): GameEventType;
    
    public getGameContext(): GameContext {
        return this.context;
    }
    
    public getPlayerId(): number {
        return this.playerId;
    }
    
    public getTriggerLayer(): TriggerLayer {
        return this.triggerLayer;
    }
    
    public setTriggerLayer(triggerLayer: TriggerLayer): void {
        this.triggerLayer = triggerLayer;
    }
    
}