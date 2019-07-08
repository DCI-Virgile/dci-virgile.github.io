let myCard = document.getElementById('myCard');
let array = ['<span class= "spade">&#x1F0A1</span>', '<span class= "spade">&#x1F0A2</span>', '<span class= "spade">&#x1F0A3</span>', '<span class= "spade">&#x1F0A4</span>', '<span class= "spade">&#x1F0A5</span>', '<span class= "spade">&#x1F0A6</span>', '<span class= "spade">&#x1F0A7</span>', '<span class= "spade">&#x1F0A8</span>', '<span class= "spade">&#x1F0A9</span>', '<span class= "spade">&#x1F0AA</span>', '<span class= "spade">&#x1F0AB</span>', '<span class= "spade">&#x1F0AD</span>', '<span class= "spade">&#x1F0AE</span>', '<span class= "heart">&#x1F0B1</span>', '<span class= "heart">&#x1F0B2</span>', '<span class= "heart">&#x1F0B3</span>', '<span class= "heart">&#x1F0B4</span>', '<span class= "heart">&#x1F0B5</span>', '<span class= "heart">&#x1F0B6</span>', '<span class= "heart">&#x1F0B7</span>', '<span class= "heart">&#x1F0B8</span>', '<span class= "heart">&#x1F0B9</span>', '<span class= "heart">&#x1F0BA</span>', '<span class= "heart">&#x1F0BB</span>', '<span class= "heart">&#x1F0BD</span>', '<span class= "heart">&#x1F0BE</span>', '<span class= "diamond">&#x1F0C1</span>', '<span class= "diamond">&#x1F0C2</span>', '<span class= "diamond">&#x1F0C3</span>', '<span class= "diamond">&#x1F0C4</span>', '<span class= "diamond">&#x1F0C5</span>', '<span class= "diamond">&#x1F0C6</span>', '<span class= "diamond">&#x1F0C7</span>', '<span class= "diamond">&#x1F0C8</span>', '<span class= "diamond">&#x1F0C9</span>', '<span class= "diamond">&#x1F0CA</span>', '<span class= "diamond">&#x1F0CB</span>', '<span class= "diamond">&#x1F0CD</span>', '<span class= "diamond">&#x1F0CE</span>', '<span class= "club">&#x1F0D1</span>', '<span class= "club">&#x1F0D2</span>', '<span class= "club">&#x1F0D3</span>', '<span class= "club">&#x1F0D4</span>', '<span class= "club">&#x1F0D5</span>', '<span class= "club">&#x1F0D6</span>', '<span class= "club">&#x1F0D7</span>', '<span class= "club">&#x1F0D8</span>', '<span class= "club">&#x1F0D9</span>', '<span class= "club">&#x1F0DA</span>', '<span class= "club">&#x1F0DB</span>', '<span class= "club">&#x1F0DD</span>', '<span class= "club">&#x1F0DE</span>'];
document.getElementById("deck").innerHTML = array;

function shuffle() {
    document.getElementById("drawn").innerHTML = '';
    document.getElementById("myCard").innerHTML = '&#x1F0DF';
    document.getElementById("total").innerHTML = 'Click on the right card to reset and shuffle the deck';
    let shuffled = [];
    document.getElementById("name").innerHTML = 'Click on the left card to draw a card from the deck';
    ace = 0;
    total = 0;
    drawn = '';

    for (i = 0; i < 1000; i++) {
        let start = Math.floor((Math.random() * 5));
        let shuffling = Math.floor((Math.random() * 30));
        shuffled = array.splice(start, shuffling);
        array = array.concat(shuffled);
    }

    clone = array.slice(0);
    document.getElementById("deck").innerHTML = array.join('');
};

let clone = array.slice(0);
let value = 0;
let total = 0;
let ace = 0;
let drawn = '';
function draw() {
    myCard = clone.pop();
    let suit = myCard.charAt(myCard.length - 9);
    switch (suit) {
        case 'A':
            suit = ' of Spade';
            break;
        case 'B':
            suit = ' of Heart';
            break;
        case 'C':
            suit = ' of Diamond';
            break;
        case 'D':
            suit = ' of Club';
    }
    let spelledValue = myCard.charAt(myCard.length - 8);
    switch (spelledValue) {
        case '1':
            spelledValue = 'Ace';
            break;
        case '2':
            spelledValue = 'Two';
            break;
        case '3':
            spelledValue = 'Three';
            break;
        case '4':
            spelledValue = 'Four';
            break;
        case '5':
            spelledValue = 'Five';
            break;
        case '6':
            spelledValue = 'Six';
            break;
        case '7':
            spelledValue = 'Seven';
            break;
        case '8':
            spelledValue = 'Eight';
            break;
        case '9':
            spelledValue = 'Nine';
            break;
        case 'A':
            spelledValue = 'Ten';
            break;
        case 'B':
            spelledValue = 'Jack';
            break;
        case 'D':
            spelledValue = 'Queen';
            break;
        case 'E':
            spelledValue = 'King';
    }

    document.getElementById("name").innerHTML = spelledValue + suit;
    value = parseInt('0x' + myCard.charAt(myCard.length - 8));
    ace = (value === 1) ? ace += 10 : ace += 0;
    value = (value > 10) ? 10 : value;
    console.log(value);
    console.log(ace);
    ace = (ace != 0 && total + value + ace > 21) ? ace - 10 : ace;
    total = total + value + ace;
    document.getElementById("myCard").innerHTML = myCard;
    document.getElementById("deck").innerHTML = clone.join('');
    if (total === 21) {
        document.getElementById("total").innerHTML = 'BlackJack!';
    } else if (total > 21) {
        document.getElementById("total").innerHTML = 'Bust!';
    } else {
        document.getElementById("total").innerHTML = 'Your total is: ' + total;
    }
    total = (ace != 0 && total < 22) ? total - 10 : total;
    drawn += myCard;
    document.getElementById("drawn").innerHTML = drawn;
};

function send(event) {
    event.preventDefault()
    let webhook = document.getElementById('webhook').value;
    let username = document.getElementById('username').value;
    let message = document.getElementById("drawn").innerHTML;
    message = message.replace(/<span class=/g, "");
    message = message.replace(/"spade">/g, "");
    message = message.replace(/"heart">/g, "");
    message = message.replace(/"diamond">/g, "");
    message = message.replace(/"club">/g, "");
    message = message.replace(/<\/span>/g, "");
    message = `${username} drew ${message} for a total of ${total+ace} points.`
    message = { "username": "BlackJack", "content": message };
    message = JSON.stringify(message);
    req = new XMLHttpRequest();
    req.open("POST", webhook, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(message);    
};