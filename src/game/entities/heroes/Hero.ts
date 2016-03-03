class Hero extends Actor {
    
    private heroPower: HeroPower;
    private weapon: Weapon;
    private destroyedWeapon: Weapon;
    
    public getDestroyedWeapon(): Weapon {
        return this.destroyedWeapon;
    }
    
    public getEntityType(): EntityType {
        return EntityType.HERO;
    }
    
    public getHeroPower(): HeroPower {
        return this.heroPower;
    }
    
    public getWeapon(): Weapon {
        return this.weapon;
    }
    
}
