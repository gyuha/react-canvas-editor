/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import events from 'events';
import { fabric } from 'fabric';
import React, { useState, useEffect, useRef } from 'react';
import Toolbar from './Toolbar';

export interface ICanvas extends fabric.Canvas {
  removeActiveObjects: () => void;
  quickClone: () => void;
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
  const [dirty, setDirty] = useState(false);
  const [activeObject, setActiveObject] = useState<any>(null);

  const onSelect = (e: any) => {
    try {
      if (paper.current.getActiveObject().length === 1) {
        setActiveObject(e.target);
      } else {
        setActiveObject(null);
      }
    } catch (err: any) {
      console.log(err);
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
        activeObjectMove(0, -step);
        break;
      case 'ArrowDown':
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
    paper.current = new fabric.Canvas(id, { width, height, backgroundColor: 'pink' });
    paper.current.on('selection:updated', onSelect);
    paper.current.on('selection:created', onSelect);
    paper.current.removeActiveObjects = removeActiveObjects;
    paper.current.quickClone = quickClone;
  }, []);

  return (
    <div style={{ width }} tabIndex={1000} onKeyUp={onKeyUp}>
      <Toolbar getCanvas={() => paper.current} />
      <canvas ref={canvas} id={id} />
    </div>
  );
};

CanvasEditor.defaultProps = {
  width: 1024,
  height: 600,
} as CanvasEditorProps;

export default CanvasEditor;
