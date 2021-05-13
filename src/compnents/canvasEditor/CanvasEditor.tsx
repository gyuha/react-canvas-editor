/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import { fabric } from 'fabric';
import React, { useState, useEffect, useRef } from 'react';
import PropertyPanel from './propertyPanel/PropertyPanel';
import Toolbar from './Toolbar';

fabric.Object.prototype.set({
  transparentCorners: false,
  borderColor: '#da00da',
  cornerColor: '#ff1919',
  cornerStyle: 'circle',
});

type SendTo = 'back' | 'backwards' | 'forward' | 'front';

export interface ICanvas extends fabric.Canvas {
  removeActiveObjects: () => void;
  quickClone: () => void;
  sendTo: (send: SendTo) => void;
}

type CanvasEditorProps = {
  id: string; //! 캠버스 아이디
  width: number; //! 캠버스 폭 (툴바 제외)
  height: number; //! 캠버스 높이 (툴바 제외)
};

const CanvasEditor = ({ id, width, height }: CanvasEditorProps): React.ReactElement | null => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const paper = useRef<any>(null);
  const [clipboard, setClipboard] = useState<any>(null);
  const [activeObject, setActiveObject] = useState<any>(null);

  const onSelect = (e: any) => {
    try {
      if (paper.current.getActiveObjects().length === 1) {
        setActiveObject(e.target);
      } else {
        setActiveObject(null);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const onMove = (e: any) => {
    if (paper.current.getActiveObjects().length === 1) {
      setActiveObject(null);
    }
  };

  const onMoved = (e: any) => {
    if (paper.current.getActiveObjects().length === 1) {
      setActiveObject(e.target);
    }
  };

  const removeActiveObjects = () => {
    paper.current.getActiveObjects().forEach((obj: any) => {
      paper.current.remove(obj);
    });
    paper.current.discardActiveObject();
    paper.current.requestRenderAll();
  };

  const copy = () => {
    const activeObjects = paper.current.getActiveObject();
    if (activeObjects) {
      activeObjects.clone((cloned: any) => {
        setClipboard(cloned);
      });
    }
  };

  const paste = () => {
    // clone again, so you can do multiple copies.
    if (clipboard) {
      clipboard.clone((clonedObj: any) => {
        paper.current.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = paper.current;
          clonedObj.forEachObject((obj: any) => {
            paper.current.add(obj);
          });
          // this should solve the unselectability
          clonedObj.setCoords();
        } else {
          paper.current.add(clonedObj);
        }
        // store another clipboard
        clipboard.clone((cloned: any) => {
          cloned.top += 10;
          cloned.left += 10;
          setClipboard(cloned);
        });
        // render
        paper.current.setActiveObject(clonedObj);
        paper.current.requestRenderAll();
      });
    }
  };

  const quickClone = () => {
    const currentObject = paper.current.getActiveObject();
    if (!currentObject) {
      return;
    }

    currentObject.clone((cloned: any) => {
      paper.current.discardActiveObject();
      cloned.set({
        left: cloned.left + 10,
        top: cloned.top + 10,
        evented: true,
      });
      if (cloned.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        cloned.canvas = paper.current;
        cloned.forEachObject((obj: any) => {
          paper.current.add(obj);
        });
        // this should solve the unselectability
        cloned.setCoords();
      } else {
        paper.current.add(cloned);
      }
      // render
      paper.current.setActiveObject(cloned);
      paper.current.requestRenderAll();
    });
  };

  const selectAll = () => {
    paper.current.discardActiveObject();
    const sel = new fabric.ActiveSelection(paper.current.getObjects(), {
      canvas: paper.current,
    });
    paper.current.setActiveObject(sel);
    paper.current.requestRenderAll();
  };

  const activeObjectMove = (x: number, y: number) => {
    const sel = paper.current.getActiveObject();
    sel.set({
      left: sel.left + x,
      top: sel.top + y,
      evented: true,
    });
    paper.current.renderAll();
  };

  const sendTo = (type: SendTo): void => {
    const sel = paper.current.getActiveObject();
    switch (type) {
      case 'back':
        sel.sendToBack();
        break;
      case 'backwards':
        sel.sendBackwards();
        break;
      case 'forward':
        sel.bringForward();
        break;
      case 'front':
        sel.bringToFront();
        break;
      default:
        break;
    }
  };

  // keyboard events
  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // console.log('📢[CanvasEditor.tsx:140]:', e.code);
    let step = 10;
    if (e.shiftKey) {
      step = 1;
    }
    switch (e.code) {
      case 'Delete':
        removeActiveObjects();
        break;
      case 'KeyC':
        if (e.ctrlKey) {
          copy();
        }
        break;
      case 'KeyV':
        if (e.ctrlKey) {
          paste();
        }
        break;
      case 'KeyA':
        if (e.ctrlKey) {
          selectAll();
        }
        break;
      case 'ArrowUp':
        if (e.ctrlKey && e.shiftKey) {
          sendTo('front');
          return;
        }
        if (e.ctrlKey) {
          sendTo('forward');
          return;
        }
        activeObjectMove(0, -step);
        break;
      case 'ArrowDown':
        if (e.ctrlKey && e.shiftKey) {
          sendTo('back');
          return;
        }
        if (e.ctrlKey) {
          sendTo('backwards');
          return;
        }
        activeObjectMove(0, step);
        break;
      case 'ArrowLeft':
        activeObjectMove(-step, 0);
        break;
      case 'ArrowRight':
        activeObjectMove(step, 0);
        break;
      //   case 66:
      //     // b -> toggle group/ungroup
      //     if (e.ctrlKey) {
      //       e.preventDefault();
      //       e.stopPropagation();
      //       toggleGrouping();
      //     }
      //   break;
      default:
        break;
    }
  };

  useEffect(() => {
    paper.current = new fabric.Canvas(id, {
      preserveObjectStacking: true,
      width,
      height,
      backgroundColor: 'pink',
    });

    paper.current.on('selection:cleared', () => setActiveObject(null));
    paper.current.on('selection:updated', onSelect);
    paper.current.on('selection:created', onSelect);

    paper.current.on('object:moving', onMove);
    paper.current.on('object:scaling', onMove);
    paper.current.on('object:rotating', onMove);
    paper.current.on('object:moved', onMoved);
    paper.current.on('object:scaled', onMoved);
    paper.current.on('object:rotated', onMoved);

    paper.current.removeActiveObjects = removeActiveObjects;
    paper.current.quickClone = quickClone;
    paper.current.sendTo = sendTo;
  }, []);

  return (
    <div style={{ width }} tabIndex={1000} onKeyUp={onKeyUp}>
      <Toolbar getCanvas={() => paper.current} />
      <canvas ref={canvas} id={id} />
      {activeObject && <PropertyPanel activeObject={activeObject} canvas={() => paper.current} />}
    </div>
  );
};

CanvasEditor.defaultProps = {
  width: 1024,
  height: 600,
} as CanvasEditorProps;

export default CanvasEditor;
