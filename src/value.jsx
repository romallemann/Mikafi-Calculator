import React, { useState } from 'react';
import classNames from 'classnames';
const Value = ({
  label,
  value,
  pourcent,
  size,
  type = '$',
  negative = false,
  comment,
}) => {
  const formatMoney = value => {
    const newFormat = value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return newFormat;
  };
  const addPlusToPositive = number => {
    return number > 0 ? `+${number}` : number.toString();
  };

  const trafficLight = () => {
    if (!negative && pourcent > 0) {
      return true;
    } else if (negative && pourcent < 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <h2 className="label">{label}</h2>
      <span
        className={classNames({
          'number-large': size === 'large',
          'number-small': size === 'small',
        })}
      >
        {size === 'large' && '='}
        {type === '$' && '$' + formatMoney(value)}
        {type === 'kg' && value.toFixed(2) + 'kg'}
      </span>
      <span>
        {comment && (
          <span className="opacity-50 text text-lg pointer-events-none ml-1	select-none text-right">
            {comment}
          </span>
        )}
        {pourcent && (
          <span
            className={classNames('pl-1 text text-lg ', {
              'text-green': trafficLight(),
              'text-red-600': trafficLight() === false,
            })}
          >
            ({addPlusToPositive(pourcent.toFixed(1))}
            %)
          </span>
        )}
      </span>
    </div>
  );
};

export default Value;
