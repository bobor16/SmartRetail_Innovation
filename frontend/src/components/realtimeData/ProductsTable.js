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
        console.log("data" + data)
        let amount;

        if (data >= 2 && data <= 4) {
          amount = 4;
        } else if (data >= 5 && data < 8) {
          amount = 3;
        } else if (data >= 8 && data < 14) {
          amount = 2;
        } else if (data >= 14 && data < 17) {
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
                  <td>{"Lurpak - Smør / (saltet) / 200 g"}</td>
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
          <tbody>
            {this.state.tableData.map((row, index) => {
              return (
                <tr key={index} >
                  <td>{2}</td>
                  <td>{"Natures Charm Sødet Kondenseret kokosmælk / 320 g "}</td>
                  <td>{14 + ' pk'}</td>
                  <td>{this.state.storageData.map((row) => {
                    return (
                      37 + ' pk'
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
          <tbody>
            {this.state.tableData.map((row, index) => {
              return (
                <tr key={index} >
                  <td>{3}</td>
                  <td>{"Danish BBQ Bundle - Danish"}</td>
                  <td>{0+ ' pk'}</td>
                  <td>{this.state.storageData.map((row) => {
                    return (
                      0 + ' pk'
                    )
                  })}
                  </td>
                  <td>
                    {<Column4Button StorageStatus={this.state.isEmpty == false} ></Column4Button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {this.state.tableData.map((row, index) => {
              return (
                <tr key={index} >
                  <td>{4}</td>
                  <td>{"Wispy Zero Sauce / 430 g"}</td>
                  <td>{0 + ' pk'}</td>
                  <td>{this.state.storageData.map((row) => {
                    return (
                      0 + ' pk'
                    )
                  })}
                  </td>
                  <td>
                    {<Column4Button StorageStatus={this.state.isEmpty == false} ></Column4Button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {this.state.tableData.map((row, index) => {
              return (
                <tr key={index} >
                  <td>{5}</td>
                  <td>{"EASIS - Pickles / 190 g"}</td>
                  <td>{5 + ' pk'}</td>
                  <td>{this.state.storageData.map((row) => {
                    return (
                      10 + ' pk'
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
          <tbody>
            {this.state.tableData.map((row, index) => {
              return (
                <tr key={index} >
                  <td>{6}</td>
                  <td>{"Kinder Pingui / 4 x 30 g "}</td>
                  <td>{17 + ' pk'}</td>
                  <td>{this.state.storageData.map((row) => {
                    return (
                      30 + ' pk'
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
