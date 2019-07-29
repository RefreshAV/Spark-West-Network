## Getting the current user's document
Currently there are two ways to get the current user's document.
1.
```js
db.collection('users').where('user.UserID', '==', firebase.auth().currentUser.uid)
```
You should avoid this method as it can cause problems if there are two documents with the same `UserID` property. 

2.
```js
db.collection('users').doc(firebase.auth().currentUser.uid)
```
This is the recommended method, it's easier to read and is safer.
