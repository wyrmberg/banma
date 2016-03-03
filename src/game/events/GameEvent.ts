abstract class GameEvent {
    
    private context: GameContext;
    private playerId: number;
    
    constructor(context: GameContext, playerId: number) {
        this.context = context;
        this.playerId = playerId;
    }
    
}