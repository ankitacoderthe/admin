import { useNavigate } from 'react-router-dom'
import classes from './BottomButtonContainer.module.css'

const BottomButtonContainer = (props) => {

  const navigate = useNavigate();

  const backHandler = () => {
    return navigate(-1)
  }

  return (
    <div className={classes.btn_container}>

      <button type='button' disabled={props.disabled} className={classes.cancel} onClick={props.func === true ? () => props.cancelRequests() : backHandler}>{props.cancel}</button>
      {props.func2 && <button disabled={props.disabled} className={classes.accept} onClick={props.func && props.func === true ? props.func2 : ''}>{props.approve}</button>}
      {props.f1 && <button disabled={props.disabled} type={props.f1 == true ? 'submit' : 'button'} className={classes.accept}>{props.approve}</button>}
    </div>
  )
}

export default BottomButtonContainer