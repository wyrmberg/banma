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
    
    public getActionType(): ActionType {
        return this.actionType
    }
    
    public getEventSource(): Entity {
        return this.getSource();
    }
    
    public getEventTarget(): Entity {
        return this.getTarget();
    }
    
    public getEventType(): GameEventType {
        return GameEventType.TARGET_ACQUISITION;
    }
    
    public getSource(): Entity {
        return this.source;
    }
    
    public getTarget(): Entity {
        return this.target;
    }
    
}