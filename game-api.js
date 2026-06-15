// game-api.js
import { db, ensureAuth } from './firebase-config.js';
import { collection, addDoc, query,
  orderBy, limit, getDocs, serverTimestamp, where }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// Score speichern
// gameId: z.B. 'snake' | score: Zahl | name: Spielername
// extraData: spielspezifische Zusatzdaten (optional)
export async function saveScore(gameId, score, name, extraData = {}) {
  const user = await ensureAuth();
  if (score < 0 || score > 9999999)
    throw new Error('Ungültiger Score');
  if (!name || name.trim().length === 0)
    throw new Error('Name fehlt');
  const entry = {
    uid:       user.uid,
    name:      name.trim().slice(0, 20),
    score:     Math.floor(score),
    gameId,
    createdAt: serverTimestamp(),
    ...extraData
  };
  await addDoc(collection(db, `scores/${gameId}/entries`), entry);
}

// Top-N Scores laden (absteigend nach score)
export async function getLeaderboard(gameId, topN = 10) {
  const q = query(
    collection(db, `scores/${gameId}/entries`),
    orderBy('score', 'desc'),
    limit(topN)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Leaderboard nach aufsteigendem Wert (für Zeit/Züge)
export async function getLeaderboardAsc(gameId, field, topN = 10) {
  const q = query(
    collection(db, `scores/${gameId}/entries`),
    orderBy(field, 'asc'),
    limit(topN)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Eigene Bestscores abrufen
export async function getMyScores(gameId) {
  const user = await ensureAuth();
  const q = query(
    collection(db, `scores/${gameId}/entries`),
    where('uid', '==', user.uid),
    orderBy('score', 'desc'),
    limit(5)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
