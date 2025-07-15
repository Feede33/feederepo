import React, { useState } from 'react';
import Footer from '../components/Footer';

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  content: string;
  timestamp: string;
  comments: number;
}

const initialPosts: Post[] = [
  { id: 1, author: { name: 'DramaFan123', avatar: 'https://i.pravatar.cc/150?u=p1' }, title: '¿Qué opinan del final de "Crash Landing on You"?', content: 'Acabo de terminarlo y necesito hablar sobre ese final. ¡Fue tan emotivo!', timestamp: 'hace 2 horas', comments: 15 },
  { id: 2, author: { name: 'OppaLover', avatar: 'https://i.pravatar.cc/150?u=p2' }, title: 'Recomendaciones de dramas de fantasía', content: 'Busco dramas similares a "Goblin" y "Hotel Del Luna". ¿Alguna sugerencia?', timestamp: 'hace 5 horas', comments: 8 },
  { id: 3, author: { name: 'K-DramaNewbie', avatar: 'https://i.pravatar.cc/150?u=p3' }, title: 'Mi primer drama: "Boys Over Flowers"', content: '¡No puedo creer que no lo haya visto antes! Es un clásico por una razón.', timestamp: 'hace 1 día', comments: 22 },
];

const Community: React.FC = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: Post = {
      id: posts.length + 1,
      author: { name: 'UsuarioActual', avatar: 'https://i.pravatar.cc/150?u=me' },
      title: newPostTitle,
      content: newPostContent,
      timestamp: 'justo ahora',
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <div className="container mx-auto px-4 md:px-12 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Comunidad Pandrama</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content: Posts */}
          <main className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Últimas Discusiones</h2>
            <div className="space-y-6">
              {posts.map(post => (
                <div key={post.id} className="bg-[#181818] p-6 rounded-lg hover:bg-[#222] transition-colors cursor-pointer">
                  <div className="flex items-center mb-4">
                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <p className="font-semibold">{post.author.name}</p>
                      <p className="text-xs text-gray-400">{post.timestamp}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-pink-400">{post.title}</h3>
                  <p className="text-gray-300 mb-4">{post.content}</p>
                  <div className="text-sm text-gray-500">
                    <span>{post.comments} comentarios</span>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Sidebar: New Post Form */}
          <aside>
            <div className="bg-[#181818] p-6 rounded-lg sticky top-24">
              <h3 className="text-xl font-bold mb-4">Crear una nueva discusión</h3>
              <form onSubmit={handlePostSubmit}>
                <div className="mb-4">
                  <label htmlFor="post-title" className="block text-sm font-medium text-gray-400 mb-1">Título</label>
                  <input
                    id="post-title"
                    type="text"
                    value={newPostTitle}
                    onChange={e => setNewPostTitle(e.target.value)}
                    className="w-full bg-[#2a2a2a] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Un título interesante..."
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="post-content" className="block text-sm font-medium text-gray-400 mb-1">Contenido</label>
                  <textarea
                    id="post-content"
                    rows={4}
                    value={newPostContent}
                    onChange={e => setNewPostContent(e.target.value)}
                    className="w-full bg-[#2a2a2a] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="¿Qué tienes en mente?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-md transition-colors"
                >
                  Publicar
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Community; 