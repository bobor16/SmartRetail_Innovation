import React from "react";
import StartFirebase from "../lib/lib-firebase";
import { ref, onValue } from 'firebase/database';
import { Table } from 'react-bootstrap';

const db = StartFirebase();

export class RealtimeData extends React.Component {
    constructor() {
        super();
        this.state = {
            tableData: []
        }
    }

    componentDidMount() {
        const dbRef = ref(db, 'Ultrasonic');

        onValue(dbRef, (snapshot) => {
            let records = [];
            snapshot.forEach(childsnapshot => {
                let keyName = childsnapshot.key;
                let data = childsnapshot.val();
                let amount;
                const type = " pk"
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
                records.push({ "key": keyName, "data": amount + type })
            });
            this.setState({ tableData: records });
        });
    }

    render() {
        return (
            <Table striped bordered hover responsive size="sm">
                <thead >
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.tableData.map((row, index) => {
                        return (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{row.key}</td>
                                <td>{row.data}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}
