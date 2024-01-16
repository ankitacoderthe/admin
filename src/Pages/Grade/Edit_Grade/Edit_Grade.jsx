import React from 'react'
import Heading from '../../../Components/Heading/Heading'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import GradeRangeSlider from '../../../Components/GradeRangeSlider/GradeRangeSlider'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import { useState } from 'react'
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { baseURL } from '../../../util'

const Edit_Grade = () => {
  const url = baseURL
  const cookies = new Cookies()
  const token = cookies.get('admin_token')
  const {id}=useParams()
  const [searchtext, setSearchText] = useState('')
  const [noData, setNoData] = useState(false)
  const [grade_1st, setGrade1st] = useState(0)
  const [grade_2nd, setGrade2nd] = useState(0)
  const [grade_4th, setGrade4th] = useState(0)
const [grade_3rd,setGrade3rd]=useState(0)
const [role_name,setRoleName]=useState(null)
  const [employee_data, setEmployeeData] = useState([])
  const navigate = useNavigate()
  const [employee_id, setEmployeeId] = useState(null)
  const fetchData = (data) => {
    const headers = { "Authorization": "Bearer " + token }
axios.get(url+"api/getLastGrade?id="+id,{headers}).then((response)=>{
    setGrade1st(response.data[0].grade_1st)
    setGrade2nd(response.data[0].grade_2nd)
    setGrade3rd(response.data[0].grade_3rd)
    setGrade4th(response.data[0].grade_4th)
    axios.get(url + "api/getEmployeeDetails?id=" + response.data[0].employee_id, { headers }).then((response) => {
              if (response.data.employeesResult.length > 0) {
                setEmployeeId(response.data.employeesResult[0].id)
        setRoleName(response.data.employeesResult[0].role_name)
                setEmployeeData([
                  {
                    title: "Name",
                    value: response.data.employeesResult[0].name
                  },
                  {
                    title: "Employee ID",
                    value: response.data.employeesResult[0].empID
                  },
                  {
                    title: 'SuperVisor Name',
                    value: response.data.headEmployeesResult[0]?.head_employee_name
                  }, {
                    title: 'Designation',
                    value: response.data.employeesResult[0].role_name
                  }, , {
                    title: 'Department',
                    value: response.data.employeesResult[0].department_name
                  }, {
                    title: 'Floor Name',
                    value: response.data.employeesResult[0].floor_name
        
                  }, {
                    title: 'Gender',
                    value: response.data.employeesResult[0].gender
        
                  }, {
                    title: 'location name',
                    value: response.data.employeesResult[0].location_name
                  }, {
                    title: 'location Department',
                    value: response.data.employeesResult[0].store_department_name
                  }
                ])
                setNoData(false)
              }
              else {
                setNoData(true)
              }
        
        
            })
})
//     
  }
  function cancel(e) {
    e.preventDefault()
    navigate(-1)
  }
  function add(e) {
    e.preventDefault()
    const headers = { "Authorization": "Bearer " + token }
  

  
      axios.patch(url + "api/editGrade/"+id, {
        "grade_1st": grade_1st,
        "grade_2nd": grade_2nd,
        "grade_3rd":grade_3rd,
        "grade_4th": grade_4th,
        "employee_id":employee_id
      }, { headers }).then((response) => {
        if (response) {
          toast.success('Grade Edited!')
          setTimeout(() => {
              navigate(-1)
          }, 1000);
        }
      })
    
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <React.Fragment>
      <Heading heading={'Edit Grade'} />
      <ToastContainer></ToastContainer>
      <DetailsDivContainer data={employee_data} />
      <GradeRangeSlider label={'Behaviour With Customer'}  value={grade_1st}   selectValue={setGrade1st} />
      <GradeRangeSlider label={'Behaviour With Staff/Head'} value={grade_2nd} selectValue={setGrade2nd} />
      {role_name==='Salesman'&&<GradeRangeSlider label={'Counter Clearance'}  value={grade_3rd} selectValue={setGrade3rd} />}
      <GradeRangeSlider label={'Presentation'} value={grade_4th} selectValue={setGrade4th} />

      <br />
      <BottomButtonContainer cancel={'Cancel'} approve={'Save'} func={true} cancelRequests={cancel} func2={add} />
    </React.Fragment>
  )
}

export default Edit_Grade
