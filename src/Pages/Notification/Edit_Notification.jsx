import React from 'react'
import classes from './Notification.module.css'
import Heading from '../../Components/Heading/Heading'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'
import { useState } from 'react'
import BottomButtonContainer from '../../Components/BottomButtonContainer/BottomButtonContainer'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate,useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { useEffect } from 'react'
import { baseURL } from '../../util'
const Edit_Notification = () => {
  const url = baseURL
  const cookies = new Cookies();
  const token = cookies.get('admin_token')
  const navigate = useNavigate();
  const[notification,setNotification]=useState(null)
const {id}=useParams()
useEffect(()=>{
  axios.get(url + "api/getNotifications?id="+id, { headers }).then((response) => {
    
    setTitle(response.data[0].name)
    setDetail(response.data[0].text)
  })
},[])
  // States
  const [title,setTitle] = useState('')
  const [detail,setDetail] = useState('')
  const headers = { "Authorization": "Bearer " + token }
  const submitHandler = (e) => {
    e.preventDefault();
    
    // If notification is successful 
   
  } 

  const deleteNotification = (e) => {
    e.preventDefault();
axios.delete(url+"api/deleteNotification/"+id,{headers:headers}).then((response)=>{
  if(response.status===200){
    toast.error('Deleted!')
    setTimeout(() => {
      navigate(-1)
    }, 5000);
  }
})
  }
  const updateNotification=(e)=>{
    e.preventDefault();
    axios.patch(url+"api/editNotification/"+id,{title:title,detail:detail},{headers:headers}).then((response)=>{
      if(response.status===200){ 
        toast.success('Notification Edited!')
      setTimeout(() => {
        navigate(-1)
      }, 5000);
      console.log(
        {
          title,
          detail
        }
      );
      }
    })
  }
  return (
    <React.Fragment>
      <ToastContainer/>
      <Heading heading={'Edit Notification'} />
      
      <button className={classes.delBtn} onClick={deleteNotification}>Delete Notification</button>

      <form className={classes.form} action="" onSubmit={updateNotification}>
          <LabeledInput title={'Title'} id={'title'} img={false} func2={setTitle} value={title} cls={true}  />
          <div className={classes.input_div}>
            <label htmlFor="textarea">Notification Detail</label>
            <textarea onChange={e=>setDetail(e.target.value)} value={detail} id="textarea"></textarea>
          </div>
          <BottomButtonContainer   func={updateNotification} cancel={'Back'} f1={true} approve={'Update Notification'} />
      </form>
    </React.Fragment>
  )
}

export default Edit_Notification
