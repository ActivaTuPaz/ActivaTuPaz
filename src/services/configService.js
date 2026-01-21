import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const CONFIG_COLLECTION = 'site_config';
const MAIN_DOC_ID = 'main';

export const getSiteConfig = async () => {
    const docRef = doc(db, CONFIG_COLLECTION, MAIN_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null; // Handle default fallback in UI
    }
};

export const updateSiteConfig = async (configData) => {
    const docRef = doc(db, CONFIG_COLLECTION, MAIN_DOC_ID);
    // standard merge: true is not default in setDoc unless specified, 
    // but here we likely want to overwrite or merge. setDoc with merge is good.
    await setDoc(docRef, configData, { merge: true });
};
