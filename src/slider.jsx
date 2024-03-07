import React, { useState } from 'react';

const Slider = ({ label, min, max, value, onChange }) => {
  const [currentValue, setCurrentValue] = useState(value || min); // Initial value

  const handleChange = event => {
    const newValue = Number(event.target.value);
    if (newValue >= min && newValue <= max) {
      setCurrentValue(newValue);
      onChange && onChange(newValue); // Call optional onChange handler
    }
  };
  const getBackgroundSize = () => {
    return { backgroundSize: `${(currentValue * 100) / max}% 100%` };
  };

  return (
    <div className="slider flex flex-col text-center">
      <h2 className="text-3xl font-medium ">{currentValue}</h2>
      <span className="text py-2 mb-8">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={currentValue}
        onChange={handleChange}
        style={getBackgroundSize()}
        className="mb-8"
      />
    </div>
  );
};

export default Slider;
