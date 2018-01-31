import $ from 'jquery';
import characters from './characters';

export class GameUI {
    constructor() {
        this.status = $('#status');
        this.playerAttributes = $('#player-attributes');
        this.enemyAttributes = $('#enemy-attributes');
    }  

    populateAttributes(playerCharacter, enemyCharacter) {
        let playerPortrait = $('#player-portrait');
        let enemyPortrait = $('#enemy-portrait');
        let playerHealth = $('#player-health');
        let enemyHealth = $('#enemy-health');

        playerPortrait.append(`<img src='${playerCharacter.image}'></img>`);
        this.playerAttributes.append(
            '<h2>' + `${playerCharacter._name}` + '</h2>' +
            '<p>Attack: ' + `${playerCharacter._attack}` + '</p>' +
            '<p>Defense: ' + `${playerCharacter._defense}` + '</p>'
        );
        playerHealth.append('<p>HP ' + `${playerCharacter.hp}` + '</p>');

        enemyPortrait.append('<img src=' + `${enemyCharacter.image}` + '></img>');
        this.enemyAttributes.append(
            '<h2>' + `${enemyCharacter._name}` + '</h2>' +
            '<p>Attack: ' + `${enemyCharacter._attack}` + '</p>' +
            '<p>Defense: ' + `${enemyCharacter._defense}` + '</p>'
        );
        enemyHealth.append('<p>HP ' + `${enemyCharacter.hp}` + '</p>');
    }
    
    populateCharacterSelection() {
        let characterList = $('#character-list');
        let characterIndex;
        for (let key in characters) {
            if(characters.hasOwnProperty(key)) {
                characterIndex = characters[key];
                characterList.append(
                    '<div id=' + `${key}` + ' class="character-select">' +
                    '<div class="image-container">' +
                    '<img src=' + `${characterIndex.image}` + '></img>' +
                    '</div>' +
                    '<div class="character-name">' + `${characterIndex.name}` + '</div></div>'
                );
            };
        };
    }

    hoverCharacterSelection() {
        let displayedCharacter = $('.hovered-character');
        let displayedBio = $('.character-bio');
        $('.character-select').hover(function () {
            let factionName = $(this).find('>.character-name').text();
            let factionId = $(this).attr('id');
            displayedCharacter.html(factionName + '<h1 class="prompt" data-text="_">_</h1>');
            displayedCharacter.attr('data-text'  , factionName);
            displayedBio.html(characters[factionId].bio);
            displayedBio.attr('data-text', characters[factionId].bio);
        },
            function () {
                displayedCharacter.html('');
            }
        );
    }


}

