import React, { useCallback } from 'react';
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp,
  FaAngleDown,
  FaAngleUp,
  FaRegClone,
  FaTrash,
} from 'react-icons/fa';
import { ImFontSize } from 'react-icons/im';
import { FabricCanvas } from '../FabricCanvas';
import '../sass/panel.scss';
import FillColor from './FillColor';
import FontFamily from './FontFamily';
import Opacity from './Opacity';
import SetRange from './SetRange';
import StrokeColor from './StrokeColor';
import StrokeWidth from './StrokeWidth';

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
  if (object.strokeWidth) {
    top += object.strokeWidth * 3;
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
  console.log('📢[PropertyPanel.tsx:41]:', activeObject);

  const isImage = useCallback(() => {
    if (activeObject.filters === undefined) {
      return false;
    }
    if (activeObject.filters.length >= 0) {
      return true;
    }
    return false;
  }, [activeObject]);

  const isFont = useCallback(() => activeObject.fontSize, [activeObject]);

  return (
    <div className="rce-property-panel" style={position}>
      {!isImage() && <FillColor canvas={fabricCanvas().canvas} activeObject={activeObject} />}
      {!isFont() && activeObject.stroke && (
        <StrokeColor canvas={fabricCanvas().canvas} activeObject={activeObject} />
      )}
      {!isFont() && activeObject.stroke && (
        <StrokeWidth min={0} max={20} canvas={fabricCanvas().canvas} activeObject={activeObject} />
      )}
      {isFont() && <FontFamily canvas={fabricCanvas().canvas} activeObject={activeObject} />}
      {isFont() && (
        <SetRange
          min={5}
          max={100}
          changeValue="fontSize"
          canvas={fabricCanvas().canvas}
          activeObject={activeObject}
        >
          <ImFontSize />
        </SetRange>
      )}
      {activeObject.opacity && (
        <Opacity canvas={fabricCanvas().canvas} activeObject={activeObject} />
      )}
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
