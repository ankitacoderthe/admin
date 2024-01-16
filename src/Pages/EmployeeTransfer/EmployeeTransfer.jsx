import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

import Pagination from '../../Components/Pagination/Pagination'
// Data for Table
import Cookies from 'universal-cookie'

import useHttp from '../../Hooks/use-http'
import axios from 'axios'

import moment from 'moment/moment'
import MainTable from '../../Components/MainTable/MainTable'
import EmployeeTransferModal from '../../Components/AllModals/EmployeeTransferModal'
import classes from './EmployeeTransfer.module.css'
import { baseURL } from '../../util'
const EmployeeTransfer = () => {
  
  const [date, setDate] = useState(new Date())
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const cookies = new Cookies();
  const token = cookies.get('admin_token')
  const [Data,setData]=useState([])
  const [total,setTotal]=useState(0)
  const { sendRequest: fetchTransfer } = useHttp()
  
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    location_name: ""
  })

useEffect(() => {
  let from_date = moment(date)
//getTransfer
if(employeeFilter.location_name!=''){
  let getString = baseURL + "api/getTransfer?location_name="+employeeFilter.location_name+"&limit="+limit+"&offset="+offset
  if(employeeFilter.employee_query!=''  &&employeeFilter.employee_query!==undefined){
    getString+="&employee_query="+employeeFilter.employee_query
}
    if(employeeFilter.role_name!=''){
      getString+='&role_name='+employeeFilter.role_name
    }
    if(employeeFilter.floor_name!=''){
      getString+="&floor_name="+employeeFilter.floor_name
    }
   
    if(date!=null){
      let from_date=moment(date)
      getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")
    }
    const listTransfer = (transfer) => {
  
     
      setData(transfer)
    }
    fetchTransfer({ url: getString }, listTransfer)
    getString = baseURL + "api/getTransfer?location_name="+employeeFilter.location_name
  if(employeeFilter.employee_query!=''  &&employeeFilter.employee_query!==undefined){
    getString+="&employee_query="+employeeFilter.employee_query
}
    if(employeeFilter.role_name!=''){
      getString+='&role_name='+employeeFilter.role_name
    }
    if(employeeFilter.floor_name!=''){
      getString+="&floor_name="+employeeFilter.floor_name
    }
   
    if(date!=null){
      let from_date=moment(date)
      getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+from_date.add(1,'d').format("YYYY-MM-DD")
    }
    const listTotal = (transfer) => {
  
     
      setTotal(transfer.length)
    }
    fetchTransfer({ url: getString }, listTotal)
  }


}, [date, limit, offset, employeeFilter])
const selectBylocation = (data) => {

  setEmployeeFilter((prevState) => {
    return { ...prevState, location_name: data }
  })

}
const selectByFloor = async (data) => {

  setEmployeeFilter((prevState) => {
    return { ...prevState, floor_name: data }
  })
}
const selectEntries = (data) => {
  setLimit(data)
}
const selectPage = (data) => {
  console.log(data)
  setOffset((data - 1) * limit)
}
const changeDate = (data) => {
  setDate(data)
}
const changeByEmployee = (data) => {

  // if(data.charAt(0)!=='1')
  //  {

  setEmployeeFilter((prevState) => {
    return { ...prevState, employee_query: data }
  })
}
const changeByDesignation = (data) => {

  setEmployeeFilter((prevState) => {
    return { ...prevState, role_name: data }
  })

}

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Floor From'},
    {heading:'Floor To'},
    {heading:'Department From'},
    {heading:'Department To'},
    {heading:'location From'},
    {heading:'location To'},
    {heading:'Status'}
  ]

  const tableKeys = [
    'employee_name','empID','floor_from_name','floor_to_name','department_from_name','location_dep_name','locations_from_name','locations_to_name','status'
  ]

  const [newval, setNewVal] = useState(false)
  const [obj,setObj] = useState({})

  const changeModalState = ([val , element]) => {
    setNewVal(val)
    setObj(element)
  }

  return (
    <React.Fragment>
      <EmployeeTransferModal value={newval} setval={setNewVal} Obj={obj} />
      <Heading heading={'Employee Transfer'} Btn_link={'/add_transfer'} Btn={'Transfer'} />
      <DropDownFilter selectByFloor={selectByFloor} selectBylocation={selectBylocation}  title1={'Floor'} title2={'Location'} />
      <Filter data={Data} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <div className={classes.whole_table_c}>
      <MainTable func={changeModalState} Lnk3={true} link1={'/emp_transfer'} link2={'/emp_transfer_details'} link4={false} App_Btn={false} data={Data} height={true} Btn={false} headings={tableHeadings} keys={tableKeys} wd={'2000px'} />
      </div>
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />

    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>


export default EmployeeTransfer