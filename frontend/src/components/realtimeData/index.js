import React from "react";
import StartFirebase from "../lib/lib-firebase";
import { ref, onValue } from 'firebase/database';
import { Table } from 'react-bootstrap';
// import { Table } from '@mui/material/Table'

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
                records.push({ "key": keyName, "data": data })
            });
            this.setState({ tableData: records });
        });
    }



    render() {
        return (
            <Table className="container w-75" bordered striped variant='dark'>
                <thread>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Distance</th>
                    </tr>
                </thread>
                <tbody>
                    {this.state.tableData.map((row, index) => {
                        return (
                            <tr key={index}>
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
