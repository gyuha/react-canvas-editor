import { fabric } from 'fabric';
import React, { useState, useEffect, useRef } from 'react';
import Toolbar from './Toolbar';

type CanvasEditorProps = {
  id: string; //! 캠버스 아이디
  width: number; //! 캠버스 폭 (툴바 제외)
  height: number; //! 캠버스 높이 (툴바 제외)
};

const CanvasEditor = ({ id, width, height }: CanvasEditorProps): React.ReactElement | null => {
  // const wrapper = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const paper = useRef<any>(null);

  const [activeObject, setActiveObject] = useState<any>(null);

  const onSelect = (e: any) => {
    if (paper.current.getActiveObject().length === 1) {
      setActiveObject(e.target);
    } else {
      setActiveObject(null);
    }
  };

  useEffect(() => {
    paper.current = new fabric.Canvas(id, { width, height, backgroundColor: 'pink' });
  }, []);

  return (
    <div style={{ width }}>
      <Toolbar canvas={paper.current} />
      <canvas ref={canvas} id={id} />
    </div>
  );
};

CanvasEditor.defaultProps = {
  width: 1024,
  height: 600,
} as CanvasEditorProps;

export default CanvasEditor;
