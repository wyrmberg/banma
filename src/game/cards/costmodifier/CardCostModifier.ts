class CardCostModifier implements IGameEventListener {
    
    private expired: boolean;
    private owner: number;
    private hostReference: EntityReference;
    
    private desc: CardCostModifierDesc;
    
    public appliesTo(card: Card): boolean {
        if (this.expired) {
            return false;
        }
        
        if (!this.getRequiredCardIds().isEmpty() && !this.getRequiredCardIds().contains(card.getId())) {
            return false;
        }
        
        if (this.getRequiredAttribute() != null && !card.hasAttribute(this.getRequiredAttribute())) {
            return false;
        }
        
        if (this.getRequiredRace() != null && card.getAttribute(Attribute.RACE) != this.getRequiredRace()) {
            return false;
        }
        
        var targetPlayer: TargetPlayer = this.getTargetPlayer();
        if (targetPlayer == TargetPlayer.OPPONENT) {
            if (card.getOwner() == this.getOwner()) {
                return false;
            }
        } else if (targetPlayer == TargetPlayer.SELF) {
            if (card.getOwner() != this.getOwner()) {
                return false;
            }
        }
        
        if (this.getCardType() == null && card.getCardType() != CardType.HERO_POWER) {
            return true;
        }
        if (this.getCardType() == CardType.SPELL && card.getCardType() == CardType.CHOOSE_ONE) {
            return true;
        }
        
        return card.getCardType() == this.getCardType();
    }
    
    protected get(arg: CardCostModifierArg): any {
        return this.desc.get(arg);
    }
    
    public getCardType(): CardType {
        return <CardType> this.desc.get(CardCostModifierArg.CARD_TYPE);
    }
    
    public getMinValue(): number {
        return this.desc.getInt(CardCostModifierArg.MIN_VALUE);
    }
    
    public getOwner(): number {
        return this.owner;
    }
    
    public getRequiredAttribute(): Attribute {
        return <Attribute> this.desc.get(CardCostModifierArg.REQUIRED_ATTRIBUTE);
    }
    
    public getRequiredCardIds(): List<number> {
        if (!this.desc.contains(CardCostModifierArg.CARD_IDS)) {
            return new List<number>();
        }
        return <List<number>> this.desc.get(CardCostModifierArg.CARD_IDS);
    }
    
    public getRequiredRace(): Race {
        return <Race> this.get(CardCostModifierArg.RACE);
    }
    
    public getTargetPlayer(): TargetPlayer {
        if (!this.desc.contains(CardCostModifierArg.TARGET_PLAYER)) {
            return TargetPlayer.SELF;
        }
        return <TargetPlayer> this.desc.get(CardCostModifierArg.TARGET_PLAYER);
    }
    
    public process(card: Card, currentManaCost: number): number {
        var operation: AlgebraicOperation = <AlgebraicOperation> this.desc.get(CardCostModifierArg.OPERATION);
        var value: number = this.desc.getInt(CardCostModifierArg.VALUE);
        if (operation != null) {
            if (operation == AlgebraicOperation.ADD) {
                return currentManaCost + value;
            }
            if (operation == AlgebraicOperation.DIVIDE) {
                if (value == 0) {
                    value = 1;
                }
                return Math.round(currentManaCost / value);
            }
            if (operation == AlgebraicOperation.MULTIPLY) {
                return currentManaCost * value;
            }
            if (operation == AlgebraicOperation.NEGATE) {
                return -currentManaCost;
            }
            if (operation == AlgebraicOperation.SET) {
                return value;
            }
            if (operation == AlgebraicOperation.SUBTRACT) {
                return currentManaCost - value;
            }
        }
        var modifiedManaCost: number = currentManaCost + this.desc.getInt(CardCostModifierArg.VALUE);
        return modifiedManaCost;
    }
    
}
