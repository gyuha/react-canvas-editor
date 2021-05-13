import React, { useState, useEffect } from 'react';
import { ICanvas } from '../CanvasEditor';
import '../sass/_panel.scss';

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

  return (
    <div className="rce-property-panel" style={position}>
      text
    </div>
  );
};

PropertyPanel.defaultProps = {} as PropertyPanelProps;

export default PropertyPanel;
