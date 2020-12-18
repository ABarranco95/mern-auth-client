import './App.css';

import Welcome from './components/Welcome';
import About from './components/About';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Welcome />
      <About />
      <Footer />

    </div>
  );
}

export default App;
