import * as React from 'react';
import { Item } from './ISpFxWebpartNavbarProps';


interface CategoriesProps {
  categoriesList: Item[];
} 

const Categories: React.FC <CategoriesProps> = ({categoriesList}) => {

  // State to manage the open/close state of the dropdown
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Function to toggle the dropdown open/close state
  const toggleDropdown = (): void => {
    setIsOpen((prev) => !prev);
  };

  // Function to handle clicks outside the dropdown to close it
  const handleOutsideClick = (event: MouseEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Effect to add/remove the event listener for outside clicks
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <div ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <h4  className= "justify-start text-zinc-900 text-base font-normal font-Poppins">Categories</h4>
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-[200px] rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50 max-h-30 overflow-y-auto">
          {categoriesList.map((item, index) => (
            <li key={index}>
              <a href={item.Link} target="_blank" rel="noopener noreferrer" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                {item.Title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
