import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../services/authService';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101010]">
      <div className="bg-[#181818] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          ¿No tienes una cuenta? <Link to="/signup" className="text-pink-400 hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 