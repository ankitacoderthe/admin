import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {react} from 'react'
import Cookies from 'universal-cookie'
import classes from './PendingIcon.module.css'
import { url } from '../../util'
const PendingIcon=(props)=>{
    const cookies =new Cookies()
const token=cookies.get("admin_token")
const [pending,setPending]=useState(0)
const headers = { "Authorization": "Bearer " + token }
    useEffect(()=>{
    axios.get(url+"api/getPendingInModules?table_name="+props.table_name,{headers}).then((response)=>{
        if(props.table_name!=='grades'){
            setPending(response.data[0].count_id)
        }
        else{
            setPending(response.data.count_id)
        }
    })
    },[])
    return(
        <div className={classes.pending}>
            {pending}
        </div>
    )
}
export default PendingIcon
