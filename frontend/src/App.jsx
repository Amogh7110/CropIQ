import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';

function App() {
  const [results, setResults] = useState(null);

  const handleResults = (data) => {
    setResults(data);
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <div className="container">
          <InputForm onResults={handleResults} />
        </div>
        {results && <ResultsDashboard results={results} />}
      </main>
    </>
  );
}

export default App;
