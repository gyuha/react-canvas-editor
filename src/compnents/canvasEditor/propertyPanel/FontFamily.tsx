import React, { useCallback, useRef, useState } from 'react';
import { BiFontFamily } from 'react-icons/bi';
import useClickOutside from '../hooks/useClickOutside';

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
    activeObject.fontFamily = value;
    canvas.renderAll();
    close();
  };

  return (
    <div className="item picker" onClick={() => setIsOpen(true)}>
      <BiFontFamily />
      {isOpen && (
        <div className="popover select" ref={popover}>
          <ul>
            {fonts.map((font, idx) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li key={idx} onClick={() => onChange(font)} style={{ fontFamily: font }}>
                {font}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

FontFamily.defaultProps = {} as FontFamilyProps;

export default FontFamily;
