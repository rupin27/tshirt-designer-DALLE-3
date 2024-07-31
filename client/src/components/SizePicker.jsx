import React from 'react';
import { Slider, InputNumber, Space } from 'antd';
import { useSnapshot } from 'valtio';
import state from '../store';

const SizePicker = () => {
  const snap = useSnapshot(state);

  const handleChange = (value) => {
    state.decalScale = value;
  };

  return (
    <div className='sizepicker-container'>
    <Space direction="vertical" style={{ width: '100%' }}>
      <Slider
        min={0.1}
        max={2}
        step={0.01}
        value={snap.decalScale}
        onChange={handleChange}
      />
      <InputNumber
        min={0.1}
        max={2}
        step={0.01}
        value={snap.decalScale}
        onChange={handleChange}
        style={{ width: '50%' }}
      />
    </Space>
    </div>

  );
};

export default SizePicker;