import { useState } from "react";
import { User, Plus } from "lucide-react";

interface HeaderProps {
  isAuthenticated?: boolean;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onSignOut?: () => void;
}

const Header = ({ isAuthenticated = false, onSignIn, onSignUp, onSignOut }: HeaderProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
      <div className="flex items-center">
        <span className="text-white font-semibold text-lg">PhotoMe AI</span>
      </div>
      
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            {/* Create button */}
            <button className="transition-colors text-white flex items-center gap-1 rounded-md px-4 py-1.5 text-sm font-medium bg-blue-700 hover:bg-blue-600">
              <Plus size={16} />
              Create
            </button>
            
            {/* My Account dropdown */}
            <div className="relative">
              <button 
                className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-800"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <User size={20} />
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1e1e1e] border border-gray-800 rounded-md shadow-lg py-1 z-50">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                    My Account
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                    Settings
                  </a>
                  <button 
                    onClick={onSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button 
              onClick={onSignIn}
              className="px-4 py-1.5 text-gray-300 text-sm border border-gray-700 rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onSignUp}
              className="px-4 py-1.5 text-white text-sm bg-blue-700 hover:bg-blue-600 rounded-md transition-colors"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;