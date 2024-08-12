import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "./firebase";

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        await saveUserToFirestore(user);
        
        return user;
    } catch (error) {
        console.error("Error signing in with Google: ", error);
    }
}

async function saveUserToFirestore(user) {
    try {
        await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        });
    } catch (error) {
        console.error("Error saving user to Firestore: ", error);
    }
}