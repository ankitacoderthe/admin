import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import TileContainer from '../../UI/TileContainer/TileContainer'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Filter from '../../Components/Filter/Filter'

// Data for Table

import MainTable from '../../Components/MainTable/MainTable'
import Cookies from 'universal-cookie'
import axios from 'axios'
import useHttp from '../../Hooks/use-http'
import moment from 'moment'
import Pagination from '../../Components/Pagination/Pagination'

// Here is our data for tile in the page
// const TileData = [
//   {
//     title: 'Total Employee',
//     value: '130',
//     num: 2
//   },
//   {
//     title: 'Trails Employee',
//     value: 9,
//     num: 2
//   },
//   {
//     title: 'Total Depart.',
//     value: 8,
//     num: 3
//   },
//   {
//     title: 'Out From location',
//     value: 23,
//     num: -12
//   }
// ]

// Table Headings, Data and Keys
const tableHeading = [
  { heading: 'Employee' },
  { heading: 'Basic Salary' },
  { heading: 'Financial Year' },
  { heading: 'Amount' },
  { heading: 'Pay Date' },
]
const tableKeys = ['employee_name', 'basic_salary', 'financial_year', 'amount', 'pay_date']

const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const Bonus = () => {
  const [newval, setNewVal] = useState(false)
  const [obj, setObj] = useState({})
  const [data, setData] = useState([])
  // Here is our data for tile in the page
  const [date, setDate] = useState([])
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [employeeFilter, setEmployeeFilter] = useState({
    employee_query: '',
    floor_name: "",
    role_name: "",
    location_name: ""
  })
  const cookies = new Cookies();
  const { sendRequest: fetchBonus } = useHttp()
  const [TileData, setTileData] = useState([])
  const token = cookies.get('admin_token')
  const [total, setTotal] = useState(0)
  useEffect(() => {

    const headers = { "Authorization": "Bearer " + token }
    // OverallData()

    axios.get("http://localhost:9000/api/totalAmountOfBonusGiven?year=2023", { headers }).then((response) => {


      axios.get("http://localhost:9000/api/totalEmployeesGivenBonus?year=2023", { headers }).then((responseOne) => {
        axios.get("http://localhost:9000/api/getTotalEmployees", { headers }).then((responseTwo) => {
          axios.get("http://localhost:9000/api/totalAmountOfBonusGiven?year=2022", { headers }).then((responseThird) => {
            setTileData([
              {
                title: 'Total Bonus Given This year',
                value: response.data[0].total,

              },
              {
                title: 'Total Employees Give Bonus',
                value: responseOne.data[0].count_id,

              },
              {
                title: 'Total Employees Pending',
                value: responseTwo.data[0].count_id - responseOne.data[0].count_id,
              },
              {
                title: 'Total Bonus Given Last year',
                value: responseThird.data[0].total !== null ? responseThird.data[0].total : 0
              }
            ])
          })
        })
      })
    })
    console.log(TileData)
  }, [])
  const changeModalState = ([val, element]) => {
    const headers = { "Authorization": "Bearer " + token }
    axios.get(baseURL + "api/getEmployeeDetails?id=" + element.employee_id, { headers }).then((response) => {
      setObj(response.data.employeesResult[0])
    })
    setNewVal(val)

  }
  useEffect(() => {
//getBonus
if(employeeFilter.location_name!=''){
  let getString = baseURL + "api/getBonus?location_name="+employeeFilter.location_name+"&limit="+limit+"&offset="+offset
  if(employeeFilter.employee_query!=''  &&employeeFilter.employee_query!==undefined){
    getString+="&employee_query="+employeeFilter.employee_query
}
    if(employeeFilter.role_name!=''){
      getString+='&role_name='+employeeFilter.role_name
    }
    if(employeeFilter.floor_name!=''){
      getString+="&floor_name="+employeeFilter.floor_name
    }
   
    if (date?.length>1){
      let from_date=moment(date[0].toDate())
      
      let to_date=moment(date[date.length-1].toDate())
      getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
    }
    else if (date?.length>0){
      let from_date=moment(date[0].toDate())
      
      let to_date=moment(date[date.length-1].toDate()).add(1,'d')
      getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
    }
    const listBonus = (Bonus) => {
      Bonus.bonusResult.forEach((data)=>{
        if(Bonus.baseSalariesData!==undefined){
          Bonus.baseSalariesData.forEach((dataOne)=>{
            console.log(dataOne)
            if(dataOne.employee_id===data.employee_id){
            
              data.basic_salary=dataOne.amount
            }
                    })
                    data.financial_year=data.created_on.split(" ")[0].split("-")[0]
                    data.pay_date=data.created_on.split(" ")[0].split("-").reverse().join("-").substring(0,5)
        }
       
      })
      console.log(Bonus.bonusResult)
      setData(Bonus.bonusResult)
    }
    fetchBonus({ url: getString }, listBonus)
    getString = baseURL + "api/getBonus?location_name="+employeeFilter.location_name
  if(employeeFilter.employee_query!=''  &&employeeFilter.employee_query!==undefined){
    getString+="&employee_query="+employeeFilter.employee_query
}
    if(employeeFilter.role_name!=''){
      getString+='&role_name='+employeeFilter.role_name
    }
    if(employeeFilter.floor_name!=''){
      getString+="&floor_name="+employeeFilter.floor_name
    }
   
    if (date?.length>1){
      let from_date=moment(date[0].toDate())
      
      let to_date=moment(date[date.length-1].toDate())
      getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
    }
    else if (date?.length>0){
      let from_date=moment(date[0].toDate())
      
      let to_date=moment(date[date.length-1].toDate()).add(1,'d')
      getString+="&from_date="+from_date.format("YYYY-MM-DD")+"&to_date="+to_date.format("YYYY-MM-DD")
    }
    const listTotal = (Bonus) => {
      
      setTotal(Bonus.bonusResult.length)
    }
    fetchBonus({ url: getString }, listTotal)
  }



    // axios.get(getString,{headers}).then((response)=>{
    //       setData(response.data)
    //   })
  }, [date, limit, offset, employeeFilter])
  // Table Headings, Data and Keys
  const changeByEmployee = (data) => {
    setEmployeeFilter((prevState) => {
      return { ...prevState, employee_query: data }
    })
  }
  const changeByDesignation = (data) => {

    setEmployeeFilter((prevState) => {
      return { ...prevState, role_name: data }
    })

  }
  // if(!loading){
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


  return (
    <React.Fragment>
      <Heading heading={'Bonus'} Btn_link={'/add_bonus'} Btn={'Bonus'} />
      <TileContainer Data={TileData} />
      <DropDownFilter title1={'Floor'} title2={'Location'} selectByFloor={selectByFloor} selectBylocation={selectBylocation} />
      <Filter data={data} changeDate={changeDate} changeByDesignation={changeByDesignation} changeByEmployee={changeByEmployee} />
      <MainTable func={changeModalState} Lnk={false} link1={'false'} App_Btn={false} data={data} height={true} Btn={false} headings={tableHeading} keys={tableKeys} t3={'Add Bonus'} link2='false' />
      <Pagination selectEntries={selectEntries} selectPage={selectPage} offset={offset} limit={limit} total={total} />

      {/* <AddBonusModal value={newval} setval={setNewVal} Obj={obj}  reloadFunc={OverallData} /> */}
    </React.Fragment>
  )
}

export default Bonus