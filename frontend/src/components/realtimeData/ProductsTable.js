import React from 'react';
import StartFirebase from '../lib/lib-firebase';
import { ref, onValue } from 'firebase/database';
import { Table } from 'react-bootstrap';
import './ProductsTable.css';
import Column4Button from '../Column4Button';

const db = StartFirebase();

export class ProductsTable extends React.Component {
  constructor() {
    super();
    this.state = {
      isEmpty: false,
      tableData: [],
      storageData: []
    };
  }

  componentDidMount() {
    const dbRef = ref(db, 'Ultrasonic');
    const dbStorage = ref(db, 'Storage');

    onValue(dbStorage, (snapshot) => {
      let records = [];
      snapshot.forEach((childsnapshot) => {
        let keyName = childsnapshot.key;
        let data = childsnapshot.val();

        if (data === 0) {
          this.setState({ isEmpty: true })
        } else {
          this.setState({ isEmpty: false })
        }

        records.push({ key: keyName, data });
      });
      this.setState({ storageData: records });

    })

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childsnapshot) => {
        let keyName = childsnapshot.key;
        let data = childsnapshot.val();
        let amount;

        if (data >= 50 && data <= 60) {
          amount = 5;
        } else if (data >= 40 && data < 50) {
          amount = 4;
        } else if (data >= 30 && data < 40) {
          amount = 3;
        } else if (data >= 20 && data < 30) {
          amount = 2;
        } else if (data >= 10 && data < 20) {
          amount = 1;
        } else {
          amount = 0;
        }
        records.push({ key: keyName, data: amount });
      });
      this.setState({ tableData: records });
    });
  }

  render() {
    return (
      <>
        <Table
          striped
          bordered
          hover
          responsive
          size='sm'
          className='content-table'
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Storage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((row, index) => {
              return (
                <tr key={index} >
                  <td>{index + 1}</td>
                  <td>{"Mælkesnitter"}</td>
                  <td>{row.data + ' pk'}</td>
                  <td>{this.state.storageData.map((row) => {
                    return (
                      row.data + ' pk'
                    )
                  })}
                  </td>
                  <td>
                    {<Column4Button StorageStatus={this.state.isEmpty} ></Column4Button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}
