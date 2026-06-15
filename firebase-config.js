// firebase-config.js
import { initializeApp }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { getAuth, signInAnonymously, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

// ← Hier das Config-Objekt vom Entwickler einfügen:
const firebaseConfig = {
  apiKey: "AIzaSyATdKuXx-rFkDVhUIeqevTMR63BDq-Ej48"

authDomain: "datenbank-6r-spiel.firebaseapp.com"
databaseURL: "https://datenbank-6r-spiel-default-rtdb.europe-west1.firebasedatabase.app"
projectId: "datenbank-6r-spiel"
storageBucket: "datenbank-6r-spiel.firebasestorage.app"
messagingSenderId: "998959327783"
appId: "1:998959327783:web:e204860acb4ab1dcc7bc02"

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export async function ensureAuth() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) { resolve(user); }
      else {
        const cred = await signInAnonymously(auth);
        resolve(cred.user);
      }
    });
  });
}
