import React, { useState, useEffect } from 'react';
import { ICanvas } from './CanvasEditor';

type PropertyPanelProps = {
  canvas: () => ICanvas;
};

const PropertyPanel = ({ canvas }: PropertyPanelProps): React.ReactElement | null => {
  return <></>;
};

PropertyPanel.defaultProps = {} as PropertyPanelProps;

export default PropertyPanel;
