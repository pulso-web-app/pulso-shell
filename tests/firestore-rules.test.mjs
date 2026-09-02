import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { before, after, beforeEach, test } from 'node:test';
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getCountFromServer,
  query,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';

let environment;
let alice;
let bob;
let guest;

before(async () => {
  environment = await initializeTestEnvironment({
    projectId: 'demo-pulso-rules',
    firestore: {
      host: '127.0.0.1',
      port: 8180,
      rules: readFileSync(
        new URL('../firestore.rules', import.meta.url),
        'utf8',
      ),
    },
  });
  alice = environment.authenticatedContext('alice').firestore();
  bob = environment.authenticatedContext('bob').firestore();
  guest = environment.unauthenticatedContext().firestore();
});
beforeEach(async () => environment.clearFirestore());
after(async () => environment?.cleanup());

for (const path of [
  'contacts/company',
  'contacts/company/interactions/call',
  'projects/site',
  'projects/site/tasks/design',
]) {
  test(`two users share the complete lifecycle of ${path}`, async () => {
    await assertSucceeds(
      setDoc(doc(alice, path), { title: 'Created by Alice' }),
    );
    assert.equal(
      (await assertSucceeds(getDoc(doc(bob, path)))).data().title,
      'Created by Alice',
    );
    await assertSucceeds(
      updateDoc(doc(bob, path), { title: 'Updated by Bob' }),
    );
    assert.equal(
      (await getDoc(doc(alice, path))).data().title,
      'Updated by Bob',
    );
    await assertSucceeds(deleteDoc(doc(bob, path)));
    assert.equal((await getDoc(doc(alice, path))).exists(), false);
  });
}

test('both accounts list, count and paginate the same contacts', async () => {
  for (const id of ['a', 'b', 'c'])
    await setDoc(doc(alice, 'contacts', id), { organizationNameSearch: id });
  const directory = (db) =>
    query(collection(db, 'contacts'), orderBy('organizationNameSearch'));
  const first = await assertSucceeds(
    getDocs(query(directory(alice), limit(2))),
  );
  const same = await assertSucceeds(getDocs(query(directory(bob), limit(2))));
  assert.deepEqual(
    same.docs.map((item) => item.id),
    first.docs.map((item) => item.id),
  );
  const next = await assertSucceeds(
    getDocs(query(directory(bob), startAfter('b'), limit(2))),
  );
  assert.deepEqual(
    next.docs.map((item) => item.id),
    ['c'],
  );
  assert.equal(
    (await assertSucceeds(getCountFromServer(directory(bob)))).data().count,
    3,
  );
});

test('unauthenticated clients cannot read, list, count or write business data', async () => {
  for (const path of [
    'contacts/company',
    'contacts/company/interactions/call',
    'projects/site',
    'projects/site/tasks/design',
  ]) {
    await setDoc(doc(alice, path), { title: 'Shared' });
    const reference = doc(guest, path);
    await assertFails(getDoc(reference));
    await assertFails(getDocs(reference.parent));
    await assertFails(getCountFromServer(reference.parent));
    await assertFails(
      setDoc(doc(reference.parent, 'new'), { title: 'Denied' }),
    );
    await assertFails(updateDoc(reference, { title: 'Denied' }));
    await assertFails(deleteDoc(reference));
  }
});

test('account profiles remain private to their own account', async () => {
  await assertSucceeds(
    setDoc(doc(alice, 'users/alice'), { displayName: 'Alice' }),
  );
  await assertSucceeds(getDoc(doc(alice, 'users/alice')));
  await assertFails(getDoc(doc(bob, 'users/alice')));
  await assertFails(updateDoc(doc(bob, 'users/alice'), { displayName: 'Bob' }));
  await assertFails(getDoc(doc(guest, 'users/alice')));
});

test('legacy user-owned business paths and unknown roots are denied', async () => {
  for (const path of [
    'users/alice/contacts/company',
    'users/alice/contacts/company/interactions/call',
    'users/alice/projects/site',
    'unknown/item',
  ]) {
    await assertFails(setDoc(doc(alice, path), { title: 'Denied' }));
    await assertFails(getDoc(doc(alice, path)));
    await assertFails(getDocs(doc(bob, path).parent));
  }
});
