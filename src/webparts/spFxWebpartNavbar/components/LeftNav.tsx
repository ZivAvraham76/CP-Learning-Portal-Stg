import * as React from 'react';

const LeftNav: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={require('../../spFxWebpartNavbar/assets/logo.png')}
        className="w-[30px] h-[30px]"
        alt="Logo"
      />
      <div className='flex flex-col'>
      <div className="justify-start text-zinc-900 text-xs font-normal font-DIN_OT">CHECK POINT</div>
      <div className="justify-start text-black text-xs font-bold font-DIN_OT">LEARNING & TRAINING</div>
      </div>
    </div>
  );
};

export default LeftNav;
