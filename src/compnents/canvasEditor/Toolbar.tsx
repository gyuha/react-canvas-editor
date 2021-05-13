import React, { useState, useEffect } from 'react';
import './sass/_canvas.scss';
import {
  FaImage,
  FaImages,
  FaRegSquare,
  FaRegCircle,
  FaEraser,
  FaRegClone,
  FaRegSave,
  FaFont,
} from 'react-icons/fa';
import { fabric } from 'fabric';
import { ICanvas } from './CanvasEditor';

type ToolbarProps = {
  getCanvas: () => ICanvas;
};

const Toolbar = ({ getCanvas: canvas }: ToolbarProps): React.ReactElement | null => {
  const setBackgroundImage = () => {
    canvas().setBackgroundImage(
      'https://ichef.bbci.co.uk/news/976/cpsprodpb/13729/production/_112375697_1331db7a-17c0-4401-8cac-6a2309ff49b6.jpg',
      () => {
        const img = canvas().backgroundImage as fabric.Image;
        img.originX = 'left';
        img.originY = 'top';
        img.scaleX = canvas().getWidth() / Number(img.width);
        img.scaleY = canvas().getHeight() / Number(img.height);
        canvas().renderAll();
      }
    );
  };

  const addImage = () => {
    fabric.Image.fromURL(
      // 'https://ichef.bbci.co.uk/news/976/cpsprodpb/13729/production/_112375697_1331db7a-17c0-4401-8cac-6a2309ff49b6.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/A_TransGender-Symbol_Plain3.svg/480px-A_TransGender-Symbol_Plain3.svg.png',
      (img) => {
        canvas().add(img);
      }
    );
  };

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
    canvas().setActiveObject(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      fill: '#eee',
      radius: 50,
      strokeWidth: 1,
      stroke: '#bbb',
    });
    canvas().add(circle);
    canvas().setActiveObject(circle);
  };

  const addText = () => {
    const text = new fabric.Textbox('Text Input', {
      fontSize: 20,
      left: 100,
      top: 100,
      fill: '#000000',
      width: 100,
    });
    canvas().add(text);
    canvas().setActiveObject(text);
    text.selectAll();
    text.enterEditing();
  };

  return (
    <div className="rce-toolbar">
      <div className="item" onClick={() => setBackgroundImage()}>
        <FaImage />
      </div>
      <div className="item" onClick={() => addImage()}>
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
      <div className="item" onClick={() => canvas().quickClone()}>
        <FaRegClone />
      </div>
      <div className="item" onClick={() => canvas().removeActiveObjects()}>
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
