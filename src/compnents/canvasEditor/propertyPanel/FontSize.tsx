import React, { useState, useEffect } from 'react';

type FontSizeProps = {
  value: number;
  onChange: (value: number) => void;
};

const FontSize = ({ value, onChange }: FontSizeProps): React.ReactElement | null => {
  return <></>;
};

FontSize.defaultProps = {} as FontSizeProps;

export default FontSize;
