import React, { useState, useEffect } from 'react'
import Heading from '../../../Components/Heading/Heading'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import AdditionalInfoContainer from '../../../UI/AdditionalInfoContainer/AdditionalInfoContainer'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import useHttp from '../../../Hooks/use-http'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie'
import axios from 'axios'
import { baseURL } from '../../../util'
// Demo Data 

const div_data = [{
    title: 'Heading 1',
    value: 'Value 1'
}]



const Emp_Transfer = () => {
    const navigate = useNavigate()
    const { sendRequest: fetchEmployee } = useHttp()
    const { sendRequest: fetchTransfer } = useHttp()
    const { employee_id, id } = useParams()
    const cookies = new Cookies();
    const token = cookies.get('admin_token')
    const [employee_data, setEmployeeData] = useState([])
    const [transfer_info, setTransferInfo] = useState([])
    const [department_to, setDepartmentTo] = useState(null)
    const [location_to, setlocationTo] = useState(null)
    const [floor_to, setFloorTo] = useState(null)
    const [designation_to, setDesignationTo] = useState(null)
    useEffect(() => {
       
        // if(token===null){
        // navigate('/login')
        // }
        const headers = { "Authorization": "Bearer " + token }
        const listEmployee = (employeeData) => {
            setEmployeeData([{
                title: "Name",
                value: employeeData.employeesResult[0].name
            }, {
                title: 'SuperVisor Name',
                value: employeeData.headEmployeesResult[0].head_employee_name
            }, {
                title: 'Designation',
                value: employeeData.employeesResult[0].role_name
            }, {
                title: 'Floor Name',
                value: employeeData.employeesResult[0].floor_name

            }, {
                title: 'Gender',
                value: employeeData.employeesResult[0].gender

            }, {
                title: 'location name',
                value: employeeData.employeesResult[0].location_name
            }, {
                title: 'location Department',
                value: employeeData.employeesResult[0].store_department_name
            }])
            setEmpId(employeeData.employeesResult[0].empID)

        }
        const listTransfer = (transfer) => {
            setTransferInfo([{
                title: 'Change Floor',
                value: transfer[0].floor_to_name
            },
            {
                title: 'Change Department',
                value: transfer[0].location_dep_name
            },
            {
                title: 'Previous Department',
                value: transfer[0].department_from_name
            },
            {
                title: 'Change Location',
                value: transfer[0].locations_to_name
            },
            {
                title: 'Change Designation',
                value: transfer[0].designation_to_name
            },
            ])
            setFloorTo(transfer[0].floor_id_to)
            setlocationTo(transfer[0].location_id_to)
            setDepartmentTo(transfer[0].department_to)
            setDesignationTo(transfer[0].designation_to)
        }

        fetchEmployee({ url: baseURL + "api/getEmployeeDetails?id=" + employee_id }, listEmployee)
        fetchTransfer({ url: baseURL + "api/getTransferDetails?id=" + id }, listTransfer)


    }, [])
    function cancel() {
        const headers = { "Authorization": "Bearer " + token }
        axios.patch(baseURL + "api/updateTransfer/" + id, {
            "status": 'Rejected',

        }, { headers }).then((response) => {
            if (response) {
                navigate(-1)
            }
        })

    }
    function approve() {
        const headers = { "Authorization": "Bearer " + token }
        axios.patch(baseURL + "api/updateTransfer/" + id, {
            "status": 'Approved',
            "employee_id": employee_id,
            "department_to": department_to,
            "floor_id_to": floor_to,
            "location_id": location_to,
            "designation_to": designation_to
        }, { headers }).then((response) => {
            if (response) {
                navigate(-1)
            }
        })
    }
    return (
        <React.Fragment>
            <Heading heading={'Employee Transfer'} />
            <DetailsDivContainer data={employee_data} />
            <div className='uni_container'>
                <h3 className='uni_heading'>Transfer Information</h3>
                <AdditionalInfoContainer data={transfer_info} />
            </div>
            <BottomButtonContainer cancel={'Reject'} approve={'Approve Transfer'} func={true} cancelRequests={() => { cancel }} func2={approve} />
        </React.Fragment>
    )
}

export default Emp_Transfer