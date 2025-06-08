import * as React from 'react';
import type { ISpFxWebpartNavbarProps } from './ISpFxWebpartNavbarProps';
import '../../../../assets/dist/tailwind.css';
import LeftNav from './LeftNav';
import Search from './Search';
import Services from './Services';
import Categories from './Categories';
import Acronyms from './Acronyms';
import PointsAndBadges from './PointsAndBadges';

const SpFxWebpartNavbar: React.FC<ISpFxWebpartNavbarProps> = (props) => {

  const { servicesList, categoriesList } = props;

  return (
    <div className="w-[1260px] widescreen:w-[1748px] relative z-10 mb-4  flex items-center justify-start h-28 bg-white shadow-[0px_4px_12px_-4px_rgba(0,_0,_0,_0.25)] px-8 py-3 gap-[24px] ">
      <LeftNav />
      <Search />
      <Services servicesList={servicesList} />
      <Categories categoriesList={categoriesList} />
      <div className="ml-auto flex items-center gap-4">
        <PointsAndBadges />
        <Acronyms />
      </div>

    </div>
  );
};

export default SpFxWebpartNavbar;