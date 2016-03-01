class TargetLogic {
    
    public findEntity(context: GameContext, targetKey: EntityReference): Entity {
        var targetId: number = targetKey.getId();
        var environmentResult: Entity = this.findInEnvironment(context, targetKey);
        if (environmentResult != null) {
            return environmentResult;
        }
        var players: Player[] = context.getPlayers();
        for (var i: number = 0; i < players.length; ++i) {
            var player: Player = players[i];
            if (player.getHero().getId() == targetId) {
                return player.getHero();
            } else if (player.getHero().getWeapon() != null && player.getHero().getWeapon().getId() == targetId) {
                return player.getHero().getWeapon();
            } else if (player.getHero().getDestroyedWeapon() != null && player.getHero().getDestroyedWeapon().getId() == targetId) {
                return player.getHero().getDestroyedWeapon();
            }
            
            var minions: Minion[] = player.getMinions();
            for (var j: number = 0; j < minions.length; ++j) {
                var minion: Minion = minions[j];
                if (minion.getId() == targetId) {
                    return minion;
                }
            }
            
            var graveyard: Entity[] = player.getGraveyard();
            for (var j: number = 0; j < graveyard.length; ++j) {
                var entity: Entity = graveyard[j];
                if (entity.getId() == targetId) {
                    return entity;
                }
            }
            
            var setAsideZone: Entity[] = player.getSetAsideZone();
            for (var j: number = 0; j < setAsideZone.length; ++j) {
                var entity: Entity = setAsideZone[j];
                if (entity.getId() == targetId) {
                    return entity;
                }
            }
        }
    }
    
    public findInEnvironment(context: GameContext, targetKey: EntityReference): Entity {
        var targetId: number = targetKey.getId();
        if (context.getEnvironment().has(Environment.SUMMONED_WEAPON) && targetKey == context.getEnvironment().get(Environment.SUMMONED_WEAPON)) {
            var reference: EntityReference = <EntityReference> context.getEnvironment().get(Environment.SUMMONED_WEAPON);
            var summonedWeapon: Actor = <Actor> context.resolveSingleTarget(reference);
            if (summonedWeapon.getId() == targetId) {
                return summonedWeapon;
            }
        }
        if (!context.getEventTargetStack().isEmpty() && targetKey == EntityReference.EVENT_TARGET) {
            return context.resolveSingleTarget(context.getEventTargetStack().peek());
        }
        return null;
    }
    
}