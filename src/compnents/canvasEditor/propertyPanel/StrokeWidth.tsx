import React, { useCallback, useRef, useState } from 'react';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import useClickOutside from '../hooks/useClickOutside';
import InputRange from './InputRange';

type StrokeWidthProps = {
  canvas: fabric.Canvas;
  activeObject: any;
  min: number;
  max: number;
};

const StrokeWidth = ({
  canvas,
  activeObject,
  min,
  max,
}: StrokeWidthProps): React.ReactElement | null => {
  const popover = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [, setChange] = useState(0);

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(popover, close);

  const onChange = (value: number) => {
    setChange(Number(value));
    activeObject.set({ stroke: activeObject.stroke, strokeWidth: Number(value) });
    canvas.renderAll();
  };

  return (
    <div className="item picker" onClick={() => setIsOpen(true)}>
      <AiOutlineColumnWidth />
      {isOpen && (
        <div className="popover input-range" ref={popover}>
          <InputRange min={min} max={max} value={activeObject.strokeWidth} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

StrokeWidth.defaultProps = {} as StrokeWidthProps;

export default StrokeWidth;
