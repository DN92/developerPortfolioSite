import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import FrontEndRoutes from './FrontEndRoutes'
import NavFooterOnly from './components/nav/NavFooterOnly'
import NavMain from './components/nav/NavMain';
import Footer from './components/Footer'
import { MeProvider } from './MeContextProvider';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MeProvider >
          <NavFooterOnly />
          <NavMain />
          <FrontEndRoutes />
          <Footer />
        </MeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
