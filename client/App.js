import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import FrontEndRoutes from './FrontEndRoutes'
import NavMain from './components/nav/NavMain';
import LoginComponent from './components/pages/auth/Login';
import Footer from './components/Footer'
import { MeProvider } from './MeContextProvider';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MeProvider >
          <NavMain />
          <FrontEndRoutes />
          <Footer />
        </MeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
