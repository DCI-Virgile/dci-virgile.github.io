var go = document.querySelector('#go');
var webhook = document.querySelector('#webhook');
var message = document.querySelector('#message');
var sent = document.querySelector('#sent');

go.addEventListener('submit', function (event) {
    event.preventDefault();
    if (webhook.value.length < 1) return;
    localStorage.setItem('webhook', 'webhook');

}, false);

var saved = localStorage.getItem('message');
if (saved) {
	sent.innerHTML = saved;
}