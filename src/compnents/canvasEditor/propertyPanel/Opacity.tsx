import React, { useCallback, useRef, useState } from 'react';
import { CgDropOpacity } from 'react-icons/cg';
import useClickOutside from '../hooks/useClickOutside';
import InputRange from './InputRange';

type OpacityProps = {
  canvas: fabric.Canvas;
  activeObject: fabric.TextOptions;
};

const Opacity = ({ canvas, activeObject }: OpacityProps): React.ReactElement | null => {
  const popover = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [, setOpercity] = useState(0);

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(popover, close);

  const onChange = (value: number) => {
    setOpercity(value);
    activeObject.opacity = value / 100;
    canvas.renderAll();
  };

  return (
    <div className="item picker">
      <CgDropOpacity onClick={() => setIsOpen(true)} />
      {isOpen && (
        <div className="popover input-range" ref={popover}>
          <InputRange
            min={0}
            max={100}
            step={0.1}
            value={Number(activeObject.opacity) * 100}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

Opacity.defaultProps = {} as OpacityProps;

export default Opacity;
