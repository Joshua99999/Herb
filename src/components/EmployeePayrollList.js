import { Component, React, useContext, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import PayrollService from "../services/PayrollService";
import { useHistory as history } from "react-router-dom";
import { Redirect } from 'react-router';
import Switch from "react-switch";

import DataTable from 'react-data-table-component';
import { connect } from "formik";

function Loading() {
    return (
        <><h5>Loading...</h5></>
    )
}

const EmployeePayrollList =() => {

    const [emploayeePayrollList, setEmploayeePayrollList] = useState([]);
    const [pending, setDdoOptions] = useState(false);

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         emploayeePayrollList: [],
    //         pending: true,
    //         redirState: false,
    //         checked: false

    //     }

    // }

    // componentDidMount() {

    //     let params = { ddocode: '05100308002' }
    //     PayrollService.empData(params).then(res => {
    //         console.log(res.data);
    //         this.setState({ pending: false, emploayeePayrollList: res.data })

    //     });


    // }

    // handleChange(checked) {
    //     this.setState({ checked });
    // }


    // handleClickRow = () => {
    //     this.setState({ redirState: true })
    // }
    const columns = [
        {
            name: 'SL.No',
            cell: (row, index) => index + 1,
            selector: row => row.slno,
        },
        {
            name: 'Employee Info',
            selector: row => row.empName + ' (' + row.empId + ')',
            sortable: true
        },
        {
            name: 'Earnings',
            selector: row => row.totalEarning,

        },
        {
            name: 'Deduction',
            selector: row => row.totalDeduction,

        },
        {
            name: 'Net Pay',
            selector: row => row.netPay,

        },
        {
            name: 'Exclude',
            selector: row => row.payrollStatus,
            cell: () => {
                <Switch checked={this.state.checked} />
            }
        },
        {
            name: 'No.of-Days worked',
            selector: row => row.workingDays,

        }

    ];
        return (
            <>
                <DataTable
                    title="Total Employees"
                    columns={columns}
                    pagination={true}
                    paginationPerPage="50"
                    progressPending={pending}
                    progressComponent={<Loading />}
                    data={emploayeePayrollList}
                    //onRowClicked={this.handleClickRow}
                //   pointerOnHover={true}
                //   highlightOnHover={true}
                //   theme="light"

                //   striped={true}
                

                />
                <Button type="submit" variant="success">Submit</Button>
            </>
        )
}
export default EmployeePayrollList;