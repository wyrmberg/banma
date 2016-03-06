// Should be abstract but prevents from creating an instance of "typeof Spell" in SpellFactory
class Spell {
    
    public cast(context: GameContext, player: Player, desc: SpellDesc, source: Entity, targets: List<Entity>): void {
        // no target specified, cast the spell once with target NULL
        if (targets == null) {
            this.castForPlayer(context, player, desc, source, null);
            return;
        }
        
        var targetFilter: EntityFilter = desc.getEntityFilter();
        var validTargets: List<Entity> = SpellUtils.getValidTargets(context, player, targets, targetFilter);
        // there is at least one valid target and the RANDOM_TARGET flag is set, pick one randomly
        if (validTargets.size() > 0 && desc.getBool(SpellArg.RANDOM_TARGET)) {
            var target: Entity = SpellUtils.getRandomTarget(validTargets);
            this.castForPlayer(context, player, desc, source, target);
        } else {
            // there is at least one target and RANDOM_TARGET flag is not set, cast in on all targets
            for (var i: number = 0; i < validTargets.size(); ++i) {
                this.castForPlayer(context, player, desc, source, target);
            }
        }
    }
    
    private castForPlayer(context: GameContext, player: Player, desc: SpellDesc, source: Entity, target: Entity) : void {
        var targetPlayer: TargetPlayer = desc.getTargetPlayer();
        if (targetPlayer == null) {
            targetPlayer = TargetPlayer.SELF;
        }
        var opponent: Player = context.getOpponent(player);
        switch (targetPlayer) {
            case TargetPlayer.BOTH:
                this.onCast(context, player, desc, source, target);
                this.onCast(context, opponent, desc, source, target);
                break;
            case TargetPlayer.OPPONENT:
                this.onCast(context, opponent, desc, source, target);
                break;
            case TargetPlayer.SELF:
                this.onCast(context, player, desc, source, target);
                break;
            case TargetPlayer.OWNER:
                this.onCast(context, context.getPlayer(target.getOwner()), desc, source, target);
                break;
            case TargetPlayer.ACTIVE:
                this.onCast(context, context.getActivePlayer(), desc, source, target);
                break;
            case TargetPlayer.INACTIVE:
                this.onCast(context, context.getOpponent(context.getActivePlayer()), desc, source, target);
                break;
            default:
                break;
        }
    }
    
    // Should be abstract
    protected onCast(context: GameContext, player: Player, desc: SpellDesc, source: Entity, target: Entity): void {
        // Implmentation required in derived classes
        throw "Not implemented";
    }
    
}