import classes from './Filter.module.css'
import mag from '../../assets/search2.png'
import vec from '../../assets/vector9.png'
import { useState } from 'react'
import MainTable from '../MainTable/MainTable'
import { useEffect } from 'react'
// Importing Datepicker
// import DatePicker from "react-datepicker";
import DatePicker from "react-multi-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import Cookies from 'universal-cookie'
import { url } from '../../util'
const RoleFilter = (props) => {
  const cookies = new Cookies();
  const [View, setView] = useState(false)
//   const[designationOptions,setDesignationOptions]=useState([])
//   const[selectedDesignation,setSelectedDesignation]=useState('')
//   const filterByDesignation=async(e)=>{
//     setSelectedDesignation(e.target.value)
//     props.changeByDesignation(e.target.value)
//     }
//     useEffect(() => {
//       const fetching=async()=>{
//         const token = cookies.get('admin_token')
//         const headers={"Authorization":"Bearer "+token}
//         axios.get(url+"api/getRoles",{headers}).then((response)=>{
//           setDesignationOptions(response.data)
//         })
//       }
//       fetching()
//       if(props.isdate){
//         setStartDate(props.date)
//       }
//   }, [])
 
  let tableData = props.data.length>0&&props.data.map((element) => (
    {
      name: element.name
    }
  ))
 



  const tableHeadings = [
    { heading: 'Role Name' },
  
  ]

  const [state, setstate] = useState('')
  
  
        
  const handleChange = (e) => {
    setView(true)
    const results = tableData.filter(post => {
      if (e.target.value === " ") return tableData
      return post.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setstate({
      query: e.target.value,
      list: results
    })

   
  }


  function CancelView() {
    setTimeout(() => {
      setView(false)
    }, 1000);
  }
function changeByName(key){
  setView(false)
  setstate({
    query:''
  })
  props.changeByName(key)
}
// const emptyInp = (e) => {
//   setView(false)
//   if (e.target.value == '') {
//     props.changeByEmployee('')
//   }
  
// }
const clickToChangeName=()=>{
  setView(false)
 
  props.changeByName(state.query)
}
  return (

    <div className={classes.filter_box}>
      <form  className={classes.input_div}>
        <label htmlFor="role_name"> Role Name</label>
        <input value={state.query} onChange={handleChange}  type="text" id='role_name' placeholder='Role Name..' />

        <img className={classes.img1} src={mag} alt="" onClick={(e)=>clickToChangeName()} />
        <div className={`${classes.search_table} ${View === true ? classes.visible : ''}`}>
          <MainTable view_btn_roles={true} searchFunc={changeByName}  type='button'  Inp={false} Btn={false} headings={tableHeadings} data={state.list === undefined ? tableData : state.list} keys={['name']} />
        </div>
      </form>

      {/* <div className={classes.input_div}>
        <label htmlFor="Designation">Designation</label>
        <select
            value={selectedDesignation}
            onChange={filterByDesignation}
            id="Designation"
            >
              <option defaultValue="All Designation"></option>
            {designationOptions&&designationOptions.map((value) => <option key={value.id} value={value.name} >{value.name}</option>)}
            </select>
        <img src={vec} className={classes.img2} alt="" />
      </div> */}


     

    </div>
  )
}

export default RoleFilter