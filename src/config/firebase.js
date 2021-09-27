import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCzXAB6xc5sdL3FRCdeN2o4ELDkueEvxcA',
  authDomain: 'do-zero-a-beyond.firebaseapp.com',
  projectId: 'do-zero-a-beyond',
  storageBucket: 'do-zero-a-beyond.appspot.com',
  messagingSenderId: '706306962731',
  appId: '1:706306962731:web:781bcdf8ef71d292c4416e',
  measurementId: 'G-VJPEGKDS1X'
}
firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp()
export const storage = firebase.storage()
