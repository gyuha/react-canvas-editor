import React, { useState, useEffect } from 'react';

type InputRangeProps = {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
};

const InputRange = ({
  min,
  max,
  step,
  value,
  onChange,
}: InputRangeProps): React.ReactElement | null => {
  const onValueChange = (e: any) => {
    console.log('📢[InputRange.tsx:18]:', e);
  };
  return (
    <input
      type="range"
      step={step}
      min={min}
      max={max}
      value={value}
      onMouseDown={onValueChange}
      onMouseUp={onValueChange}
      onMouseMove={onValueChange}
    />
  );
};

InputRange.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
} as InputRangeProps;

export default InputRange;
