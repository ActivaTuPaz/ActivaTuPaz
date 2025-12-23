import { db } from '../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const COLLECTION_NAME = 'workshops';

export const getWorkshops = async () => {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        firestoreId: doc.id
    }));
};

export const addWorkshop = async (workshopData) => {
    return await addDoc(collection(db, COLLECTION_NAME), workshopData);
};

export const updateWorkshop = async (id, workshopData) => {
    const workshopRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(workshopRef, workshopData);
};

export const deleteWorkshop = async (id) => {
    const workshopRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(workshopRef);
};
