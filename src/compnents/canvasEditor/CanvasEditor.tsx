/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { useEffect, useRef } from 'react';
import { FabricCanvas } from './FabricCanvas';
import Toolbar from './Toolbar';

type CanvasEditorProps = {
  id: string; //! 캠버스 아이디
  width: number; //! 캠버스 폭 (툴바 제외)
  height: number; //! 캠버스 높이 (툴바 제외)
};

const CanvasEditor = ({ id, width, height }: CanvasEditorProps): React.ReactElement | null => {
  const fabricCanvas = useRef<any>(null);

  const canvas = () => fabricCanvas.current;

  // keyboard events
  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // console.log('📢[CanvasEditor.tsx:140]:', e.code);
    let step = 10;
    if (e.shiftKey) {
      step = 1;
    }
    switch (e.code) {
      case 'Delete':
        canvas().removeActiveObjects();
        break;
      case 'KeyC':
        if (e.ctrlKey) {
          canvas().copy();
        }
        break;
      case 'KeyV':
        if (e.ctrlKey) {
          canvas().paste();
        }
        break;
      case 'KeyA':
        if (e.ctrlKey) {
          canvas().selectAll();
        }
        break;
      case 'ArrowUp':
        if (e.ctrlKey && e.shiftKey) {
          canvas().sendTo('front');
          return;
        }
        if (e.ctrlKey) {
          canvas().sendTo('forward');
          return;
        }
        canvas().activeObjectMove(0, -step);
        break;
      case 'ArrowDown':
        if (e.ctrlKey && e.shiftKey) {
          canvas().sendTo('back');
          return;
        }
        if (e.ctrlKey) {
          canvas().sendTo('backwards');
          return;
        }
        canvas().activeObjectMove(0, step);
        break;
      case 'ArrowLeft':
        canvas().activeObjectMove(-step, 0);
        break;
      case 'ArrowRight':
        canvas().activeObjectMove(step, 0);
        break;
      case 'KeyZ':
        if (e.ctrlKey && e.shiftKey) {
          canvas().redo();
        } else if (e.ctrlKey) {
          canvas().undo();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fabricCanvas.current = new FabricCanvas(id, width, height);
  }, []);

  return (
    <div style={{ width }} tabIndex={1000} onKeyUp={onKeyUp}>
      <Toolbar fabricCanvas={() => fabricCanvas.current} />
      <canvas id={id} />
      {/* {fabricCanvas?.activeObject && (
        <PropertyPanel activeObject={fabricCanvas?.activeObject} canvas={() => fabricCanvas} />
      )} */}
    </div>
  );
};

CanvasEditor.defaultProps = {
  width: 1024,
  height: 600,
} as CanvasEditorProps;

export default CanvasEditor;
