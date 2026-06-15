import { Sprout, Menu } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        <div className="logo flex items-center gap-2">
          <div className="logo-icon">
            <Sprout size={28} color="#10b981" />
          </div>
          <span className="logo-text">CropIQ</span>
        </div>
        
        <div className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#analyze">Analyze</a>
          <a href="#about">About</a>
        </div>
        
        <div className="nav-actions">
          <button className="btn-secondary mobile-menu">
            <Menu size={20} />
          </button>
          <button className="btn-primary desktop-btn">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
