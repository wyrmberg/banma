class SpellCard extends Card {
    
    private targetRequirement: TargetSelection;
    private condition: Condition;
    
    public canBeCast(context: GameContext, player:Player) {
        var opponent: Player = context.getOpponent(player);
        if (this.targetRequirement == TargetSelection.ENEMY_MINIONS) {
            return context.getMinionCount(opponent) > 0;
        }
        if (this.targetRequirement == TargetSelection.FRIENDLY_MINIONS) {
            return context.getMinionCount(player) > 0;
        }
        if (this.targetRequirement == TargetSelection.MINIONS) {
            return context.getTotalMinionCount() > 0;
        }
        
        if (this.condition != null) {
            return this.condition.isFullfilled(context, player, null);
        }
        
        return true;
    }
    
}