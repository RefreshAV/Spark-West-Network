const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const admin = require('firebase-admin');

admin.initializeApp();
// Before running, do `firebase functions:config:set sendgrid.apiKey="SENDGRID API KEY"` to set the API key
sgMail.setApiKey(functions.config().sendgrid.apiKey);

const db = admin.firestore();

exports.sendEventNotification = functions.firestore
    .document('events/{eventId}')
    .onCreate((snap, _context) => {
        const { UserUID, title, description } = snap.data().event;

        // Find all users which are following the event creator
        db.collection('users').where('user.following', 'array-contains', UserUID)
            .get()
            .then((querySnapshot) => {
                // For every follower, send them an email notification
                querySnapshot.forEach((doc) => {
                    console.log(`Sending an email to ${doc.data().user.UserID}`);
                    const msg = {
                        to: doc.data().user.email,
                        from: 'noreply@sparkwest.network',
                        subject: `${UserUID} just posted a new event!`,
                        text: ``,
                      };
                      sgMail.send(msg);
                });
            }).catch(err => console.error(err));
    });
