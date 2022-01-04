// npm i firebase react-firebase-hooks
// npm i firebase-tools -g (optional)

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDr6RnXeOCX_pqzla2YpO-OFqJCmYVrCrk',
	authDomain: 'rwc-blog-e37c4.firebaseapp.com',
	projectId: 'rwc-blog-e37c4',
	storageBucket: 'rwc-blog-e37c4.appspot.com',
	messagingSenderId: '822870642116',
	appId: '1:822870642116:web:aca934160d200172b02891',
	measurementId: 'G-PMZXCE28XB',
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // define which provider will be used

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp; // func() save servertimestamp on server
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment; // update specific count

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED; // to reposrt upload progress

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
	const usersRef = firestore.collection('users');
	const query = usersRef.where('username', '==', username).limit(1);
	const userDoc = (await query.get()).docs[0];
	return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
	const data = doc.data();
	return {
		...data,
		// Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
		createdAt: data?.createdAt.toMillis() || 0,
		updatedAt: data?.updatedAt.toMillis() || 0,
	};
}
