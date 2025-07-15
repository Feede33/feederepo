import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { updateUserProfile, uploadProfileImage, saveUserProfileData, getUserProfileData } from '../services/userService';

interface ProfileEditProps {
  onClose: () => void;
  onSave: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ onClose, onSave }) => {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    bio: '',
    location: '',
    favoriteGenres: [] as string[],
    socialLinks: {
      twitter: '',
      instagram: '',
      facebook: ''
    },
    preferences: {
      emailNotifications: true,
      darkMode: false,
      language: 'es' as 'es' | 'en'
    }
  });

  // Cargar datos del perfil existente
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileData = await getUserProfileData();
        if (profileData) {
          setFormData(prev => ({
            ...prev,
            displayName: user?.displayName || prev.displayName,
            bio: profileData.bio || prev.bio,
            location: profileData.location || prev.location,
            favoriteGenres: profileData.favoriteGenres || prev.favoriteGenres,
            socialLinks: {
              ...prev.socialLinks,
              ...(profileData.socialLinks || {})
            },
            preferences: {
              ...prev.preferences,
              ...(profileData.preferences || {})
            }
          }));
        }
      } catch (err) {
        console.error('Error al cargar datos del perfil:', err);
      }
    };

    loadProfileData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: newValue
      }
    }));
  };

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => {
      const currentGenres = [...prev.favoriteGenres];
      if (currentGenres.includes(genre)) {
        return {
          ...prev,
          favoriteGenres: currentGenres.filter(g => g !== genre)
        };
      } else {
        return {
          ...prev,
          favoriteGenres: [...currentGenres, genre]
        };
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Actualizar foto de perfil si se seleccionó una nueva
      if (imageFile) {
        await uploadProfileImage(imageFile);
      }
      
      // Actualizar nombre de usuario
      await updateUserProfile({ displayName: formData.displayName });
      
      // Guardar datos extendidos del perfil
      await saveUserProfileData({
        bio: formData.bio,
        location: formData.location,
        favoriteGenres: formData.favoriteGenres,
        socialLinks: formData.socialLinks,
        preferences: formData.preferences
      });
      
      setSuccess(true);
      setTimeout(() => {
        onSave();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Ha ocurrido un error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  // Lista de géneros disponibles
  const availableGenres = [
    'Romance', 'Comedia', 'Drama', 'Acción', 'Histórico', 'Fantasía',
    'Escolar', 'Thriller', 'Misterio', 'Sobrenatural', 'Médico', 'Familiar'
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-white">Editar Perfil</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Foto de perfil */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-pink-500">
                <img 
                  src={imagePreview || user?.photoURL || 'https://i.pravatar.cc/200'} 
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <label htmlFor="profile-image" className="cursor-pointer text-white text-xs font-medium">
                  Cambiar
                </label>
              </div>
            </div>
            <input 
              type="file" 
              id="profile-image" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="hidden"
            />
          </div>
          
          {/* Información básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Información básica</h3>
            
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">Nombre de usuario</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Tu nombre de usuario"
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">Biografía</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                placeholder="Cuéntanos sobre ti..."
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Ubicación</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Tu ciudad o país"
              />
            </div>
          </div>
          
          {/* Géneros favoritos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Géneros favoritos</h3>
            <div className="flex flex-wrap gap-2">
              {availableGenres.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${formData.favoriteGenres.includes(genre) ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          
          {/* Redes sociales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Redes sociales</h3>
            
            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-300 mb-1">Twitter</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-800 text-gray-400 text-sm">
                  @
                </span>
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleSocialLinkChange}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-r-lg px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="usuario"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-300 mb-1">Instagram</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-800 text-gray-400 text-sm">
                  @
                </span>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleSocialLinkChange}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-r-lg px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="usuario"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-300 mb-1">Facebook</label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                value={formData.socialLinks.facebook}
                onChange={handleSocialLinkChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="URL de tu perfil"
              />
            </div>
          </div>
          
          {/* Preferencias */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Preferencias</h3>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={formData.preferences.emailNotifications}
                onChange={handlePreferenceChange}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-700 rounded"
              />
              <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-300">
                Recibir notificaciones por email
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="darkMode"
                name="darkMode"
                checked={formData.preferences.darkMode}
                onChange={handlePreferenceChange}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-700 rounded"
              />
              <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-300">
                Modo oscuro
              </label>
            </div>
            
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">Idioma</label>
              <select
                id="language"
                name="language"
                value={formData.preferences.language}
                onChange={handlePreferenceChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
          
          {/* Mensajes de error o éxito */}
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg">
              ¡Perfil actualizado con éxito!
            </div>
          )}
          
          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;