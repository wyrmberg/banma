class SpellUtils {
    
    public static getRandomTarget<T>(targets: List<T>): T {
        var randomIndex = Random.nextInt(targets.size());
        return targets.get(randomIndex);
    }
    
    public static getValidTargets(context: GameContext, player: Player, allTargets: List<Entity>, filter: EntityFilter): List<Entity> {
        if (filter == null) {
            return allTargets;
        }
        var validTargets: List<Entity> = new List<Entity>();
        for (var i: number = 0; i < allTargets.size(); ++i) {
            var entity: Entity = allTargets.get(i);
            if (filter.matches(context, player, entity)) {
                validTargets.add(entity);
            }
        }
        return validTargets;
    }
    
}
