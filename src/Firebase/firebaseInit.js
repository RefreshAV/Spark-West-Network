import { initializeApp } from 'firebase'
import firebaseConfig from './firebaseConfig'
const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp.firestore()
export const storage = firebaseApp.storage()
