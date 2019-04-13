import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()
export const storage = firebaseApp.storage()

const firestore = firebase.firestore()
// For monday https://firebase.google.com/docs/firestore/security/rules-conditions
