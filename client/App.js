import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import FrontEndRoutes from './FrontEndRoutes'
import NavMain from './components/NavMain';
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavMain />
        <FrontEndRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
