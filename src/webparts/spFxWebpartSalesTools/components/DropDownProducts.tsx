import * as React from 'react';

interface LevelsProps {
  selectedProduct: string;
  onProductChange: (level: string) => void;
  selectedFilter: string;
  uniqueCourses: any[];
  uniqueAdsm: string[];
  uniqueRoles: string[];
}

const DropDownProducts: React.FC<LevelsProps> = ({ selectedProduct, onProductChange, selectedFilter, uniqueCourses, uniqueAdsm, uniqueRoles }) => {

  // Dropdown state
  const [isOpen, setIsOpen] = React.useState(false);

  // Reference to the dropdown element for click outside detection
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const toggleDropdown = (): void => setIsOpen(!isOpen);
  const handleLevelClick = (level: string): void => {
    onProductChange(level);
    setIsOpen(false);
  };


  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get the display options based on the selected filter
  const displayOptions =
    selectedFilter === 'Tool' ? uniqueCourses :
      selectedFilter === 'ADSM' ? uniqueAdsm :
        selectedFilter === 'Role' ? uniqueRoles : [];

  // Get the button label based on the selected filter                       
  const getButtonLabel = (): string => {
    if (selectedProduct === 'All') {
      if (selectedFilter === 'Tool') {
        return 'Select Tool';
      } else if (selectedFilter === 'ADSM') {
        return 'Select ADSM phase';
      } else if (selectedFilter === 'Role') {
        return 'Select Role';
      }
    }
    return selectedProduct;
  };

    return (
        <div ref={dropdownRef} className="relative inline-block text-left h-full">
            <button onClick={toggleDropdown} className="w-[170px] h-8 px-2 py-1 pr-8 rounded-full text-[#41273c] text-lg border-[1px] border-[#41273c] flex items-center justify-between">
                <span className="text-[#41273c] text-xs font-medium font-Poppins">
                    {getButtonLabel()}
                </span>
                <svg className="absolute right-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z" fill="#41273C" />
                </svg>
            </button>

      {isOpen && (
        <div className="absolute mt-2 w-[300px] rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50 max-h-40 overflow-y-auto">
          {displayOptions?.map((level) => (
            <button key={level} onClick={() => handleLevelClick(level)}
              className={`block w-full text-left px-4 py-2 text-sm ${level === selectedProduct ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}>
              {level}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownProducts;
