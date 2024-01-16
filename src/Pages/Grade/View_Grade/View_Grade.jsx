import React, { useEffect, useState, useRef } from 'react'
import ReactToPrint from 'react-to-print';
import Heading from '../../../Components/Heading/Heading'
import DetailsDivContainer from '../../../UI/DetailsDivContainers/DetailsDivContainer'
import Spl_Grade_table from '../../../Components/Spl_Grade_Table/Spl_Grade_table'
import classes from './View_Grade.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import useHttp from '../../../Hooks/use-http'
import GradeMeter from '../../../Components/GradeMeter/GradeMeter'
import GradeMeterContainer from '../../../Components/GradeMeterContainer/GradeMeterContainer'
import { baseURL } from '../../../util';





const View_Grade = () => {
  const componentRef = useRef();
  const url = baseURL
  const { id } = useParams()
  const [employee_data, setEmployeeData] = useState([])
  const { sendRequest: fetchGrade } = useHttp()
  const [systemMarks, setSystemMarks] = useState([])
  const [marksByFI, setMarksByFI] = useState([])
  const [outOf40, setOutof40] = useState(0)
  const [outOf60, setOutof60] = useState(0)
  const [total, setTotal] = useState(0)
  const [gradeEquivalent, setGradeEquivalent] = useState(null)
  useEffect(() => {
    const listGrade = (Grade) => {

      setEmployeeData([
        {
          title: "Name",
          value: Grade[0].employee_name
        },
        {
          title: "Employee ID",
          value: Grade[0].empID

        },
        {
          title: 'SuperVisor Name',
          value: Grade[0].head_employee_name
        }, {
          title: 'Designation',
          value: Grade[0].role_name
        }, , {
          title: 'Department',
          value: Grade[0].department_name
        }, {
          title: 'Floor Name',
          value: Grade[0].floor_name

        }, {
          title: 'Gender',
          value: Grade[0].gender

        }, {
          title: 'location name',
          value: Grade[0].location_name
        }, {
          title: 'location Department',
          value: Grade[0].store_department_name
        }
      ])

      setSystemMarks([
        {
          title: 'WD Grade',
          value: Grade[0].WD_Grade !== null ? Grade[0].WD_Grade : 0
        }, {
          title: 'COM Grade',
          value: Grade[0].COM_Grade !== null ? Grade[0].COM_Grade : 0
        }, {
          title: 'Fine Marks',
          value: Grade[0].Fine_Marks !== null ? Grade[0].Fine_Marks : 0
        }]
      )

      setMarksByFI([
        {
          title: 'Counter Clearance',
          value: Grade[0].grade_1st_avg
        }, {
          title: 'Behaviour With staff',
          value: Grade[0].grade_2nd_avg
        }, {
          title: 'Behaviour With Customer',
          value: Grade[0].grade_3rd_avg
        }, {
          title: 'Presentation',
          value: Grade[0].grade_4th_avg
        }]
      )
      if (Grade[0].Total !== null) {
        setTotal(Grade[0].Total)
      }
      else {

        setTotal(Grade[0].grade_1st_avg + Grade[0].grade_2nd_avg + Grade[0].grade_3rd_avg + Grade[0].grade_4th_avg)
      }
      if (Grade[0].Grade_Equivalent !== null) {
        setGradeEquivalent(Grade[0].Grade_Equivalent)
      }
      else {
        setGradeEquivalent("C")
      }
      setOutof40(Grade[0].grade_1st_avg + Grade[0].grade_2nd_avg + Grade[0].grade_3rd_avg + Grade[0].grade_4th_avg)
      setOutof60((Grade[0].Fine_Marks + Grade[0].COM_Grade + Grade[0].WD_Grade) * 2)
    }
    fetchGrade({ url: url + "api/getGrade?id=" + id }, listGrade)

  }, [])
  const getPageMargins = () => {
    return `@page { margin: 20px 20px 20px 20px !important; }`;
  };

  return (
    <React.Fragment>
      <div ref={componentRef}>
        <Heading heading={'Employee Grade'} />
        <DetailsDivContainer data={employee_data} />

        <GradeMeterContainer systemMarks={outOf60} marksByFI={outOf40} />

        <div className={classes.table_container}>
          <div className={classes.table_container_child}>
            <h3 className={classes.table_heading}>System Marks</h3>
            <Spl_Grade_table marks={systemMarks} />
          </div>
          <div className={classes.table_container_child}>
            <h3 className={classes.table_heading}>FI Marks</h3>
            <Spl_Grade_table marks={marksByFI}>
              <div className={classes.header}>
                <span>Total</span>
                <span>{total}/100</span>
              </div>
              <div className={classes.header}>
                <span>Grade</span>
                <span>{gradeEquivalent}</span>
              </div>
            </Spl_Grade_table>
          </div>
        </div>
      </div>
      <style>{getPageMargins()}</style>
      <ReactToPrint
        trigger={() => <button className={classes.grade_btn}>Download Report</button>}
        content={() => componentRef.current}
        copyStyles={true}
      />

    </React.Fragment>
  )
}

export default View_Grade