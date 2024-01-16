import React, { useEffect, useState } from 'react'
import BottomButtonContainer from '../../../Components/BottomButtonContainer/BottomButtonContainer'
import ExtraDetails from '../../../Components/ExtraDetails/ExtraDetails'
import Heading from '../../../Components/Heading/Heading'
import LabeledInput from '../../../Components/LabeledInput/LabeledInput'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import classes from './AddTransfer.module.css'
import ExpenseSearchBar from '../../../Components/ExpenseSearchBar/ExpenseSearchBar'
import SelectTag from '../../../Components/SelectTag/SelectTag'
import Img from '../../../assets/shop.png'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useHttp from '../../../Hooks/use-http'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '../../../util'

const AddTransfer = () => {
  const [isLoading,setIsloading]=useState(false)
  const cookies = new Cookies()
  const token = cookies.get('admin_token')
  const navigate = useNavigate()
  const [employee_data, setEmployeeData] = useState([])
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [text, setText] = useState('')
  const [notes, setNotes] = useState('')
  const [noData, setNoData] = useState(false)
  const [floors, setFloors] = useState([])
  const [locations, setlocations] = useState([])
  const [storeDepartments, setStoreDepartments] = useState([])
  const [selectedFloor, setSelectedFloor] = useState(null)
  const [selectedlocation, setSelectedlocation] = useState(null)
  const [selectedStoreDepartments, setSelectedStoreDepartments] = useState(null)
  const [floor_id_from, setFloorIdFrom] = useState('')
  const [location_id_from, setlocationIdFrom] = useState('')
  const [store_department_id_from, setStoreDeptIdFrom] = useState('')
   const[selectedDesignation,setSelectedDesignation]=useState(null)
  const [searchtext, setSearchText] = useState('')
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [category, setCategory] = useState(null)
  const [subCategory, setSubCategory] = useState(null)
  const [amount, setAmount] = useState(null)
  const [designations,setDesignations]=useState([])
  const { sendRequest: fetchFloors } = useHttp()
  const { sendRequest: fetchlocations } = useHttp()
  const { sendRequest: fetchstoreDepartments } = useHttp()
  const { sendRequest: fetchDesignations } = useHttp()
const [designationFrom,setDesignationFrom]=useState(null)
  const [employee_id, setEmployeeId] = useState(null)

  const searchHandler = (data) => {
    const headers = { "Authorization": "Bearer " + token }
    axios.get(baseURL + "api/getEmployeeDetails?employee_query=" + data, { headers }).then((response) => {
      if (response.data.employeesResult!==undefined) {
        setEmployeeId(response.data.employeesResult[0].id)
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
            title: 'Store Department',
            value: response.data.employeesResult[0].store_department_name
          }
        ])
        setNoData(false)
      }
      else {
        setNoData(true)
      }
      setFloorIdFrom(response.data.employeesResult[0].floor_id)
      setSelectedFloor(response.data.employeesResult[0].floor_id)
      setlocationIdFrom(response.data.employeesResult[0].location_id)
      setSelectedlocation(response.data.employeesResult[0].location_id)
      setStoreDeptIdFrom(response.data.employeesResult[0].store_department_id)
setSelectedStoreDepartments(response.data.employeesResult[0].store_department_id)
setDesignationFrom(response.data.employeesResult[0].role_id)
setSelectedDesignation(response.data.employeesResult[0].role_id)
    })


  }

  useEffect(() => {
    const listFloors = (floors) => {
      setFloors(floors)
    }
    fetchFloors({ url: baseURL+'api/getFloors' }, listFloors)
    const listlocations = (locations) => {
      setlocations(locations)
    }
    fetchlocations({ url: baseURL+'/api/getlocations' }, listlocations)
    const listStoreDepartments = (storeDepartments) => {
      setStoreDepartments(storeDepartments)
    }
    fetchstoreDepartments({ url: baseURL+'/api/getStoreDep' }, listStoreDepartments)
    const listDesignations = (designations) => {
      setDesignations(designations)
    }
    fetchDesignations({ url: baseURL+'/api/getRoles' }, listDesignations) 

  }, [])
  useEffect(()=>{
    const listDesignations = (designations) => {
      setDesignations(designations)
    }
    fetchDesignations({ url: baseURL+'api/getRoles?location_id='+selectedlocation }, listDesignations) 
  },[selectedlocation])
  function add(e) {
    const headers = { "Authorization": "Bearer " + token }
    e.preventDefault()
    if (employee_id === null) {
      toast.error("Employee Must Be Present")
    }

    else {
      setIsloading(true)
      axios.post(baseURL + "api/addTransferWithlocationId", {
        "employee_id": employee_id,
        "floor_id_to": selectedFloor!==''?selectedFloor:null,
        "floor_id_from": floor_id_from,
        "department_to": selectedStoreDepartments!==''?selectedStoreDepartments:null,
        "department_from": store_department_id_from,
        "location_id_from": location_id_from,
        "location_id_to": selectedlocation,
        "designation_from":designationFrom,
        "designation_to":Number(selectedDesignation)
      }, { headers }).then((response) => {
        if (response) {
          toast.success('Transfer Added!')
          setTimeout(() => {
              navigate(-1)
          }, 1000);
        }
      })

    }
  }
  function cancel(e) {
    e.preventDefault()
    const navigate = useNavigate()
    navigate(-1)
  }




  return (
    <React.Fragment>
      <Heading heading={'Add Transfer'} />
      <ToastContainer></ToastContainer>
      <ExpenseSearchBar func={searchHandler} />
      {searchtext === '' && noData ? '' : noData ? <h6>NO User Found</h6> : <DetailsDivContainer data={employee_data} />}
      <form className='uni_container' onSubmit={add}>
        <div className={classes.inner_container}>
          <div className={classes.add_expense_seleecct_container}>
            <label htmlFor="slt">Change Floor</label>
            <SelectTag  usingid={true} data={floors} title={'Floor'} selectedVal={setSelectedFloor} img={Img} value={selectedFloor} />
          </div>
          <div className={classes.add_expense_seleecct_container}>
            <label htmlFor="slt">Change location</label>
            <SelectTag required={true} usingid={true} data={locations} title={'location'} selectedVal={setSelectedlocation} img={Img} value={selectedlocation} />
          </div>
          <div className={classes.add_expense_seleecct_container}>
            <label htmlFor="slt">Change Designation</label>
            <SelectTag required={true} usingid={true} data={designations} title={'Designations'} selectedVal={setSelectedDesignation} img={Img} value={selectedDesignation} />
          </div>
          <div className={classes.add_expense_seleecct_container}>
            <label htmlFor="slt"> Change Department</label>
            <SelectTag  usingid={true} data={storeDepartments} title={'Store Departments'} selectedVal={setSelectedStoreDepartments} img={Img} value={selectedStoreDepartments} />
          </div>

        </div>
        <div className={classes.btn_container}>

          <button type='button' className={classes.cancel} onClick={(event) => cancel(event)}>Cancel</button>
          <button disabled={isLoading} type={'submit'} className={classes.accept} >Add Transfer</button>
        </div>
      </form>

    </React.Fragment>
  )
}

export default AddTransfer