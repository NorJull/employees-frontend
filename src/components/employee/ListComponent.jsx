import React, { Component } from "react"
import EmployeeService from "../../api/EmployeeService.js";
import { Formik, Field, Form, ErrorMessage } from "formik";


class ListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
        this.getEmployees = this.getEmployees.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.getEmployees()
    }

    getEmployees() {

        EmployeeService.getEmployees()
            .then(response => {
                this.setState(
                    { employees: response.data }
                )
            }).catch(err => {
                this.setState(
                    { employees: [] }
                )
                console.log(err);
            })
    }

    onSubmit(values) {
        if (values.employeeId) {
            EmployeeService.getEmployee(values.employeeId)
                .then(response => {
                    var retrivedEmployee = []
                    retrivedEmployee.push(response.data)
                    this.setState(
                        { employees: retrivedEmployee }
                    )
                }).catch(err => {
                    this.setState(
                        { employees: [] }
                    )
                    console.log(err);
                })

        } else {
            this.getEmployees()
        }
    }

    render() {
        let formInitialValues = {
            employeeId: this.state.employeeId
        }
        return (
            <div>
                <h1>Employees List</h1>
                <br></br>
                <br></br>
                <div className="container">
                    <Formik initialValues={{ employeeId: formInitialValues.employeeId }}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}

                    >
                        {(props) => (
                            <Form>
                                <fieldset className="form-group">
                                    <Field className="form-control" type="number" name="employeeId"></Field>
                                </fieldset>
                                <button className="btn btn-success" type="submit"> Get Employees!</button>
                            </Form>
                        )
                        }
                    </Formik>
                    <br></br>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Contract Type</th>
                                <th>Hourly Salary</th>
                                <th>Monthly Salary</th>
                                <th>Anual Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr>
                                            <td>{employee.id}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.roleName}</td>
                                            <td>{employee.contractTypeName}</td>
                                            <td>{employee.hourlySalary}</td>
                                            <td>{employee.monthlySalary}</td>
                                            <td>{employee.anualSalary}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )

    }

}
export default ListComponent