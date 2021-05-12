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
      'https://ichef.bbci.co.uk/news/976/cpsprodpb/13729/production/_112375697_1331db7a-17c0-4401-8cac-6a2309ff49b6.jpg',
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

  const eraseActive = () => {
    const objects = canvas().getActiveObjects();
    if (objects.length) {
      objects.forEach((obj: any) => {
        canvas().remove(obj);
      });
    }
    canvas().discardActiveObject();
    canvas().renderAll();
  };

  return (
    <div className="toolbar">
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
      <div className="item" onClick={() => eraseActive()}>
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
