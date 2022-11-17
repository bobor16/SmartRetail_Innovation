import React from 'react';
import Navbar from '../Navbar';
import { ProductsTable } from '../realtimeData/ProductsTable';
function Employee() {
  return (
    <>
      <Navbar></Navbar>

      <h1 class='text-center pt-5 pb-5'>Products</h1>

      <ProductsTable />
    </>
  );
}

export default Employee;
