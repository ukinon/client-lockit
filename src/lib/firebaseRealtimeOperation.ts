import { db } from "./firebaseConfig";
import {
  ref,
  set,
  push,
  update,
  remove,
  onValue,
  DatabaseReference,
  Query,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";

// Change this type to only allow strings
type DatabaseNode = string;

// Helper function to join path segments
function joinPath(path: DatabaseNode[]): string {
  return path.join("/");
}

// Add or update data at a specific path
export async function setData<T>(path: DatabaseNode[], data: T): Promise<void> {
  try {
    await set(ref(db, joinPath(path)), data);
    console.log("Data set successfully");
  } catch (e) {
    console.error("Error setting data: ", e);
    throw e;
  }
}

// Add data to a list
export async function pushData<T>(
  path: DatabaseNode[],
  data: T
): Promise<string> {
  try {
    const newRef = push(ref(db, joinPath(path)));
    await set(newRef, data);
    console.log("Data pushed successfully");
    return newRef.key!;
  } catch (e) {
    console.error("Error pushing data: ", e);
    throw e;
  }
}

// Update specific fields at a path
export async function updateData(
  path: DatabaseNode[],
  updates: object
): Promise<void> {
  try {
    await update(ref(db, joinPath(path)), updates);
    console.log("Data updated successfully");
  } catch (e) {
    console.error("Error updating data: ", e);
    throw e;
  }
}

// Remove data at a specific path
export async function removeData(path: DatabaseNode[]): Promise<void> {
  try {
    await remove(ref(db, joinPath(path)));
    console.log("Data removed successfully");
  } catch (e) {
    console.error("Error removing data: ", e);
    throw e;
  }
}

// Listen to data at a specific path
export function listenToData<T>(
  path: string[],
  callback: (data: T | null) => void,
  queryConstraints?: {
    orderBy?: string;
    equalTo?: any;
  }
): () => void {
  let dataRef: DatabaseReference | Query = ref(db, path.join("/"));

  if (queryConstraints) {
    if (queryConstraints.orderBy) {
      dataRef = query(dataRef, orderByChild(queryConstraints.orderBy));
    }
    if (queryConstraints.equalTo !== undefined) {
      dataRef = query(dataRef, equalTo(queryConstraints.equalTo));
    }
  }

  const unsubscribe = onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });

  return unsubscribe;
}
