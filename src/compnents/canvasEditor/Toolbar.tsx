import React, { useState, useEffect } from 'react';
import './sass/_canvas.scss';
import { FaImage, FaImages, FaRegSquare, FaEraser, FaRegSave, FaFont } from 'react-icons/fa';
import { fabric } from 'fabric';

type ToolbarProps = {
  canvas: fabric.Canvas;
};

const Toolbar = ({ canvas }: ToolbarProps): React.ReactElement | null => {
  const addRect = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: '#eee',
      width: 100,
      height: 100,
      strokeWidth: 1,
      stroke: '#bbb',
    });
    canvas.add(rect);
  };
  return (
    <div className="toolbar">
      <div className="item" onClick={() => addRect()}>
        <FaImage />
      </div>
      <div className="item">
        <FaImages />
      </div>
      <div className="item">
        <FaFont />
      </div>
      <div className="item">
        <FaRegSquare />
      </div>
      <div className="item">
        <FaEraser />
      </div>
      <div className="item item-left">
        <FaRegSave />
      </div>
    </div>
  );
};

Toolbar.defaultProps = {} as ToolbarProps;

export default Toolbar;
