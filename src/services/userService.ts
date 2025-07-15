import { updateProfile, User } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';

export interface UserProfile {
  displayName?: string;
  bio?: string;
  location?: string;
  favoriteGenres?: string[];
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  preferences?: {
    emailNotifications?: boolean;
    darkMode?: boolean;
    language?: 'es' | 'en';
  };
  stats?: {
    showsWatched?: number;
    totalWatchTime?: number;
    favoriteGenre?: string;
    memberSince?: Date;
  };
  achievements?: {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: Date;
  }[];
}

// Actualizar el perfil básico del usuario (displayName y photoURL)
export const updateUserProfile = async (data: { displayName?: string; photoURL?: string }): Promise<User> => {
  const user = auth.currentUser;
  if (!user) throw new Error('No hay usuario autenticado');
  
  try {
    await updateProfile(user, data);
    return user;
  } catch (error: any) {
    console.error('Error al actualizar el perfil:', error);
    throw new Error('No se pudo actualizar el perfil: ' + error.message);
  }
};

// Subir una imagen de perfil
export const uploadProfileImage = async (file: File): Promise<string> => {
  const user = auth.currentUser;
  if (!user) throw new Error('No hay usuario autenticado');
  
  try {
    // Crear una referencia única para la imagen con timestamp para evitar problemas de caché
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `profile_${user.uid}_${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `profile_images/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    // Actualizar el photoURL en el perfil del usuario
    await updateUserProfile({ photoURL: downloadURL });
    
    return downloadURL;
  } catch (error: any) {
    console.error('Error al subir la imagen de perfil:', error);
    throw new Error('No se pudo subir la imagen: ' + error.message);
  }
};

// Guardar datos extendidos del perfil en Firestore
export const saveUserProfileData = async (profileData: UserProfile): Promise<UserProfile> => {
  const user = auth.currentUser;
  if (!user) throw new Error('No hay usuario autenticado');
  
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    const updatedData = {
      ...profileData,
      updatedAt: new Date()
    };
    
    if (userDoc.exists()) {
      // Actualizar documento existente
      await updateDoc(userRef, updatedData);
    } else {
      // Crear nuevo documento
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || profileData.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
        stats: {
          memberSince: new Date(),
          showsWatched: 0,
          totalWatchTime: 0
        },
        achievements: [],
        ...updatedData
      });
    }
    
    // Devolver los datos actualizados
    const updatedDoc = await getDoc(userRef);
    return updatedDoc.data() as UserProfile;
  } catch (error: any) {
    console.error('Error al guardar datos del perfil:', error);
    throw new Error('No se pudieron guardar los datos del perfil: ' + error.message);
  }
};

// Obtener datos extendidos del perfil desde Firestore
export const getUserProfileData = async (): Promise<UserProfile | null> => {
  const user = auth.currentUser;
  if (!user) return null;
  
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Error al obtener datos del perfil:', error);
    return null;
  }
};

// Obtener el usuario actual
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Actualizar estadísticas del usuario
export const updateUserStats = async (stats: Partial<UserProfile['stats']>): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error('No hay usuario autenticado');
  
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentStats = userData.stats || {};
      
      await updateDoc(userRef, {
        stats: {
          ...currentStats,
          ...stats
        }
      });
    }
  } catch (error: any) {
    console.error('Error al actualizar estadísticas:', error);
    throw new Error('No se pudieron actualizar las estadísticas: ' + error.message);
  }
};

// Desbloquear un logro para el usuario
export const unlockAchievement = async (achievementId: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error('No hay usuario autenticado');
  
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const achievements = userData.achievements || [];
      
      // Verificar si el logro ya está desbloqueado
      if (achievements.some((a: any) => a.id === achievementId)) {
        return; // El logro ya está desbloqueado
      }
      
      // Obtener información del logro desde la colección de logros
      const achievementRef = doc(db, 'achievements', achievementId);
      const achievementDoc = await getDoc(achievementRef);
      
      if (achievementDoc.exists()) {
        const achievementData = achievementDoc.data();
        
        // Añadir el logro a la lista de logros del usuario
        await updateDoc(userRef, {
          achievements: [...achievements, {
            id: achievementId,
            name: achievementData.name,
            description: achievementData.description,
            icon: achievementData.icon,
            unlockedAt: new Date()
          }]
        });
      }
    }
  } catch (error: any) {
    console.error('Error al desbloquear logro:', error);
    throw new Error('No se pudo desbloquear el logro: ' + error.message);
  }
};

// Buscar usuarios por nombre de usuario
export const searchUsersByDisplayName = async (query: string): Promise<UserProfile[]> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('displayName', '>=', query), where('displayName', '<=', query + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    
    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserProfile);
    });
    
    return users;
  } catch (error: any) {
    console.error('Error al buscar usuarios:', error);
    throw new Error('No se pudieron buscar usuarios: ' + error.message);
  }
};