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
        const { UserUID } = snap.data().event;

        // Get event creator
        db.collection('users').doc(UserUID).get((eventAuthorDoc) => {
            // Find all users which are following the event creator
            db.collection('users').where('user.following', 'array-contains', UserUID)
                .get()
                .then((querySnapshot) => {
                    // For every follower, send them an email notification
                    querySnapshot.forEach((followerDoc) => {
                        const msg = {
                            to: followerDoc.data().user.email,
                            from: 'noreply@sparkwest.network',
                            subject: `${eventAuthorDoc.data().user.name} just posted a new event!`,
                            text: ``,
                        };

                        sgMail.send(msg);
                    });
                }).catch(err => console.error(err));
        });
    });
