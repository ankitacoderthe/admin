
import classes from './AllModals.module.css'
import Modal from '../Modal/Modal'
import { useState, useEffect } from 'react'
import Close from '../../assets/close.png'
import InpFile from '../InpFile/InpFile'

import Cookies from 'universal-cookie'
import axios from 'axios'
const AddBonusModal = (props) => {
    const url = "http://localhost:9000/"
    const cookies = new Cookies(); 
    const token = cookies.get('admin_token')
    const [modal, setModal] = useState(false)
    const [bonus, setBonus] = useState(null)
    
    const [document, setDocument] = useState(null)
    const newLabel = (data) =>{
        setFileLabel(data.target.value)
    }
    const newFile = (data) => {
        console.log('data in side modal', data[0])
        setDocument(data)
    }
const [fileLabel,setFileLabel] = useState('')
    const closeHandler = () => {
        setModal(false)
        props.setval(false)
    }

    useEffect(() => {
        setModal(props.value)
        return () => { }
    }, [props.value, props.Obj])
 const approveHandler=(e)=>{
    e.preventDefault();
    const headers = { "Authorization": "Bearer " + token, 'Content-Type': 'multipart/form-data' }
    axios.post(url+"api/addBonus",{
        employee_id:props.Obj.id,
        amount:bonus,
        download:document
    },{headers}).then((response)=>{
if(response){
    setBonus('')
    closeHandler()
    props.reloadFunc()

}
    })
 }


    return (
        <Modal wd={'470px'} isModal={modal} >
            <div className={classes.modal_header}>
                <h3>Add Bonus</h3>
                <div onClick={closeHandler}><img src={Close} alt="" /></div>
            </div>
            <div className={classes.modal_data}>
                <div className={classes.modal_data_div}>Name <span>{props.Obj.name}</span></div>
                {/* <div className={classes.modal_data_div}>Id <span>{props.Obj.id}</span></div>
                <div className={classes.modal_data_div}>Floor <span>{props.Obj.floor}</span></div> */}
                <div className={classes.modal_data_div}>Department<span>{props.Obj.store_department_name}</span></div>
                <div className={classes.modal_data_div}>Designation<span>{props.Obj.role_name}</span></div>
                {/* <div className={classes.modal_data_div}>Designation<span><select name="type" id="type" value={type} onChange={(e)=>setType(e.target.value)}>
                    <Option selected={type==='Percentage'} value="Percentage">Percentage</Option>
                    <Option selected={type==='Flat'} value="Flat">Flat</Option>
                    </select></span></div> */}
                <div className={classes.modal_data_div}>Bonus<span><input type="text" value={bonus} onChange={(e)=>setBonus(e.target.value)} /></span></div>
                <div className={classes.modal_data_div}>Attach File<span><InpFile label={fileLabel} labelFunc={setFileLabel} fileHandler={newFile} /></span></div>
            </div>
            <div className={classes.modal_btn_container}>
                <button className={classes.modal_btn1} onClick={closeHandler}>Cancel</button>
                <button className={classes.modal_btn2} onClick={approveHandler}>Approve</button>
            </div>
        </Modal>
    )
}

export default AddBonusModal