import * as React from 'react';

interface PillarsProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onProductReset: () => void;
}

const Filters: React.FC<PillarsProps> = ({ selectedFilter, onFilterChange, onProductReset }) => {

  // Define the list of available filters
  const filters = ['Tool', 'ADSM', 'Role'];

  // Function to handle when a filter is changed
  const handleFilterChange = (filter: string): void => {
    onFilterChange(filter);
    onProductReset();
  };

  return (
    <div className="flex items-center gap-2 font-Poppins">
      <div className="text-[#41273c] text-lg font-semibold">Search By</div>
      <div className="flex h-8 text-xs font-Poppins">
        {filters.map((filter, index) => {
          const isFirst = index === 0;
          const isLast = index === filters?.length - 1;

          return (
            <button
              key={filter}
              className={`
                px-4 py-1 font-medium transition-colors duration-200
                ${isFirst ? 'rounded-l-full border-l-[1px]' : ''}
                ${isLast ? 'rounded-r-full border-r-[1px]' : ''}
                ${!isLast ? 'border-r-[1px] border-[#41273c]' : ''}
                border-t-[1px] border-b-[1px] border-[#41273c]
                ${selectedFilter === filter
                  ? 'bg-[#41273c] text-white z-10'
                  : 'bg-white text-[#41273c] hover:bg-[#896f85] hover:text-white'}
              `}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>

  );
};

export default Filters;
