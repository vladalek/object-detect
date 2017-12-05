importScripts('../bower_components/firebase/firebase-app.js');
importScripts('../bower_components/firebase/firebase-messaging.js');

firebase.initializeApp({
	'messagingSenderId': '924960246403'
});

const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   return self.registration.showNotification(notificationTitle,
//       notificationOptions);
// });

// messaging.onMessage(function (payload) {
//   console.log(payload);
// });