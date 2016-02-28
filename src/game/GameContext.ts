class GameContext {
    
    public static PLAYER_1: number = 0;
    public static PLAYER_2: number = 1;
    
    private players: Player[];
    private logic: GameLogic;
    
    constructor(player1: Player, player2: Player, logic: GameLogic) {
        this.getPlayers()[GameContext.PLAYER_1] = player1;
        player1.setId(GameContext.PLAYER_1);
        this.getPlayers()[GameContext.PLAYER_2] = player2;
        player2.setId(GameContext.PLAYER_2);
        
        this.logic = logic;
        this.logic.setContext(this);
    }
    
    getPlayer(index: number): Player {
        return this.players[index];
    }
    
    getPlayer1(): Player {
        return this.getPlayers()[GameContext.PLAYER_1];
    }
    
    getPlayer2(): Player {
        return this.getPlayers()[GameContext.PLAYER_2];
    }
    
    getPlayers(): Player[] {
        return this.players;
    }
    
    resolveCardReference(cardReference: CardReference): Card {
        // TODO
        return null;
    }
    
}
