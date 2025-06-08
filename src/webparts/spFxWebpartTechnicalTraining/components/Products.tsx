import * as React from 'react';
import { useState } from 'react';
import '../../../../assets/dist/tailwind.css';
import { trainingObject } from './ISpFxWebpartTechnicalTrainingProps';

interface ProductsProps {
    selectedProduct: string;
    onProductChange: (product: string) => void;
    courses: trainingObject[];
    selectedPillar: string;
}

const Products: React.FC<ProductsProps> = ({ selectedProduct, onProductChange, courses, selectedPillar }) => {

    // Get unique products based on the selected pillar
    const allProducts = Array.from(new Set(
        courses?.filter((course) => course.pillar === selectedPillar)
            .map((course) => course.productName)
    ));

    allProducts.unshift('Select Product');

    // Dropdown state
    const [isOpen, setIsOpen] = useState(false);

    // Reference to the dropdown element for click outside detection
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const toggleDropdown = (): void => setIsOpen(!isOpen);
    const handleProductClick = (product: string): void => {
        onProductChange(product);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) : void => {
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

    return (
        <div ref={dropdownRef} className="relative inline-block text-left h-full">
            <button onClick={toggleDropdown} className="px-2 py-1 pr-8 rounded-full text-[#41273c] text-lg border-[1px] border-[#41273c] flex items-center justify-between">
                <span className="text-[#41273c] text-xs font-medium font-Poppins whitespace-nowrap">
                    {selectedProduct === "Select Product" ? "Select Product" : selectedProduct}
                </span>
                <svg className="absolute right-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z" fill="#41273C" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5 z-30 max-h-40 overflow-y-auto">
                    {allProducts.map((product) => (
                        <button
                            key={product}
                            onClick={() => handleProductClick(product)}
                            className={`block w-full text-left px-4 py-2 text-sm ${product === selectedProduct
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                        >
                            {product}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Products;