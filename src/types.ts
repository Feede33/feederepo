
export interface Show {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  language?: 'Español' | 'Inglés';
  year?: number;
  genre?: string | string[];
  episodes?: number;
  isNew?: boolean;
  description?: string;
  country?: string;
  status?: 'En emisión' | 'Finalizado' | 'Próximamente';
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
