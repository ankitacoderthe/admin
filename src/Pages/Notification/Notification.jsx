import React, { useEffect, useState } from 'react'
import classes from './Notification.module.css'
import Heading from '../../Components/Heading/Heading'
import { ToastContainer, toast } from 'react-toastify'

// Data for Table
import MainTable from '../../Components/MainTable/MainTable'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'
import Pagination from '../../Components/Pagination/Pagination'
import { url } from '../../util'
const Notification = () => {

  
  const cookies = new Cookies();
  const token = cookies.get('admin_token')
  const [notifications, setNotifications] = useState([])
  useEffect(() => {

    const headers = { "Authorization": "Bearer " + token }
    axios.get(url + "api/getNotifications", { headers }).then((response) => {
      setNotifications(response.data)
    })
  }, [])
  // Table Headings, Data and Keys
  const tableHeadings = [
    { heading: 'Notification' },
    { heading: 'Detail' }
  ]

  const tableKeys = [
    'name', 'text'
  ]

  return (
    <React.Fragment>
      <ToastContainer/>
      <Heading heading={'Notifications'} Btn={'Notification'} Btn_link={'/add_notification'}  />
      <MainTable height={true} data={notifications} Lnk10={true} headings={tableHeadings} keys={tableKeys} link2={'/edit_notification'}  t2='Edit Notifiication' link1={'/role_details'} link4={false} />
      <Pagination selectEntries={() => { }} selectPage={() => { }} offset={5} limit={0} total={0} />
    </React.Fragment>
  )
}

export default Notification
