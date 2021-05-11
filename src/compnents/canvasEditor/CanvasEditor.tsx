/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import { fabric } from 'fabric';
import React, { useState, useEffect, useRef } from 'react';
import Toolbar from './Toolbar';

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
    if (paper.current.getActiveObject().length === 1) {
      setActiveObject(e.target);
    } else {
      setActiveObject(null);
    }
  };

  const removeActiveObject = () => {
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

  // keyboard events
  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log('📢[CanvasEditor.tsx:36]:', e);
    switch (e.code) {
      case 'Delete':
        removeActiveObject();
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
