/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { useEffect, useRef } from 'react';
import { FabricCanvas } from './FabricCanvas';
import Toolbar from './Toolbar';
import './sass/editor.scss';

type CanvasEditorProps = {
  id: string; //! 캠버스 아이디
  width: number; //! 캠버스 폭 (툴바 제외)
  height: number; //! 캠버스 높이 (툴바 제외)
};

const CanvasEditor = ({ id, width, height }: CanvasEditorProps): React.ReactElement | null => {
  const fabricCanvas = useRef<any>(null);

  const canvas = () => fabricCanvas.current;

  useEffect(() => {
    fabricCanvas.current = new FabricCanvas(id, width, height);
  }, []);

  return (
    <div className="rce" style={{ width }} tabIndex={1000} onKeyUp={(e) => canvas().onKeyUp(e)}>
      <Toolbar fabricCanvas={() => fabricCanvas.current} />
      <canvas id={id} className="canvas" />
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
