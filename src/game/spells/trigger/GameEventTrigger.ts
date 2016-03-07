abstract class GameEventTrigger {
    
    private owner: number = -1;
    protected desc: EventTriggerDesc;
    
    constructor(desc: EventTriggerDesc) {
        this.desc = desc;
    }
    
    protected determineTargetPlayer(event: GameEvent, targetPlayer: TargetPlayer, host: Entity, triggerOwner: number): boolean {
        // -1 means the event should fire for all players
        if (event.getPlayerId() == -1) {
            return true;
        }
        switch (targetPlayer) {
            case TargetPlayer.ACTIVE:
                return event.getGameContext().getActivePlayerId() == triggerOwner;
            case TargetPlayer.INACTIVE:
                return event.getGameContext().getActivePlayerId() != triggerOwner;
            case TargetPlayer.BOTH:
                return true;
            case TargetPlayer.OPPONENT:
                return event.getPlayerId() != triggerOwner;
            case TargetPlayer.OWNER:
                return host.getOwner() == triggerOwner;
            case TargetPlayer.SELF:
                return event.getPlayerId() == triggerOwner;
            default:
                break;
        }
        return true;
    }
    
    protected abstract fire(event: GameEvent, host: Entity): boolean;
    
    public fires(event: GameEvent, host: Entity): boolean {
        var ownTurnOnly: boolean = this.desc.getBool(EventTriggerArg.OWN_TURN_ONLY);
        if (ownTurnOnly && event.getGameContext().getActivePlayerId() != this.getOwner()) {
            return false;
        }
        
        var targetPlayer: TargetPlayer = this.desc.getTargetPlayer();
        if (targetPlayer != null && !this.determineTargetPlayer(event, targetPlayer, host, this.getOwner())) {
            return false;
        }
        
        var breakStealth: boolean = this.desc.getBool(EventTriggerArg.BREAKS_STEALTH);
        if (breakStealth) {
            event.getGameContext().getLogic().removeAttribute(host, Attribute.STEALTH);
        }
        
        var hostTargetType: TargetType = <TargetType> this.desc.get(EventTriggerArg.HOST_TARGET_TYPE);
        if (hostTargetType == TargetType.IGNORE_AS_TARGET && event.getEventTarget() == host) {
            return false;
        } else if (hostTargetType == TargetType.IGNORE_AS_SOURCE && event.getEventSource() == host) {
            return false;
        } else if (hostTargetType == TargetType.IGNORE_OTHER_TARGETS && event.getEventTarget() != host) {
            return false;
        } else if (hostTargetType == TargetType.IGNORE_OTHER_SOURCES && event.getEventSource() != host) {
            return false;
        }
        
        var condition: Condition = <Condition> this.desc.get(EventTriggerArg.CONDITION);
        var owner: Player = event.getGameContext().getPlayer(this.getOwner());
        if (condition != null && !condition.isFullfilled(event.getGameContext(), owner, event.getEventTarget())) {
            return false;
        }
        return this.fire(event, host);
    }
    
    public getOwner(): number {
        return this.owner;
    }
    
    public abstract interestedIn(): GameEventType;
    
    public setOwner(playerIndex: number): void {
        this.owner = playerIndex;
    }
    
}