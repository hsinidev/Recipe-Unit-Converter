import React from 'react';
import Layout from './components/Layout';
import UnitConverterTool from './components/UnitConverterTool';
import SeoArticle from './components/SeoArticle';

const App: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 text-center">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg">
            Recipe Unit Converter
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Your friendly guide to perfect measurements. Convert any unit instantly and cook with confidence.
          </p>
        </header>
        
        <main>
          <UnitConverterTool />
          <div className="mt-24">
            <SeoArticle />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default App;
