import React from 'react';
import { TbInboxOff } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';
import { BsFillCartPlusFill } from 'react-icons/bs';

function usePageViews() {
  let location = useLocation();
  return location.pathname;
}

function Column4Button({ StorageStatus }) {
  // const [active, setActive] = useState(false);
  // const handleClick = () => {
  //   setActive(!active);
  // };
  if (StorageStatus === true) {
    console.log("yay")
  }
  return (
    <>
      {usePageViews() === '/employee' && (
        <td class='w-25'>
          <button className='btn btn-danger btn-sm'

            // style={{ backgroundColor: active ? 'darkred' : 'green' }}
            style={{ backgroundColor: StorageStatus ? 'darkred' : 'green' }}
          // onClick={handleClick}

          >
            {StorageStatus ? 'Soldout' : 'Available'} <TbInboxOff class='h2'></TbInboxOff>
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
