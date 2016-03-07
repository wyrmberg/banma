interface IGameEventListener {
    
    canFire(event: GameEvent): boolean;
    
    getHostReference(): EntityReference;
    
    getLayer(): TriggerLayer;
    
    getOwner(): number;
    
    interestedIn(eventType: GameEventType): boolean;
    
    isExpired(): boolean;
    
    onAdd(context: GameContext): void;
    
    onGameEvent(event: GameEvent): void;
    
    onRemove(context: GameContext): void;
    
    setHost(host: Entity): void;
    
    setOwner(playerIndex: number): void;
    
}