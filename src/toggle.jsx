import React from 'react';
import classNames from 'classnames';

function Toggle({
  currentState,
  tab1Name,
  tab1Action,
  tab2Name,
  tab2Action,
  tab3Name,
  tab3Action,
  size = 'large',
}) {
  return (
    <div className="flex justify-center  bg-gray-200 w-fit rounded-full">
      <button
        className={
          'rounded-full ' +
          classNames(
            currentState === tab1Name && 'bg-black text-white',
            size === 'large' && 'py-2.5 px-5 toggle-text-large',
            size === 'small' && 'py-1.5 px-4 toggle-text-small',
          )
        }
        onClick={tab1Action}
      >
        {tab1Name}
      </button>
      {tab2Action && (
        <button
          className={
            'rounded-full ' +
            classNames(
              currentState === tab2Name && 'bg-black text-white',
              size === 'large' && 'py-2.5 px-5 toggle-text-large',
              size === 'small' && 'py-1.5 px-4 toggle-text-small',
            )
          }
          onClick={tab2Action}
        >
          {tab2Name}
        </button>
      )}
      {tab3Action && (
        <button
          className={
            'rounded-full ' +
            classNames(
              currentState === tab3Name && 'bg-black text-white',
              size === 'large' && 'py-2.5 px-5 toggle-text-large',
              size === 'small' && 'py-1.5 px-4 toggle-text-small',
            )
          }
          onClick={tab3Action}
        >
          {tab3Name}
        </button>
      )}
    </div>
  );
}

export default Toggle;
