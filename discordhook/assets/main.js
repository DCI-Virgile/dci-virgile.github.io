

function send(event) {
    event.preventDefault()
    let webhook = document.getElementById('webhook').value;
    let message = document.getElementById('message').value;
    document.getElementById('sent').innerHTML = `You sent the message: "${message}" to "${webhook}"`;
    message = { "username": "BlackJack", "content": message };
    message = JSON.stringify(message);
    req = new XMLHttpRequest();
    req.open("POST", webhook, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(message);
    
};
