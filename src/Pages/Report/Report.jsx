import React from 'react'
import Heading from '../../Components/Heading/Heading'
import classes from './Report.module.css'
import DropDownFilter from '../../Components/DropDownFilter/DropDownFilter'
import Areachart2 from './Charts/Areachart2/Areachart2'
import Donutchart from './Charts/Donutchart/Donutchart'
import BarChart from './Charts/BarChart/BarChart'



const Report = () => {
  return (
    <React.Fragment>
      <Heading heading='Report' />
      <div className={classes.container}>
        <div className={classes.container1}>
          <div className={classes.con1_div}>
            <h4>Attendence Overview</h4>
            <DropDownFilter mb={false} />
          </div>
            <div className={classes.barchart_container}>
              <BarChart />
            </div>
        </div>
        <div className={classes.container2}>
          <h4>Reports</h4>
          <div className={classes.report_div}>
            Attendance Report Feb 27 2023
            <span>Download</span>
          </div>
          <div className={classes.report_div}>
            Attendance Report Feb 27 2023
            <span>Download</span>
          </div>
          <div className={classes.report_div}>
            Attendance Report Feb 27 2023
            <span>Download</span>
          </div>
          <div className={classes.report_div}>
            Attendance Report Feb 27 2023
            <span>Download</span>
          </div>
          <div className={classes.report_div}>
            Attendance Report Feb 27 2023
            <span>Download</span>
          </div>
          <div className={classes.report_div}>
            Attendance Report Feb 27 2023
            <span>Download</span>
          </div>
          <div className={classes.report_div}>
            Attendance Report Feb 27 2023
            <span>Download</span>
          </div>
        </div>
        <div className={classes.container3}>
          <div className={classes.circle_div1}>
            % of Attendence
            <select id='gMonth1'>
              <option value=''>--Select Month--</option>
              <option selected value='1'>Janaury</option>
              <option value='2'>February</option>
              <option value='3'>March</option>
              <option value='4'>April</option>
              <option value='5'>May</option>
              <option value='6'>June</option>
              <option value='7'>July</option>
              <option value='8'>August</option>
              <option value='9'>September</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
            </select>
          </div>
          <div className={classes.circle_div2}><Donutchart /></div>
          <div className={classes.circle_div3}>
            <div className={classes.circle_div3_div}>
              <span>88%</span>
              <div className={`${classes.circle_div3_inner_div}`}>
                <div className={`${classes.colored}`}></div> Present
              </div>
            </div>
            <div className={classes.circle_div3_div}>
              <span>12%</span>
              <div className={classes.circle_div3_inner_div}>
                <div></div> Present
              </div>
            </div>
          </div>
        </div>
        <div className={classes.container4}>
          <div className={classes.con4_heading}>
            Overall Performence : <span>Sales</span>
          </div>
          <Areachart2 />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Report
