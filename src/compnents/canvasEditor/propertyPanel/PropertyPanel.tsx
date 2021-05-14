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
import '../sass/panel.scss';
import FillColor from './FillColor';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import Opacity from './Opacity';

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
  console.log('📢[PropertyPanel.tsx:41]:', activeObject);

  return (
    <div className="rce-property-panel" style={position}>
      {activeObject.fill && (
        <FillColor canvas={fabricCanvas().canvas} activeObject={activeObject} />
      )}
      {activeObject.fontSize && (
        <FontSize canvas={fabricCanvas().canvas} activeObject={activeObject} />
      )}
      {activeObject.fontSize && (
        <FontFamily canvas={fabricCanvas().canvas} activeObject={activeObject} />
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
