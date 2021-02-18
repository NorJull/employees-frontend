import axios from 'axios'

class EmployeeService {
    getEmployees(){
        return axios.get("http://localhost:8080/employees")
    }

    getEmployee(employeeId){
        return axios.get(`http://localhost:8080/employees/${employeeId}`)
    }
}

export default new EmployeeService()