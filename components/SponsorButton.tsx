import { CupSoda, Github, Heart } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const SponsorButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside both the popup and the button
      const targetElement = event.target as Node;
      
      if (
        popupRef.current && 
        buttonRef.current && 
        !popupRef.current.contains(targetElement) && 
        !buttonRef.current.contains(targetElement)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      {/* Sponsor Button */}
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3.5 px-6 rounded-md transition-colors duration-300"
      >
        <Heart size={18} fill='white' className="text-white" />
        Sponsor
      </button>
      
      {/* Popup */}
      {isOpen && (
        <div 
          ref={popupRef}
          className="absolute mt-2 w-64 bg-[#040d07] rounded-lg shadow-lg p-4 z-10 top-full left-1/2 transform -translate-x-1/2 border border-green-800"
        >
          {/* Triangle pointer */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-pink-600"></div>
          
          {/* GitHub Sponsors Option */}
          <a 
            href="https://github.com/sponsors/HarmanPreet-Singh-XYT" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-4 mb-2 border border-green-900 rounded-md hover:bg-green-900 hover:bg-opacity-50 transition-colors duration-200 text-gray-200"
          >
            <Github size={18} className="text-green-400" />
            <span className="text-sm font-medium">GitHub Sponsors</span>
          </a>
          
          {/* Buy Me A Coffee Option */}
          <a 
            href="https://buymeacoffee.com/harmanpreetsingh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-green-900 rounded-md hover:bg-green-900 hover:bg-opacity-50 transition-colors duration-200 text-gray-200"
          >
            <CupSoda size={18} className="text-green-400" />
            <span className="text-sm font-medium">Buy Me A Coffee</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default SponsorButton;