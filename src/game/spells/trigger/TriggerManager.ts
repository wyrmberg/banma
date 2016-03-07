class TriggerManager {
    
    private triggers: List<IGameEventListener> = new List<IGameEventListener>();
    
    public fireGameEvent(event: GameEvent): void {
        var eventTriggers: List<IGameEventListener> = new List<IGameEventListener>();
        for (var i: number = 0; i < this.triggers.size(); ++i) {
            var trigger: IGameEventListener = this.triggers.get(i);
            if (trigger.getLayer() != event.getTriggerLayer()) {
                continue;
            }
            
            if (!trigger.interestedIn(event.getEventType())) {
                continue;
            }
            if (trigger.canFire(event)) {
                eventTriggers.add(trigger);
            }
        }
        
        for (var i: number = 0; i < eventTriggers.size(); ++i) {
            var trigger: IGameEventListener = eventTriggers.get(i);
            trigger.onGameEvent(event);
            
            // we need to double check here if the trigger still exists;
			// after all, a previous trigger may have removed it (i.e. double corruption)
			if (trigger.isExpired()) {
			    this.triggers.remove(trigger);
			}
        }
    }
    
}