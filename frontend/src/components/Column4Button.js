import React from 'react';
import { TbInboxOff } from 'react-icons/tb';
import { BrowserRouter as Router, Switch, useLocation } from 'react-router-dom';
import { BsFillCartPlusFill } from 'react-icons/bs';
function usePageViews() {
  let location = useLocation();
  console.log(location);
  return location.pathname;
}

function Column4Button() {
  return (
    <>
      {usePageViews() === '/employee' && (
        <td class='w-25'>
          <button className='btn btn-danger btn-sm'>
            Soldout <TbInboxOff class='h2'></TbInboxOff>
          </button>
        </td>
      )}
      {usePageViews() === '/customer' && (
        <td class='w-25'>
          <button className='btn btn-success btn-sm'>
            Add to cart <BsFillCartPlusFill class='h2'></BsFillCartPlusFill>
          </button>
        </td>
      )}
    </>
  );
}

export default Column4Button;
