class EntityReference {
    
    public static NONE: EntityReference = new EntityReference(-1);
	public static ENEMY_CHARACTERS: EntityReference = new EntityReference(-2);
	public static ENEMY_MINIONS: EntityReference = new EntityReference(-3);
	public static ENEMY_HERO: EntityReference = new EntityReference(-4);
	public static FRIENDLY_CHARACTERS: EntityReference = new EntityReference(-5);
	public static FRIENDLY_MINIONS: EntityReference = new EntityReference(-6);
	public static OTHER_FRIENDLY_MINIONS: EntityReference = new EntityReference(-7);
	public static ADJACENT_MINIONS: EntityReference = new EntityReference(-8);
	public static FRIENDLY_HERO: EntityReference = new EntityReference(-9);
	public static ALL_MINIONS: EntityReference = new EntityReference(-10);
	public static ALL_CHARACTERS: EntityReference = new EntityReference(-11);
	public static ALL_OTHER_CHARACTERS: EntityReference = new EntityReference(-12);
	public static ALL_OTHER_MINIONS: EntityReference = new EntityReference(-13);
	public static FRIENDLY_WEAPON: EntityReference = new EntityReference(-14);
	public static ENEMY_WEAPON: EntityReference = new EntityReference(-15);
	public static FRIENDLY_HAND: EntityReference = new EntityReference(-16);
	public static ENEMY_HAND: EntityReference = new EntityReference(-17);
	

	public static TARGET: EntityReference = new EntityReference(-30);

	public static EVENT_TARGET: EntityReference = new EntityReference(-40);
	public static SELF: EntityReference = new EntityReference(-41);
	public static KILLED_MINION: EntityReference = new EntityReference(-42);
	public static ATTACKER_REFERENCE: EntityReference = new EntityReference(-43);
	public static PENDING_CARD: EntityReference = new EntityReference(-44);
    
    public static pointTo(entity: Entity): EntityReference {
        if (entity == null) {
            return null;
        }
        return new EntityReference(entity.getId());
    }
    
    private key: number;
    
    constructor(key: number) {
        this.key = key;
    }
    
    public getId(): number {
        return this.key;
    }
    
}