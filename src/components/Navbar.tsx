import { Link } from 'react-router-dom';
import { CircuitBoard, User, LogOut } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-brand-primary/50 backdrop-blur-lg border-b border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8">
              <img
                src="/src/vikalma-logo.png"
                alt="Vikalma"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold text-brand-gold">Vikalma</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/submit"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-brand-gold/10 transition-colors"
            >
              <CircuitBoard size={18} />
              <span>Submit Project</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-brand-gold/10 transition-colors"
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-brand-gold/10 transition-colors text-brand-gold"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}