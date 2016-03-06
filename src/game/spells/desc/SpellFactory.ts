class SpellFactory {
    
    public getSpell(spellDesc: SpellDesc): Spell {
        var spellClass: typeof Spell = spellDesc.getSpellClass();
        return new spellClass();
    }
    
}