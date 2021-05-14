import React, { useCallback, useRef, useState } from 'react';
import { ImFontSize } from 'react-icons/im';
import useClickOutside from '../hooks/useClickOutside';
import '../sass/panel.scss';
import InputRange from './InputRange';

type FontSizeProps = {
  canvas: fabric.Canvas;
  activeObject: fabric.TextOptions;
};

const FontSize = ({ canvas, activeObject }: FontSizeProps): React.ReactElement | null => {
  const popover = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [, setFontSize] = useState(0);

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(popover, close);

  const onChange = (value: number) => {
    setFontSize(value);
    activeObject.fontSize = value;
    canvas.renderAll();
  };

  return (
    <div className="item picker">
      <ImFontSize onClick={() => setIsOpen(true)} />
      {isOpen && (
        <div className="popover input-range" ref={popover}>
          <InputRange min={5} max={100} value={activeObject.fontSize} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

FontSize.defaultProps = {} as FontSizeProps;

export default FontSize;
