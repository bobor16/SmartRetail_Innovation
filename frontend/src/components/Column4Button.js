import React from 'react';
// import { TbInboxOff } from 'react-icons/tb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom';
import { BsFillCartPlusFill } from 'react-icons/bs';

function usePageViews() {
  let location = useLocation();
  return location.pathname;
}

function Column4Button({ StorageStatus }) {
  if (StorageStatus === true) {
    console.log("yay")
  }
  return (
    <>
      {usePageViews() === '/employee' && (
        <td class='w-25'>
          <button className='btn btn-danger btn-md'
            style={{ backgroundColor: StorageStatus ? 'darkred' : 'green' }}>
            {StorageStatus ? 'Soldout' : 'Available'} <i class="fa-solid fa-warehouse"></i>
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
