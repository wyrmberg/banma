class TargetLogic {
    
    private static singleTargetAsList(target: Entity): List<Entity> {
        var list: List<Entity> = new List<Entity>();
        list.add(target);
        return list;
    }
    
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
            
            var minions: List<Minion> = player.getMinions();
            for (var j: number = 0; j < minions.size(); ++j) {
                var minion: Minion = minions.get(j);
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
    
    private getEntities(context: GameContext, player: Player, targetRequirement: TargetSelection): List<Entity> {
        // TODO
        return null;
    }
    
    public resolveTargetKey(context: GameContext, player: Player, source: Entity, targetKey: EntityReference): List<Entity> {
        if (targetKey == null || targetKey == EntityReference.NONE) {
            return null;
        }
        
        if (targetKey == EntityReference.ALL_CHARACTERS) {
            return this.getEntities(context, player, TargetSelection.ANY);
		} else if (targetKey == EntityReference.ALL_MINIONS) {
			return this.getEntities(context, player, TargetSelection.MINIONS);
		} else if (targetKey == EntityReference.ENEMY_CHARACTERS) {
			return this.getEntities(context, player, TargetSelection.ENEMY_CHARACTERS);
		} else if (targetKey == EntityReference.ENEMY_HERO) {
			return this.getEntities(context, player, TargetSelection.ENEMY_HERO);
		} else if (targetKey == EntityReference.ENEMY_MINIONS) {
			return this.getEntities(context, player, TargetSelection.ENEMY_MINIONS);
		} else if (targetKey == EntityReference.FRIENDLY_CHARACTERS) {
			return this.getEntities(context, player, TargetSelection.FRIENDLY_CHARACTERS);
		} else if (targetKey == EntityReference.FRIENDLY_HERO) {
			return this.getEntities(context, player, TargetSelection.FRIENDLY_HERO);
		} else if (targetKey == EntityReference.FRIENDLY_MINIONS) {
			return this.getEntities(context, player, TargetSelection.FRIENDLY_MINIONS);
		} else if (targetKey == EntityReference.OTHER_FRIENDLY_MINIONS) {
			var targets: List<Entity> = this.getEntities(context, player, TargetSelection.FRIENDLY_MINIONS);
			targets.remove(source);
			return targets;
		} else if (targetKey == EntityReference.ALL_OTHER_CHARACTERS) {
			var targets: List<Entity> = this.getEntities(context, player, TargetSelection.ANY);
			targets.remove(source);
			return targets;
		} else if (targetKey == EntityReference.ALL_OTHER_MINIONS) {
			var targets: List<Entity> = this.getEntities(context, player, TargetSelection.MINIONS);
			targets.remove(source);
			return targets;
		} else if (targetKey == EntityReference.ADJACENT_MINIONS) {
			return new List<Entity>(context.getAdjacentMinions(player, source.getReference()));
		} else if (targetKey == EntityReference.SELF) {
			return TargetLogic.singleTargetAsList(source);
		} else if (targetKey == EntityReference.EVENT_TARGET) {
			return TargetLogic.singleTargetAsList(context.resolveSingleTarget(context.getEventTargetStack().peek()));
		} else if (targetKey == EntityReference.TARGET) {
			return TargetLogic.singleTargetAsList(context.resolveSingleTarget(<EntityReference> context.getEnvironment().get(Environment.TARGET)));
		} else if (targetKey == EntityReference.KILLED_MINION) {
			return TargetLogic.singleTargetAsList(context.resolveSingleTarget(<EntityReference> context.getEnvironment().get(Environment.KILLED_MINION)));
		} else if (targetKey == EntityReference.ATTACKER_REFERENCE) {
			return TargetLogic.singleTargetAsList(context.resolveSingleTarget(<EntityReference> context.getEnvironment().get(Environment.ATTACKER_REFERENCE)));
		} else if (targetKey == EntityReference.PENDING_CARD) {
			return TargetLogic.singleTargetAsList(<Entity> context.getPendingCard());
		} else if (targetKey == EntityReference.FRIENDLY_WEAPON) {
			if (player.getHero().getWeapon() != null) {
				return TargetLogic.singleTargetAsList(player.getHero().getWeapon());
			} else {
				return new List<Entity>();
			}
		} else if (targetKey == EntityReference.ENEMY_WEAPON) {
			var opponent: Player = context.getOpponent(player);
			if (opponent.getHero().getWeapon() != null) {
				return TargetLogic.singleTargetAsList(opponent.getHero().getWeapon());
			} else {
				return new List<Entity>();
			}
		} else if (targetKey == EntityReference.FRIENDLY_HAND) {
			return new List<Entity>(player.getHand().toList());
		} else if (targetKey == EntityReference.ENEMY_HAND) {
			return new List<Entity>(context.getOpponent(player).getHand().toList());
		}

		return TargetLogic.singleTargetAsList(this.findEntity(context, targetKey));
    }
    
}