import React, { useState } from 'react';
import {
  FaTrash,
  FaAngleDoubleDown,
  FaAngleDown,
  FaAngleUp,
  FaAngleDoubleUp,
  FaRegClone,
} from 'react-icons/fa';
import { FabricCanvas } from '../FabricCanvas';
import '../sass/_panel.scss';
import FillColor from './FillColor';
import InputRange from './InputRange';

type PropertyPanelProps = {
  fabricCanvas: () => FabricCanvas;
  activeObject: any;
};

const getPanelPosition = (object: any, canvas: any): { left?: number; top?: number } => {
  if (!object) {
    return {};
  }
  const scaleY = object.scaleY || 1;
  let top = Number(object.top) + Number(object.height) * scaleY + 50;
  if (canvas.height < top) {
    top = canvas.height;
  }
  const left = object.left < 0 ? 0 : object.left;
  return {
    left,
    top,
  };
};

const PropertyPanel = ({
  activeObject,
  fabricCanvas,
}: PropertyPanelProps): React.ReactElement | null => {
  const position = getPanelPosition(activeObject, fabricCanvas().canvas);
  const [, setFillColor] = useState(activeObject.fill as string);
  const [, setFontSize] = useState(20);

  const onChangeFillColor = (newColor: string) => {
    const { canvas } = fabricCanvas();
    setFillColor(newColor);
    activeObject.set({ fill: newColor });
    canvas.renderAll();
  };

  const onChangeFontSize = (size: number) => {
    const { canvas } = fabricCanvas();
    // @ts-ignore
    activeObject.set({ fontSize: size });
    setFontSize(size);
    canvas.renderAll();
  };

  return (
    <div className="rce-property-panel" style={position}>
      {activeObject.fill && (
        <FillColor color={activeObject.fill as string} onChange={onChangeFillColor} />
      )}
      <InputRange
        min={1}
        max={100}
        step={1}
        onChange={(e) => onChangeFontSize(e)}
        value={activeObject.fontSize}
      />
      <div className="item" onClick={() => fabricCanvas().sendTo('back')}>
        <FaAngleDoubleDown />
      </div>
      <div className="item" onClick={() => fabricCanvas().sendTo('backwards')}>
        <FaAngleDown />
      </div>
      <div className="item" onClick={() => fabricCanvas().sendTo('forward')}>
        <FaAngleUp />
      </div>
      <div className="item" onClick={() => fabricCanvas().sendTo('front')}>
        <FaAngleDoubleUp />
      </div>
      <div className="item" onClick={() => fabricCanvas().quickClone()}>
        <FaRegClone />
      </div>
      <div className="item" onClick={() => fabricCanvas().removeActiveObjects()}>
        <FaTrash />
      </div>
    </div>
  );
};

PropertyPanel.defaultProps = {} as PropertyPanelProps;

export default PropertyPanel;
