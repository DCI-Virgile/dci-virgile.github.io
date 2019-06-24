var go = document.getElementById('go');

go.addEventListener('submit', function () {
    var webhook = document.querySelector('#webhook');
    var message = document.querySelector('#message');
    message = message.value;
    webhook = webhook.value;
    localStorage.setItem('webhook', JSON.stringify(webhook));
    localStorage.setItem('message', JSON.stringify(message));
});
document.getElementById("sent").innerHTML = "you sent: " + localStorage.getItem('message') + " to: " + localStorage.getItem('webhook');