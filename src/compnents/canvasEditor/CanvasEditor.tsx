import React, { useState, useEffect } from 'react';

type CanvasEditorProps = {
  id: string;
};

const CanvasEditor = ({ id }: CanvasEditorProps): React.ReactElement | null => {
  return <>{id}</>;
};

CanvasEditor.defaultProps = {} as CanvasEditorProps;

export default CanvasEditor;
