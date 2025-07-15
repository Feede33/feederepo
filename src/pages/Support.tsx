import React, { useState } from 'react';
import Footer from '../components/Footer';

const faqs = [
  {
    question: '¿Cómo puedo cambiar mi plan de suscripción?',
    answer: 'Puedes cambiar tu plan en cualquier momento desde la sección "Mi Cuenta" en tu perfil. Simplemente selecciona el nuevo plan que deseas y sigue las instrucciones.'
  },
  {
    question: '¿Qué hago si olvidé mi contraseña?',
    answer: 'Si olvidaste tu contraseña, puedes restablecerla haciendo clic en "¿Olvidaste tu contraseña?" en la página de inicio de sesión. Te enviaremos un correo electrónico con un enlace para crear una nueva.'
  },
  {
    question: '¿Puedo descargar dramas para verlos sin conexión?',
    answer: 'Actualmente, la función de descarga solo está disponible para los suscriptores del plan Premium. Si tienes este plan, verás un ícono de descarga junto a cada episodio.'
  },
  {
    question: '¿En qué dispositivos puedo ver Pandrama?',
    answer: 'Pandrama está disponible en navegadores web, dispositivos iOS, Android, televisores inteligentes (Samsung, LG) y consolas de videojuegos (PlayStation, Xbox).'
  },
];

const FaqItem: React.FC<{ faq: typeof faqs[0] }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2"
      >
        <span className="font-semibold">{faq.question}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-2 pb-4 text-gray-400 animate-fade-in-down">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const Support: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formState);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <div className="container mx-auto px-4 md:px-12 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Centro de Ayuda</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <FaqItem key={index} faq={faq} />
              ))}
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contacta con Nosotros</h2>
            {isSubmitted ? (
              <div className="bg-[#181818] p-8 rounded-lg text-center animate-fade-in">
                <h3 className="text-xl font-bold text-pink-400 mb-2">¡Gracias por tu mensaje!</h3>
                <p className="text-gray-300">Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#181818] p-8 rounded-lg space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                  <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} className="w-full bg-[#2a2a2a] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Correo Electrónico</label>
                  <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} className="w-full bg-[#2a2a2a] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Mensaje</label>
                  <textarea id="message" name="message" rows={4} value={formState.message} onChange={handleChange} className="w-full bg-[#2a2a2a] text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" required></textarea>
                </div>
                <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-md transition-colors">
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Support; 