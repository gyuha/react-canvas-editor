import React, { useState } from 'react';
import {
  FaTrash,
  FaAngleDoubleDown,
  FaAngleDown,
  FaAngleUp,
  FaAngleDoubleUp,
} from 'react-icons/fa';
import { ICanvas } from '../CanvasEditor';
import '../sass/_panel.scss';
import FillColor from './FillColor';

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
      {activeObject.fill && <FillColor color={fillColor} onChange={onChangeFillColor} />}
      <div className="item">
        <FaAngleDoubleDown onClick={() => canvas().sendTo('back')} />
      </div>
      <div className="item">
        <FaAngleDown onClick={() => canvas().sendTo('backwards')} />
      </div>
      <div className="item">
        <FaAngleUp onClick={() => canvas().sendTo('forward')} />
      </div>
      <div className="item">
        <FaAngleDoubleUp onClick={() => canvas().sendTo('front')} />
      </div>
      <div className="item">
        <FaTrash onClick={() => canvas().removeActiveObjects()} />
      </div>
    </div>
  );
};

PropertyPanel.defaultProps = {} as PropertyPanelProps;

export default PropertyPanel;
