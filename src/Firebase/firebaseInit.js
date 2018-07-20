import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()
export const storage = firebaseApp.storage()

const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

//Firebase Rules

//  service cloud.firestore {
//   match /databases/{database}/documents {
//
//     match /{document=**} {
//       allow read, write;
//     }
//     match /users/{user} {
//     	allow read: if isSignedIn();
//       allow update: if isOwner();
//       allow create: if isSignedIn() && request.auth.uid != existingData().UserUID;
//     }
//     match /events/{event} {
//     	allow write: if isOwner();
//       allow read: if isSignedIn();
//     }
//     // Functions //
//     function isOwner(ID) {
//     	return request.auth.uid == ID;
//     }
//     function isSignedIn() {
//     	return request.auth != null;
//     }
//     function existingData() {
//     	return resource.data
//     }
//     function incomingData() {
//     	return request.resource.data
//     }
//   }
// }
// For monday https://firebase.google.com/docs/firestore/security/rules-conditions
