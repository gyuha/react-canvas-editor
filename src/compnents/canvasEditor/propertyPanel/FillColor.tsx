import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';
import useClickOutside from '../hooks/useClickOutside';
import '../sass/panel.scss';

type FillColorProps = {
  canvas: fabric.Canvas;
  activeObject: fabric.Object;
};

const FillColor = ({ canvas, activeObject }: FillColorProps): React.ReactElement | null => {
  const popover = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [, setFillColor] = useState('');

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(popover, close);

  const onChangeFillColor = (newColor: string) => {
    setFillColor(newColor);
    activeObject.set({ fill: newColor });
    canvas.renderAll();
  };

  return (
    <div className="picker">
      <div
        className="swatch"
        style={{ backgroundColor: activeObject.fill as string }}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={activeObject.fill as string} onChange={onChangeFillColor} />
        </div>
      )}
    </div>
  );
};

FillColor.defaultProps = {} as FillColorProps;

export default FillColor;
