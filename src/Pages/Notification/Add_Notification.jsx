import React from 'react'
import classes from './Notification.module.css'
import Heading from '../../Components/Heading/Heading'
import LabeledInput from '../../Components/LabeledInput/LabeledInput'
import { useState } from 'react'
import BottomButtonContainer from '../../Components/BottomButtonContainer/BottomButtonContainer'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'
import moment from 'moment'
import { baseURL } from '../../util'
const Add_Notification = () => {
  const [isLoading,setIsloading]=useState(false)
  const navigate = useNavigate();
  const url = baseURL
  const cookies = new Cookies();
  const token = cookies.get('admin_token')
  // States
  const [title,setTitle] = useState('')
  const [detail,setDetail] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    const headers = { "Authorization": "Bearer " + token }
    setIsloading(true)
    axios.post(url+"api/postNotifications",{title:title,detail:detail,date:moment().add(7,'d').format("YYYY-MM-DD"),time:"23:59:59"},{headers:headers}).then((response)=>{
if(response.status===200){
  toast.success('Notification Added!')
    setTimeout(() => {
      navigate(-1)
    }, 1000);
    console.log(
      {
        title,
        detail
      }
    );
}
    })
    // If notification is successful 
    
  } 

  return (
    <React.Fragment>
      <ToastContainer/>
      <Heading heading={'Add Notification'} />
      <form className={classes.form} action="" onSubmit={submitHandler}>
          <LabeledInput title={'Title'} id={'title'} img={false} func2={setTitle} value={title} cls={true}  />
          <div className={classes.input_div}>
            <label htmlFor="textarea">Notification Detail</label>
            <textarea onChange={e=>setDetail(e.target.value)} value={detail} id="textarea"></textarea>
          </div>
          <BottomButtonContainer disabled={isLoading} func={false} cancel={'Back'} f1={true} approve={'Add Notification'} />
      </form>
    </React.Fragment>
  )
}

export default Add_Notification
