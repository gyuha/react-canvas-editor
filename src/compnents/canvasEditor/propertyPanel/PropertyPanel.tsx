import React, { useState } from 'react';
import {
  FaTrash,
  FaAngleDoubleDown,
  FaAngleDown,
  FaAngleUp,
  FaAngleDoubleUp,
  FaRegClone,
} from 'react-icons/fa';
import { ICanvas } from '../CanvasEditor';
import '../sass/_panel.scss';
import FillColor from './FillColor';
import InputRange from './InputRange';

type PropertyPanelProps = {
  canvas: () => ICanvas;
  activeObject: fabric.Object;
};

const getPanelPosition = (object: any, canvas: any): { left?: number; top?: number } => {
  console.log('📢[PropertyPanel.tsx:12]:', object);
  if (!object) {
    return {};
  }
  const scaleY = object.scaleY || 1;
  let top = Number(object.top) + Number(object.height) * scaleY + 50;
  if (canvas.height < top) {
    top = canvas.height;
  }
  return {
    left: object.left,
    // @ts-ignore
    top,
  };
};

const PropertyPanel = ({ activeObject, canvas }: PropertyPanelProps): React.ReactElement | null => {
  const position = getPanelPosition(activeObject, canvas());
  const [fillColor, setFillColor] = useState(activeObject.fill as string);

  const onChangeFillColor = (newColor: string) => {
    setFillColor(newColor);
    activeObject.set({ fill: newColor });
    canvas().renderAll();
  };

  return (
    <div className="rce-property-panel" style={position}>
      {activeObject.fill && (
        <FillColor color={activeObject.fill as string} onChange={onChangeFillColor} />
      )}
      <InputRange min={1} max={100} step={1} onChange={(e) => console.log(e)} value={1} />
      <div className="item" onClick={() => canvas().sendTo('back')}>
        <FaAngleDoubleDown />
      </div>
      <div className="item" onClick={() => canvas().sendTo('backwards')}>
        <FaAngleDown />
      </div>
      <div className="item" onClick={() => canvas().sendTo('forward')}>
        <FaAngleUp />
      </div>
      <div className="item" onClick={() => canvas().sendTo('front')}>
        <FaAngleDoubleUp />
      </div>
      <div className="item" onClick={() => canvas().quickClone()}>
        <FaRegClone />
      </div>
      <div className="item" onClick={() => canvas().removeActiveObjects()}>
        <FaTrash />
      </div>
    </div>
  );
};

PropertyPanel.defaultProps = {} as PropertyPanelProps;

export default PropertyPanel;
