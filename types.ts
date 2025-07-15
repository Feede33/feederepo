
export interface Show {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  language?: 'Español' | 'Inglés';
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
