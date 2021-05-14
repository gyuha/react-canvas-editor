import React, { useCallback, useRef, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import InputRange from './InputRange';

type SetRangeProps = {
  canvas: fabric.Canvas;
  activeObject: any;
  changeValue: string;
  min: number;
  max: number;
  children: JSX.Element;
};

const SetRange = ({
  children,
  canvas,
  activeObject,
  changeValue,
  min,
  max,
}: SetRangeProps): React.ReactElement | null => {
  const popover = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [, setFontSize] = useState(0);

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(popover, close);

  const onChange = (value: number) => {
    setFontSize(value);
    activeObject[changeValue] = Number(value);
    canvas.renderAll();
  };

  return (
    <div className="item picker" onClick={() => setIsOpen(true)}>
      {children}
      {isOpen && (
        <div className="popover input-range" ref={popover}>
          <InputRange min={min} max={max} value={activeObject[changeValue]} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

SetRange.defaultProps = {} as SetRangeProps;

export default SetRange;
