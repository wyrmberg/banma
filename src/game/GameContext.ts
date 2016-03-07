class GameContext {
    
    public static PLAYER_1: number = 0;
    public static PLAYER_2: number = 1;
    
    private players: Player[];
    private logic: GameLogic;
    private targetLogic: TargetLogic = new TargetLogic();
    private triggerManager: TriggerManager = new TriggerManager();
    private environment: Map<Environment, any> = new Map<Environment, any>();
    private cardCostModifiers: CardCostModifier[] = [];
    
    protected activePlayer: number = -1;
    
    private doIgnoreEvents: boolean;
    
    constructor(player1: Player, player2: Player, logic: GameLogic) {
        this.getPlayers()[GameContext.PLAYER_1] = player1;
        player1.setId(GameContext.PLAYER_1);
        this.getPlayers()[GameContext.PLAYER_2] = player2;
        player2.setId(GameContext.PLAYER_2);
        
        this.logic = logic;
        this.logic.setContext(this);
    }
    
    public findCardinCollection(cardCollection: CardCollection, cardId: number): Card {
        var cards: List<Card> = cardCollection.toList();
        for (var i: number = 0; i < cards.size(); ++i) {
            var card: Card = cards.get(i);
            if (card.getId() == cardId) {
                return card;
            }
        }
        return null;
    }
    
    public fireGameEvent(gameEvent: GameEvent): void {
        this.fireGameEventLayer(gameEvent, TriggerLayer.SECRET);
        this.fireGameEventLayer(gameEvent, TriggerLayer.DEFAULT);
    }
    
    public fireGameEventLayer(gameEvent: GameEvent, layer: TriggerLayer): void {
        if (this.ignoreEvents()) {
            return;
        }
        gameEvent.setTriggerLayer(layer);
        this.triggerManager.fireGameEvent(gameEvent);
    }
    
    public getActivePlayer(): Player {
        return this.getPlayer(this.activePlayer);
    }
    
    public getActivePlayerId(): number {
        return this.activePlayer;
    }
    
    public getAdjacentMinions(player: Player, minionReference: EntityReference): List<Actor> {
        var adjacentsMinions: List<Actor> = new List<Actor>();
        var minion: Actor = <Actor> this.resolveSingleTarget(minionReference);
        var minions: List<Minion> = this.getPlayer(minion.getOwner()).getMinions();
        var index: number = minions.indexOf(minion);
        if (index == -1) {
            return null;
        }
        var left: number = index - 1;
        var right: number = index + 1;
        if (left > -1 && left < minions.size()) {
            adjacentsMinions.add(minions.get(left));
        }
        if (right > -1 && right < minions.size()) {
            adjacentsMinions.add(minions.get(right));
        }
        return adjacentsMinions;
    }
    
    public getCardCostModifiers(): CardCostModifier[] {
        return this.cardCostModifiers;
    }
    
    public getEnvironment(): Map<Environment, any> {
        return this.environment;
    }
    
    public getEventTargetStack(): Stack<EntityReference> {
        if (!this.environment.has(Environment.EVENT_TARGET_REFERENCE_STACK)) {
            this.environment.set(Environment.EVENT_TARGET_REFERENCE_STACK, new Stack<EntityReference>());
        }
        return <Stack<EntityReference>> this.environment.get(Environment.EVENT_TARGET_REFERENCE_STACK);
    }
    
    public getLogic(): GameLogic {
        return this.logic;
    }
    
    public getMinionCount(player: Player): number {
        return player.getMinions().size();
    }
    
    public getOpponent(player: Player): Player {
        return player.getId() == GameContext.PLAYER_1 ? this.getPlayer2() : this.getPlayer1();
    }
    
    public getPendingCard(): Card {
        return <Card> this.resolveSingleTarget(<EntityReference> this.getEnvironment().get(Environment.PENDING_CARD));
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
    
    public ignoreEvents(): boolean {
        return this.doIgnoreEvents;
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
    
    public resolveSingleTarget(targetKey: EntityReference): Entity {
        if (targetKey == null) {
            return null;
        }
        return this.targetLogic.findEntity(this, targetKey);
    }
    
}
