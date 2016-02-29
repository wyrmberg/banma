class GameContext {
    
    public static PLAYER_1: number = 0;
    public static PLAYER_2: number = 1;
    
    private players: Player[];
    private logic: GameLogic;
    private cardCostModifiers: CardCostModifier[] = [];
    
    constructor(player1: Player, player2: Player, logic: GameLogic) {
        this.getPlayers()[GameContext.PLAYER_1] = player1;
        player1.setId(GameContext.PLAYER_1);
        this.getPlayers()[GameContext.PLAYER_2] = player2;
        player2.setId(GameContext.PLAYER_2);
        
        this.logic = logic;
        this.logic.setContext(this);
    }
    
    public getCardCostModifiers(): CardCostModifier[] {
        return this.cardCostModifiers;
    }
    
    public getMinionCount(player: Player): number {
        return player.getMinions().length;
    }
    
    public getOpponent(player: Player): Player {
        return player.getId() == GameContext.PLAYER_1 ? this.getPlayer2() : this.getPlayer1();
    }
    
    public getPlayer(index: number): Player {
        return this.players[index];
    }
    
    public getPlayer1(): Player {
        return this.getPlayers()[GameContext.PLAYER_1];
    }
    
    public getPlayer2(): Player {
        return this.getPlayers()[GameContext.PLAYER_2];
    }
    
    public getPlayers(): Player[] {
        return this.players;
    }
    
    public getTotalMinionCount(): number {
        var totalMinionCount: number = 0;
        for (var i: number = 0; i < this.players.length; ++i) {
            totalMinionCount += this.getMinionCount(this.players[i]);
        }
        return totalMinionCount;
    }
    
    public resolveCardReference(cardReference: CardReference): Card {
        // TODO
        return null;
    }
    
}
