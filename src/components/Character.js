import characters from './characters';

class Character {
    constructor(character) {
        this._name = character.name;
        this._defense = character.defense;
        this._attack = character.attack;
        this.hp = character.health;
        this.energy = character.energy;
        this.bio = character.bio;
        this.image = character.image;
    }

    getName() {
        console.log(this._name);
    }

    getHp() {
        console.log(this.hp);
    }
}

export class Player extends Character {
    constructor(character) {
        super(character);
    };

    //Not in use, early version of attack system.
    takeDamage(damage) {
        let hit = Math.floor(Math.random() * enemy._attack);
        this.hp -= hit;
        if (this.hp < 0) {
            this.hp = 0;
        };
    };
}

export class Enemy extends Character {
    constructor(character) {
        super(character);
    };

    //Not in use, early version of attack system.
    takeDamage(damage) {
        let hit = Math.floor(Math.random() * player._attack);
        this.hp -= hit;
        if (this.hp < 0) {
            this.hp = 0;
        };
    };
}