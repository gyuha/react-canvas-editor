import { fabric } from 'fabric';
import 'fabric-history';

// set cornet style
fabric.Object.prototype.set({
  transparentCorners: false,
  borderColor: '#da00da',
  cornerColor: '#ff1919',
  cornerStyle: 'circle',
});

type SendToType = 'back' | 'backwards' | 'forward' | 'front';

export class FabricCanvas {
  public canvas: fabric.Canvas;

  private clipboard: any = null;

  private _activeObject: any = null;

  constructor(id: string, width: number, height: number) {
    this.canvas = new fabric.Canvas(id, {
      preserveObjectStacking: true,
      width,
      height,
    });

    this.canvas.on('selection:cleared', () => {
      this._activeObject = null;
    });
    this.canvas.on('selection:updated', (e) => this.onSelect(e, this.canvas));
    this.canvas.on('selection:created', (e) => this.onSelect(e, this.canvas));

    this.canvas.on('object:moving', () => this.onMove(this.canvas));
    this.canvas.on('object:scaling', () => this.onMove(this.canvas));
    this.canvas.on('object:rotating', () => this.onMove(this.canvas));
    this.canvas.on('object:moved', (e) => this.onMoved(e, this.canvas));
    this.canvas.on('object:scaled', (e) => this.onMoved(e, this.canvas));
    this.canvas.on('object:rotated', (e) => this.onMoved(e, this.canvas));
  }

  public get activeObject() {
    return this._activeObject;
  }

  sendTo(type: SendToType): void {
    const sel = this.canvas.getActiveObject();
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
  }

  copy() {
    const activeObjects = this.canvas.getActiveObject();
    if (activeObjects) {
      activeObjects.clone((cloned: any) => {
        this.clipboard = cloned;
      });
    }
  }

  paste() {
    // clone again, so you can do multiple copies.
    if (this.clipboard) {
      this.clipboard.clone((clonedObj: any) => {
        this.canvas.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = this.canvas;
          clonedObj.forEachObject((obj: any) => {
            this.canvas.add(obj);
          });
          // this should solve the unselectability
          clonedObj.setCoords();
        } else {
          this.canvas.add(clonedObj);
        }
        // store another clipboard
        this.clipboard.clone((cloned: any) => {
          cloned.top += 10;
          cloned.left += 10;
          this.clipboard = cloned;
        });
        // render
        this.canvas.setActiveObject(clonedObj);
        this.canvas.requestRenderAll();
      });
    }
  }

  onSelect(e: any, canvas: any) {
    try {
      if (canvas.getActiveObjects().length === 1) {
        this._activeObject = e.target;
      } else {
        this._activeObject = null;
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  onMove(canvas: any) {
    if (canvas.getActiveObjects().length === 1) {
      this._activeObject = null;
    }
  }

  onMoved(e: any, canvas: any) {
    if (canvas.getActiveObjects().length === 1) {
      this._activeObject = e.target;
    }
  }

  activeObjectMove = (x: number, y: number) => {
    const sel = this.canvas.getActiveObject();
    if (sel && sel.left && sel.top) {
      sel.set({
        left: sel.left + x,
        top: sel.top + y,
        evented: true,
      });
    }
    this.canvas.renderAll();
  };

  removeActiveObjects() {
    this.canvas.getActiveObjects().forEach((obj: any) => {
      this.canvas.remove(obj);
    });
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
  }

  quickClone() {
    const currentObject = this.canvas.getActiveObject();
    if (!currentObject) {
      return;
    }

    currentObject.clone((cloned: any) => {
      this.canvas.discardActiveObject();
      cloned.set({
        left: cloned.left + 10,
        top: cloned.top + 10,
        evented: true,
      });
      if (cloned.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        cloned.canvas = this.canvas;
        cloned.forEachObject((obj: any) => {
          this.canvas.add(obj);
        });
        // this should solve the unselectability
        cloned.setCoords();
      } else {
        this.canvas.add(cloned);
      }
      // render
      this.canvas.setActiveObject(cloned);
      this.canvas.requestRenderAll();
    });
  }

  selectAll() {
    this.canvas.discardActiveObject();
    const sel = new fabric.ActiveSelection(this.canvas.getObjects(), {
      canvas: this.canvas,
    });
    this.canvas.setActiveObject(sel);
    this.canvas.requestRenderAll();
  }

  redo() {
    // @ts-ignore
    this.canvas.redo();
  }

  undo() {
    // @ts-ignore
    this.canvas.undo();
  }

  onKeyUp(e: React.KeyboardEvent<HTMLDivElement>) {
    // console.log('📢[CanvasEditor.tsx:140]:', e.code);
    let step = 10;
    if (e.shiftKey) {
      step = 1;
    }
    switch (e.code) {
      case 'Delete':
        this.removeActiveObjects();
        break;
      case 'KeyC':
        if (e.ctrlKey) {
          this.copy();
        }
        break;
      case 'KeyV':
        if (e.ctrlKey) {
          this.paste();
        }
        break;
      case 'KeyA':
        if (e.ctrlKey) {
          this.selectAll();
        }
        break;
      case 'ArrowUp':
        if (e.ctrlKey && e.shiftKey) {
          this.sendTo('front');
          return;
        }
        if (e.ctrlKey) {
          this.sendTo('forward');
          return;
        }
        this.activeObjectMove(0, -step);
        break;
      case 'ArrowDown':
        if (e.ctrlKey && e.shiftKey) {
          this.sendTo('back');
          return;
        }
        if (e.ctrlKey) {
          this.sendTo('backwards');
          return;
        }
        this.activeObjectMove(0, step);
        break;
      case 'ArrowLeft':
        this.activeObjectMove(-step, 0);
        break;
      case 'ArrowRight':
        this.activeObjectMove(step, 0);
        break;
      case 'KeyZ':
        if (e.ctrlKey && e.shiftKey) {
          this.redo();
        } else if (e.ctrlKey) {
          this.undo();
        }
        break;
      default:
        break;
    }
  }
}
