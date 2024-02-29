import React, { useState } from 'react';

const Input = ({ label, value, unit, onChange }) => {
  const handleChange = e => {
    onChange(e.target.value);
  };

  const handleBlur = e => {
    var num = parseFloat(e.target.value);
    var cleanNum = num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    onChange(cleanNum);
  };
  return (
    <div className="flex flex-col  relative h-[72px]">
      <h2 className="label select-none absolute px-4 py-3.5 ">{label}</h2>
      <input
        type="number"
        className="number-small focus:border-none bg-gray-300 hover:bg-gray-400 border rounded-none border-none w-full h-full px-4 flex justify-end pt-5"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={event => event.target.select()}
      ></input>
      <div className="text-lg select-none absolute py-4 px-5 right-0 bottom-0 ">
        {unit}
      </div>
    </div>
  );
};

export default Input;
