import React, { useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import useClickOutside from '../hooks/useClickOutside';
import '../sass/panel.scss';

type StrokeColorProps = {
  canvas: fabric.Canvas;
  activeObject: fabric.Object;
};

const StrokeColor = ({ canvas, activeObject }: StrokeColorProps): React.ReactElement | null => {
  const popover = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [, setStrokeColor] = useState('');

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(popover, close);

  const onChangeFillColor = (newColor: string) => {
    setStrokeColor(newColor);
    activeObject.set({ stroke: newColor });
    activeObject.set({ strokeWidth: activeObject.strokeWidth });
    canvas.renderAll();
  };

  return (
    <div className="picker">
      <div
        className="swatch"
        style={{ borderColor: activeObject.stroke as string }}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={activeObject.stroke as string} onChange={onChangeFillColor} />
        </div>
      )}
    </div>
  );
};

StrokeColor.defaultProps = {} as StrokeColorProps;

export default StrokeColor;
