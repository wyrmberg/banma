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
    
    public findCardinCollection(cardCollection: CardCollection, cardId: number): Card {
        var cards: Card[] = cardCollection.iterator();
        for (var i: number = 0; i < cards.length; ++i) {
            var card: Card = cards[i];
            if (card.getId() == cardId) {
                return card;
            }
        }
        return null;
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
    
    public getPendingCard(): Card {
        // TODO
        return null;
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
        var player: Player = this.getPlayer(cardReference.getPlayerId());
        if (this.getPendingCard() != null && this.getPendingCard().getCardReference().equals(cardReference)) {
            return this.getPendingCard();
        }
        var location: CardLocation = cardReference.getLocation();
        if (location == CardLocation.DECK) {
            return this.findCardinCollection(player.getDeck(), cardReference.getCardId());
        }
        if (location == CardLocation.HAND) {
            return this.findCardinCollection(player.getHand(), cardReference.getCardId());
        }
        if (location == CardLocation.PENDING) {
            return this.getPendingCard();
        }
        if (location == CardLocation.HERO_POWER) {
            return player.getHero().getHeroPower();
        }
        
        return null;
    }
    
}
