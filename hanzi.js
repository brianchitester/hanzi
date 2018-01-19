$( document ).ready(() => {
    newGame();
});
$('.maxCharacters').on('change', ()=>{
    $('.pinyinCorrect').text("0");
    $('.pinyinTotal').text("0");
    $('.englishCorrect').text("0");
    $('.englishTotal').text("0");
    newGame()
});
let max = $(".maxCharacters").val();
let sentence = {};
let getQueryString = (field) => {
    let href = window.location.href;
    let reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    let string = reg.exec(href);
    return string ? string[1] : null;
};
let character = characters[chance.integer({min:1, max:max})];
let newGame = () => {
    $('.english').html('');
    $('.pinyin').html('');
    $('.answers').html('');
    $('.englishSentence').html('');
    $('.pinyinSentence').html('');

    //set the character
    character = characters[chance.integer({min:1, max:max})];
    let displayCharacter = character.characters.simplfied;
    if (character.characters.tradtional !== character.characters.simplfied) {
        displayCharacter = character.characters.tradtional + " / " + character.characters.simplfied;
    }
    $('.characters').text(displayCharacter);

    //set the example sentence
    sentence = _.findKey(sentences, (s) => { return s.simplified.indexOf(character.characters.simplfied) >= 0; });
    let displaySentence = sentences[sentence].simplified;
    if (character.characters.tradtional !== character.characters.simplfied) {
        displaySentence = sentences[sentence].traditional + " /  " + displaySentence;
        displaySentence = displaySentence.replace(character.characters.tradtional, '<span class="bold">' + character.characters.tradtional + '</span>');
    }
    displaySentence = displaySentence.replace(character.characters.simplfied, '<span class="bold">' + character.characters.simplfied + '</span>');
    $('.sentence').html(displaySentence);

    var answerButtons = [$('<button/>',
    {
        text: character.pinyin,
    }).click(() => answerPinyin(true)),
    $('<button/>',
    {
        text: characters[chance.integer({min:1, max:max})].pinyin,
    }).click(() => answerPinyin(false)),
    $('<button/>',
    {
        text: characters[chance.integer({min:1, max:max})].pinyin,
    }).click(() => answerPinyin(false)),
    $('<button/>',
    {
        text: characters[chance.integer({min:1, max:max})].pinyin,
    }).click(() => answerPinyin(false)),];

    $('.answers').append(shuffle(answerButtons));
}

let answerPinyin = (bool) => {
    let pinyinTotal = parseInt($('.pinyinTotal').text());
    $('.pinyinTotal').text(pinyinTotal + 1);
    $('.pinyin').css('color', '#f44336');
    if (bool) {
        let pinyinCorrect = parseInt($('.pinyinCorrect').text());
        $('.pinyinCorrect').text(pinyinCorrect + 1);
        $('.pinyin').css('color', '#4CAF50');
    }

    $('.pinyin').text(character.pinyin);

    //clear answers
    $('.answers').html('');

    //def answers
    var answerButtons = [$('<button/>',
    {
        text: character.definition,
    }).click(() => answerDef(true)),
    $('<button/>',
    {
        text: characters[chance.integer({min:1, max:max})].definition,
    }).click(() => answerDef(false)),
    $('<button/>',
    {
        text: characters[chance.integer({min:1, max:max})].definition,
    }).click(() => answerDef(false)),
    $('<button/>',
    {
        text: characters[chance.integer({min:1, max:max})].definition,
    }).click(() => answerDef(false)),];

    $('.answers').append(shuffle(answerButtons));
}

let answerDef = (bool) => {
    let englishTotal = parseInt($('.englishTotal').text());
    $('.englishTotal').text(englishTotal + 1);
    $('.english').css("color", "#f44336");
    if (bool) {
        let englishCorrect = parseInt($('.englishCorrect').text());
        $('.englishCorrect').text(englishCorrect + 1);
        $('.english').css("color", "#4CAF50");
    }

    $('.english').text(character.definition);
    $('.englishSentence').text(sentences[sentence].english);
    $('.pinyinSentence').text(sentences[sentence].pinyin);

    let pastGames = character.characters.simplfied + " " + character.pinyin + " -  " + character.definition;
    if (character.characters.simplfied !== character.characters.tradtional){
        pastGames = character.characters.tradtional + "/" + character.characters.simplfied + " " + character.pinyin + " - " + character.definition;
    }
    

    $('.pastGames').append($('<div></div>').text(pastGames))
    //clear answers
    $('.answers').html($('<button/>',
    {
        text: "Next",
    }).click(() => newGame()));
}

let shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}