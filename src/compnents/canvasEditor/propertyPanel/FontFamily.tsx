import React, { useCallback, useRef, useState } from 'react';
import { BiFontFamily } from 'react-icons/bi';
import useClickOutside from '../hooks/useClickOutside';
import InputRange from './InputRange';

type FontFamilyProps = {
  canvas: fabric.Canvas;
  activeObject: fabric.TextOptions;
};

const fonts = [
  'Arial',
  'Verdana',
  'Helvetica',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Garamond',
  'Courier New',
  'Brush Script MT',
];

const FontFamily = ({ canvas, activeObject }: FontFamilyProps): React.ReactElement | null => {
  const popover = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [, setFontFamily] = useState(0);

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(popover, close);

  const onChange = (value: any) => {
    setFontFamily(value);
    activeObject.fontFamily = value.target.value;
    canvas.renderAll();
  };

  return (
    <div className="item picker">
      <BiFontFamily onClick={() => setIsOpen(true)} />
      {isOpen && (
        <div className="popover input-range" ref={popover}>
          <select onChange={onChange}>
            {fonts.map((font, idx) => (
              <option value={font} key={idx}>
                {font}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

FontFamily.defaultProps = {} as FontFamilyProps;

export default FontFamily;
