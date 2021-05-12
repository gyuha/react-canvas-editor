import React, { useState, useEffect } from 'react';
import './sass/_canvas.scss';
import {
  FaImage,
  FaImages,
  FaRegSquare,
  FaRegCircle,
  FaEraser,
  FaRegSave,
  FaFont,
} from 'react-icons/fa';
import { fabric } from 'fabric';

type ToolbarProps = {
  getCanvas: () => fabric.Canvas;
};

const Toolbar = ({ getCanvas: canvas }: ToolbarProps): React.ReactElement | null => {
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
    canvas().add(rect);
  };

  const addCircle = () => {
    const rect = new fabric.Circle({
      left: 100,
      top: 100,
      fill: '#eee',
      radius: 50,
      strokeWidth: 1,
      stroke: '#bbb',
    });
    canvas().add(rect);
  };

  const addText = () => {
    const text = new fabric.Textbox('textbox', {
      fontSize: 20,
      left: 100,
      top: 100,
      fill: '#000000',
      width: 100,
    });
    canvas().add(text);
  };

  return (
    <div className="toolbar">
      <div className="item">
        <FaImage />
      </div>
      <div className="item">
        <FaImages />
      </div>
      <div className="item" onClick={() => addText()}>
        <FaFont />
      </div>
      <div className="item" onClick={() => addRect()}>
        <FaRegSquare />
      </div>
      <div className="item" onClick={() => addCircle()}>
        <FaRegCircle />
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
