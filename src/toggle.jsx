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
}) {
  return (
    <div className="flex justify-center  bg-gray-200 w-fit rounded-full">
      <button
        className={
          'py-2.5 px-5 rounded-full ' +
          classNames(currentState === tab1Name && 'bg-black text-white')
        }
        onClick={tab1Action}
      >
        {tab1Name}
      </button>
      <button
        className={
          'py-2.5 px-5 rounded-full ' +
          classNames(currentState === 'Realistic' && 'bg-black text-white')
        }
        onClick={tab2Action}
      >
        {tab2Name}
      </button>
      <button
        className={
          'py-2.5 px-5 rounded-full ' +
          classNames(currentState === 'Optimistic' && 'bg-black text-white')
        }
        onClick={tab3Action}
      >
        {tab3Name}
      </button>
    </div>
  );
}

export default Toggle;
