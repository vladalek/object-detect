importScripts('../bower_components/firebase/firebase-app.js');
importScripts('../bower_components/firebase/firebase-messaging.js');

firebase.initializeApp({
	'messagingSenderId': '924960246403'
});

const messaging = firebase.messaging();