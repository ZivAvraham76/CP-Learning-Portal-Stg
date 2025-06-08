import * as React from 'react';
import '../../../../assets/dist/tailwind.css';

interface PillarProps {
    selectedPillar: string;
    onPillarChange: (pillar: string) => void;
}

const Pillar: React.FC<PillarProps> = ({ selectedPillar, onPillarChange }) => {
    // Define the list of available pillars
    const pillars = ['Quantum', 'Harmony', 'CloudGuard', 'Infinity'];

    return (
        <div className="flex items-center gap-2 font-Poppins">
            <div className="text-black text-lg font-semibold">Pillar</div>
            <div className="flex text-xs font-Poppins">
                {pillars?.map((pillar, index) => {
                    const isFirst = index === 0;
                    const isLast = index === pillars?.length - 1;

                    return (
                        <button
                            key={pillar}
                            className={`
                                px-4 py-1 font-medium transition-colors duration-200
                                ${isFirst ? 'rounded-l-full border-l-[1px]' : ''}
                                ${isLast ? 'rounded-r-full border-r-[1px]' : ''}
                                ${!isLast ? 'border-r-[1px] border-[#41273c]' : ''}
                                border-t-[1px] border-b-[1px] border-[#41273c]
                                ${selectedPillar === pillar
                                    ? 'bg-[#41273c] text-white z-10'
                                    : 'bg-white text-[#41273c] hover:bg-[#896f85] hover:text-white'}
                              `}
                            onClick={() => onPillarChange(pillar)}>
                            {pillar}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};
export default Pillar;
