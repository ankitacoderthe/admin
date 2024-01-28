import classes from './LabeledInput.module.css'
import vec from '../../assets/vector9.png'
import { useState } from 'react';
import { toast } from 'react-toastify';

const LabeledInput = (props) => {
  const [time, setTime] = useState(null)
  const [value, setValue] = useState('')

  const lenObj = {
    pan: 10,
    mobile: 10,
    aadhar: 12
  }

  const valueHandler = (e) => {
    e.preventDefault()

    // if (props.splKey) {
    //   if (e.target.value.toString().length === lenObj[props.splKey]) {
    //     setValue(e.target.value)
    //     props.func2(e.target.value)
    //   }
    //   else{
    //     toast.error(`Length of ${props.splKey}  must be equal to ${lenobj[]}`)
    //   }
    // } else {
      setValue(e.target.value)
      props.func2(e.target.value)
    // }
    // props.ParentFunction()
  }



  const inputType = props.type ? props.type : 'text';

  const getValue = () => {
    if (props.type == 'date') {
      return props.value
    }
    else if (props.type == 'time') {
      return time
    }
    else {
      return null
    }
  }
  function changetime(e) {
    setTime(e.target.value)
    props.timeInput()
  }

  // const returnValue = 

  return (

    <div className={props.cls !== 'invisible' ? `${classes.input_div} ${classes.wd50}` : classes.invisible} style={props.mr ? { marginRight: '0' } : {}}>
      <label htmlFor={props.id}>{props.title}</label>
      <input size={props.size} type={inputType} required={props?.required} placeholder={props.ph} id={props.id} step={1} value={props.value ? props.value : value} disabled={props?.disabled} onChange={valueHandler} />
      {props.img === false ? '' :
        <img src={vec} className={classes.img2} alt="" />
      }
    </div>



  )
}

export default LabeledInput