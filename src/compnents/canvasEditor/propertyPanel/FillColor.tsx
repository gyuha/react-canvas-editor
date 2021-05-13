import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';
import useClickOutside from '../hooks/useClickOutside';
import '../sass/fillColor.scss';

type FillColorProps = {
  color?: string;
  onChange: (color: string) => void;
};

const FillColor = ({ color, onChange }: FillColorProps): React.ReactElement | null => {
  const popover = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(popover, close);

  return (
    <div className="picker">
      <div className="swatch" style={{ backgroundColor: color }} onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

FillColor.defaultProps = {
  color: 'black',
} as FillColorProps;

export default FillColor;
