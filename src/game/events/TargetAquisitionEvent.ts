class TargetAquisitionEvent extends GameEvent {
    
    private target: Entity;
    private source: Entity;
    private actionType: ActionType;
    
    constructor(context: GameContext, playerId: number, actionType: ActionType, source: Entity, target: Entity) {
        super(context, playerId);
        this.actionType = actionType;
        this.source = source;
        this.target = target;
    }
    
}