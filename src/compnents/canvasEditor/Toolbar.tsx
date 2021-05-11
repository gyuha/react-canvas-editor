import React, { useState, useEffect } from 'react';
import './sass/_canvas.scss';
import { FaImage, FaImages, FaRegSquare, FaEraser, FaRegSave, FaFont } from 'react-icons/fa';

type ToolbarProps = {
  canvas: fabric.Canvas;
};

const Toolbar = ({ canvas }: ToolbarProps): React.ReactElement | null => {
  return (
    <div className="toolbar">
      <div className="item">
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
