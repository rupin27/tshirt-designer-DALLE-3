import React, { useState } from 'react';
import { Input, Slider } from 'antd';
import { useSnapshot } from 'valtio';
import state from '../store';
import CustomButton from './CustomButton';
import { SliderPicker } from 'react-color';

const TextPicker = () => {
  const snap = useSnapshot(state);
  const [input, setInput] = useState('');

  const handleInputChange = (input) => {
    state.textInput = input;
  };

  const handleScaleChange = (value) => {
    state.textScale = value;
  };

  const handleWidthChange = (value) => {
    state.textMaxWidth = value;
  };

  const handleHeightChange = (value) => {
    state.textLineHeight = value;
  };

  return (
    <div className='textpicker-container'>
    <div className='flex-1 flex flex-col'>
        <p className='mt-2 text-white text-xs truncate'>
            Enter Text
        </p>
        <Input 
            className='mt-2'
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text here"
            style={{ 
                backgroundColor: 'rgba(211, 211, 211, 0.5)', 
                color: 'white',
                borderColor: 'transparent'
              }}
        />
        <p className='mt-5 text-white text-xs truncate'>
            Select Text Size
        </p>
        <Slider
            min={0.01}
            max={0.14}
            step={0.010}
            value={snap.textScale}
            onChange={handleScaleChange}
        />
        <p className='mt-2 text-white text-xs truncate'>
            Select Color
        </p>
        <SliderPicker 
            className='mt-4'
            color={snap.textColor}
            disableAlpha
            onChange={(color) => state.textColor = color.hex}
        />
        <p className='mt-5 text-white text-xs truncate'>
            Select Wrapping
        </p>
        <Slider
            min={0}
            max={20}
            step={1}
            value={snap.textMaxWidth}
            onChange={handleWidthChange}
        />
        <p className='mt-2 text-white text-xs truncate'>
            Select Line Height
        </p>
        <Slider
            min={0.6}
            max={2}
            step={0.1}
            value={snap.textLineHeight}
            onChange={handleHeightChange}
        />
    </div>
    <div className='mt-4 flex flex-wrap gap-3'>
      <CustomButton 
        type='outline'
        title='Create'
        handleClick={() => handleInputChange(input)}
        customStyles='text-xs'
      />
      <CustomButton 
        type='filled'
        title='Remove'
        handleClick={() => handleInputChange(null)}
        customStyles='text-xs'
      />
    </div>
  </div>

  );
};

export default TextPicker;