import classes from './Grade.module.css'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/GradeFilter/Filter'

import Pagination from '../../Components/Pagination/Pagination'
// Data for Table

import MainTable from '../../Components/MainTable/MainTable'
import axios from 'axios'
import Cookies from 'universal-cookie'
import moment from 'moment'
import { baseURL } from '../../util'
const Grade = () => {
  const url = baseURL
const [Data,setData]=useState([])
const [date, setDate] = useState(new Date())
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const cookies = new Cookies();
  const token = cookies.get('admin_token')
  const [TileData, setTileData] = useState([])
  const [total,setTotal] = useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    location_name: ""
  })
  
  useEffect(()=>{
    const headers = { "Authorization": "Bearer " + token }
let from_date=moment()
from_date=from_date.startOf('month')
let to_date=moment().endOf('month').add(1,'d')
axios.get(url+"api/getGrades?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset,{headers}).then((response)=>{
  response.data.forEach((data)=>{
    data.out_of_40=data.grade_1st_avg+data.grade_2nd_avg+data.grade_3rd_avg+data.grade_4th_avg
  data.out_of_60=(data.WD_Grade+data.COM_Grade+data.Fine_Marks)*2
  if(data.role_name==='Floor Incharge'){
   
    if(data.date.substring(8,10)>=moment().startOf('week').date()&& data.date.substring(8,10)<=moment().endOf('week').date()){
      
      data.status='Completed'
    }
    else{
      data.status='Pending'
    }
  }else{
    data.status=null
  }
 

})
setData(response.data)
})
from_date=moment()
from_date=from_date.startOf('month')
to_date=moment().endOf('month').add(1,'d')
axios.get(url+"api/getGrades?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD") ,{headers}).then((response)=>{
 
setTotal(response.data.length)
})
axios.get(url+"api/calculateAverageGrade",{headers}).then((response)=>{
  axios.get(url+"api/isGraded",{headers}).then((responseOne)=>{
    axios.get(url+"api/getTotalEmployees",{headers}).then((responseTwo)=>{ 
      let from_date_out=moment()
      axios.get(baseURL+"api/getTotalOutSessions?from_date=" + from_date_out.format("YYYY-MM-DD") + "&to_date=" + from_date_out.add(1, 'd').format("YYYY-MM-DD"), { headers }).then((responseThird) => {
setTileData( [
  {
    title: 'Average Employee',
    value: response.data,
  },
  {
    title: 'Grade Employee',
    value: responseOne.data[0].count_id
  },
  {
    title: 'Left Grade Employee',
    value: responseTwo.data[0].count_id-responseOne.data[0].count_id,
   
  },
  {
    title: 'Out From location',
    value: responseThird.data[0].count_id,
    
  }
])
})
})
})
})
  },[])
  

  // Table Headings, Data and Keys
  const tableHeadings=[
    {heading:'Employee Name'},
    {heading:'Employee ID'},
    {heading:'Designation'},
    {heading:'WD Grade'},
    {heading:'COM Grade'},
    {heading:'Fine Marks'},
    {heading:'Out of 60'},
    {heading:'Behavior With Customer'},
    {heading:'Behavior With Staff/Head'},
    {heading:'Counter Clearance'},
    {heading:'Presentation'},
    {heading:'Out Of 40'},
    {heading:'Out Of 100'},
    {heading:'Final Grade'},
    {heading:'Status'}
  ]

  const tableKeys = [
    'employee_name','empID','role_name','WD_Grade','COM_Grade','Fine_Marks','out_of_60','grade_1st_avg','grade_2nd_avg','grade_3rd_avg','grade_4th_avg','out_of_40','Total','Grade_Equivalent','status'
  ]
  useEffect(() => {
    const headers = { "Authorization": "Bearer " + token }
    let from_date = moment(date).startOf('month')
  let to_date=moment(date).endOf('month').add(1,'d')
    let getString = url + "api/getGrades?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD") + "&limit=" + limit + "&offset=" + offset
    if (employeeFilter.employee_query != '' &&employeeFilter.employee_query!==undefined) {
      getString += "&employee_query=" + employeeFilter.employee_query
    }
    if (employeeFilter.role_name != '') {
      getString += '&role_name=' + employeeFilter.role_name
    }
    if (employeeFilter.floor_name != '') {
      getString += "&floor_name=" + employeeFilter.floor_name
    }
    if (employeeFilter.location_name != '') {
      getString += "&location_name=" + employeeFilter.location_name
    }
    axios.get(getString,{headers}).then((response)=>{
      response.data.forEach((data)=>{
        data.out_of_40=data.grade_1st_avg+data.grade_2nd_avg+data.grade_3rd_avg+data.grade_4th_avg
      data.out_of_60=(data.WD_Grade+data.COM_Grade+data.Fine_Marks)*2
      if(data.role_name==='Floor Incharge'){
   
        if(data.date.substring(8,10)>=moment().startOf('week').date()&& data.date.substring(8,10)<=moment().endOf('week').date()){
          
          data.status='Completed'
        }
        else{
          data.status='Pending'
        }
      }else{
        data.status=null
      }
     
    
    })
    setData(response.data)
    })
    from_date = moment(date).startOf('month')
    to_date=moment(date).endOf('month').add(1,'d')
    getString = url + "api/getGrades?from_date=" + from_date.format("YYYY-MM-DD") + "&to_date=" + to_date.format("YYYY-MM-DD") 
      if (employeeFilter.employee_query != '' &&employeeFilter.employee_query!==undefined) {
        getString += "&employee_query=" + employeeFilter.employee_query
      }
      if (employeeFilter.role_name != '') {
        getString += '&role_name=' + employeeFilter.role_name
      }
      if (employeeFilter.floor_name != '') {
        getString += "&floor_name=" + employeeFilter.floor_name
      }
      if (employeeFilter.location_name != '') {
        getString += "&location_name=" + employeeFilter.location_name
      }
      axios.get(getString,{headers}).then((response)=>{
        setTotal(response.data.length)
      })
  
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
  const selectEntries = (data) => {
    setLimit(data)
  }
  const selectPage = (data) => {
    console.log(data)
    setOffset((data - 1) * limit)
  }

  return (
    <React.Fragment>
      <Heading heading={'Grade'} Btn_link={'/add_grade'} Btn={'Grade'} />
      <TileContainer Data={TileData} />
      <DropDownFilter selectByFloor={selectByFloor} selectBylocation={selectBylocation}  title1={'Floor'} title2={'Location'} />
      <Filter data={Data} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <div className={classes.whole_table_c}
      >
        <MainTable data={Data} height={true}  headings={tableHeadings} keys={tableKeys}  wd={'4100px'}  Lnk07={true} link1={'/view_grade'} link2="/edit_grade" />
      </div>
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />
    </React.Fragment>
  )
}
// else if(error!==null &loading){
  <React.Fragment>
    <h1>Loading</h1>
    </React.Fragment>

export default Grade