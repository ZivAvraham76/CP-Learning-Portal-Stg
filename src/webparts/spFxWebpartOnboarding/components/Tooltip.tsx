// Tooltip.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface TooltipProps {
  content: string;
  position: { top: number; left: number };
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ content, position, visible }) => {
  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg z-50 pointer-events-none"
      style={{ top: position.top, left: position.left, maxWidth: '300px' }}
    >
      {content}
      <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
    </div>,
    document.body
  );
};

export default Tooltip;
