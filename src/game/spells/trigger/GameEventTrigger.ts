abstract class GameEventTrigger {
    
    private owner: number = -1;
    protected desc: EventTriggerDesc;
    
    constructor(desc: EventTriggerDesc) {
        this.desc = desc;
    }
    
    protected abstract fire(event: GameEvent, host: Entity): boolean;
    
    public fires(event: GameEvent, host: Entity): boolean {
        // TODO
        return false;
    }
    
    public getOwner(): number {
        return this.owner;
    }
    
    public abstract interestedIn(): GameEventType;
    
    public setOwner(playerIndex: number): void {
        this.owner = playerIndex;
    }
    
}