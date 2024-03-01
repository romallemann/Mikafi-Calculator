import React, { useState } from 'react';

const Input = ({ label, value, unit, onChange, increment = 0.5, comment }) => {
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
    <div className="flex flex-col relative h-[72px]">
      <h2 className="label select-none absolute px-4 py-3.5 ">{label}</h2>
      <input
        step={increment}
        type="number"
        className="number-small focus:border-none bg-gray-300 hover:bg-gray-400 focus:outline-none border rounded-none border-none w-full h-full px-4 flex justify-end pt-5"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={event => event.target.select()}
      ></input>
      <div className="opacity-50 text text-lg pointer-events-none	select-none absolute pr-8 right-4 bottom-[11px] text-right">
        {comment}
      </div>
      <div className="text-lg pointer-events-none	select-none absolute pr-5 right-0 bottom-[11px] ">
        {unit}
      </div>
    </div>
  );
};

export default Input;
