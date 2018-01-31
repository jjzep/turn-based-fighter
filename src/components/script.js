import characters from './characters';
import { Player, Enemy } from './Character';
import { debug } from 'util';
import $ from 'jquery';
import { setTimeout } from 'timers';
import { GameUI } from './GameUI';

//VS combat game
class Game {
    constructor() {
        this._gameUI = new GameUI;
        this.playerCharacter;
        this.enemyCharacter;
        this.currentTurn = 1;
        this.gameOver = false;
        this.status = $('#status');
        this.playerAttributes = $('#player-attributes');
        this.enemyAttributes = $('#enemy-attributes');
        this.playerSelected = false;
        this.enemySelected = false;
    }

    getPlayer() {
        return this.playerCharacter._name;
    }

    getEnemy() {
        return this.enemyCharacter._name;
    }

    assignPlayer(selection) {
        let playerSelection = selection;
        this.playerSelected = true;
        this.playerCharacter = new Player(characters[playerSelection]);
        this.playerCharacter.image;
        this.startGame();
    }

    //Randomly selects an opponent
    selectEnemy() {
        let selectionList = [];
        for (let character in characters) {
            selectionList.push(character);
        }

        let selection = Math.floor(Math.random() * 11);
        let randomEnemySelection = selectionList[selection];
        this.enemyCharacter = new Enemy(characters[randomEnemySelection]);
    }

    startGame() {
        if (this.playerSelected === true) {
            $('#player-selection').css('display', 'none');
            $('#game').css('display', 'flex');
            this._gameUI.populateAttributes(this.playerCharacter, this.enemyCharacter);
        };
    }

    preTurn() {
        this._gameUI.populateCharacterSelection();
        this._gameUI.hoverCharacterSelection();
        this.selectEnemy();
        this.startGame();
    }

    updateTurn() {
        let attackButton = document.getElementById('attack');
        if (this.currentTurn % 2) {
            attackButton.disabled = true;
        } else {
            attackButton.disabled = false;
        };
        this.currentTurn++;
    }

    //Calculates attack roll based on attack and defense ratings. Returns damage rating.
    attack(attack, defense) {
        let damageRoll = Math.floor(Math.random() * attack);
        let defenseRoll = Math.floor(Math.random() * defense);
        let damageTotal = 0;
        if (damageRoll >= defenseRoll) {
            damageTotal = damageRoll - defenseRoll;
        } else {
            damageTotal = 0;
        };

        if (damageTotal < 0) {
            damageTotal = 0;
        }
        return damageTotal;
    }


    playerTurn(attack, defense) {
        let damage = this.attack(attack, defense);

        if (this.enemyCharacter.hp - damage < 0) {
            this.enemyCharacter.hp = 0;
        } else {
            this.enemyCharacter.hp -= damage;
        }
        this.updateHealth();
    }

    enemyTurn(attack, defense) {
        let damage = this.attack(attack, defense);
        this.status.html('TARGET ACQUIRED');

        //If the returned number is 0 it updates status to missed.
        if (damage === 0) {
            document.querySelector('#status').innerHTML = 'Missed!';
        }

        //If the hit makes the character HP less than zero it changes it to zero.
        if (this.playerCharacter.hp - damage < 0) {
            this.playerCharacter.hp = 0;
        } else {
            //Damage
            this.playerCharacter.hp -= damage;
        }
        this.updateHealth();
    }


    //postTurn evaluates if the game is over and displays a victory message.
    gameStatus() {
        let status = $('#status');
        if (this.playerCharacter.hp <= 0) {
            console.log('You lost!');
            status.html('You Died');
            this.gameOver = true;
        } else if (this.enemyCharacter.hp <= 0) {
            console.log('You Won!');
            status.html('Target Eliminated');
            this.gameOver = true;
        } else {
            console.log('Next turn...');
            status.html('Next turn...');
        }
        this.endGame();
    }

    endGame() {
        let attackButton = $('#attack');
        if (this.gameOver) {
            attackButton.html('TARGET DETROYED');
            attackButton.prop('disabled', true);
            console.log('game over');
        }
    }

    updateHealth() {
        let playerHealth = document.querySelector('#player-health p');
        let enemyHealth = document.querySelector('#enemy-health p');
        playerHealth.innerHTML = '<p>HP ' + this.playerCharacter.hp + '</p>';
        enemyHealth.innerHTML = '<p>HP ' + this.enemyCharacter.hp + '</p>';
    }

    delayAction(action) {
        setTimeout(action, 500);
    }

    turn() {
        this.playerTurn(this.playerCharacter._attack, this.enemyCharacter._defense);
        this.updateTurn();
        this.enemyTurn(this.enemyCharacter._attack, this.playerCharacter._defense);
        this.updateTurn();
        this.gameStatus();
    }
}

$(document).ready(function () {
    let game = new Game();
    let attack = document.querySelector('#attack');
    attack.addEventListener('click', () => game.turn());

    // Character Selection
    game.preTurn();

    let characterList = $('.character-select');
    characterList.click(function () {
        let mercName = $(this).attr('id');
        game.assignPlayer(mercName);
    });
});
