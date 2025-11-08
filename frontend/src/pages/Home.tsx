import React from 'react';
import TextToSpeechButton from '../components/accessibility/TextToSpeechButton';

const Home = () => {
  const texto = "Bienvenido a Knowledge, una plataforma educativa inclusiva y gratuita.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold text-blue-600">Knowledge</h1>
      <p className="text-center mt-4 max-w-xl">
        {texto}
        <TextToSpeechButton text={texto} />
      </p>
    </div>
  );
};

export default Home;
