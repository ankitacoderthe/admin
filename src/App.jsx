import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import AddEmployee from './Pages/AddEmployee/AddEmployee';
import Advance from './Pages/Advance/Advance';
import AdvanceApprovals from './Pages/Advance/AdvanceApprovals/AdvanceApprovals';
import AttendenceApproval from './Pages/AttendenceApprovals/AttendenceApproval/AttendenceApproval';
import AttendenceApprovals from './Pages/AttendenceApprovals/AttendenceApprovals';
import AttendenceHistory from './Pages/AttendenceApprovals/AttendenceHistory/AttendenceHistory';
import AttendenceCorrection from './Pages/AttendenceCorrection/AttendenceCorrection';
import Bonus from './Pages/Bonus/Bonus';
import EmployeeProfile from './Pages/EmployeeProfile/EmployeeProfile';
import EmployeeTransfer from './Pages/EmployeeTransfer/EmployeeTransfer';
import AddExpense from './Pages/ExpenseApprovals/AddExpense/AddExpense';
import ExpenseApprovals from './Pages/ExpenseApprovals/ExpenseApprovals';
import ExpenseDetails from './Pages/ExpenseApprovals/ExpenseDetails/ExpenseDetails';
import EmployeeDetails from './Pages/ExployeeDetails/EmployeeDetails';
import FineDetails from './Pages/ExtraPages/FineDetails/FineDetails';
import TotalCommission from './Pages/ExtraPages/TotalCommission/TotalCommission';
import FineApprovals from './Pages/FineManagement/FineApprovals/FineApprovals';
import FineManagement from './Pages/FineManagement/FineManagement';
import AddInterview from './Pages/Interviews/AddInterview/AddInterview';
import Interviews from './Pages/Interviews/Interviews';
import LeaveApprovals from './Pages/LeaveManagement/LeaveApprovals/LeaveApprovals';
import LeaveManagement from './Pages/LeaveManagement/LeaveManagement';
import LoanApprovals from './Pages/LoanEmi/LoanApprovals/LoanApprovals';
import LoanEmi from './Pages/LoanEmi/LoanEmi';
import OverallSalaryDetails from './Pages/SalaryDetails/OverallSalaryDetails/OverallSalaryDetails';
import SalaryCertificate from './Pages/SalaryDetails/SalaryCertificate/SalaryCertificate';
import SalaryDetails from './Pages/SalaryDetails/SalaryDetails';
import SalarySlip from './Pages/SalaryDetails/SalarySlip/SalarySlip';
import SalarySummary from './Pages/SalarySummary/SalarySummary';
import SalarySummaryDetails from './Pages/SalarySummary/SalarySummaryDetails/SalarySummaryDetails';
import TimingApprovals from './Pages/TimingApprovals/TimingApprovals';
import TimingApprove from './Pages/TimingApprovals/TimingApprove/TimingApprove';
import Layout from './UI/Layout/Layout';
import ExpenseApproval from './Pages/ExpenseApprovals/ExpenseApproval/ExpenseApproval';
import Grade from './Pages/Grade/Grade';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import AllAttendence from "./Pages/AllAttendence/AllAttendence";
import AddLoan from './Pages/LoanEmi/AddLoan/AddLoan';
import AddFine from './Pages/FineManagement/AddFine/AddFine'
// We have to diffrentiate between Login page and other Pages, so we are using useLocation
import AddAdvance from './Pages/Advance/AddAdvance/AddAdvance'
import AddLeave from './Pages/LeaveManagement/AddLeave/AddLeave';
import Emp_Transfer from './Pages/EmployeeTransfer/Emp_Transfer/Emp_Transfer';
import AddTransfer from './Pages/EmployeeTransfer/AddTransfer/AddTransfer';
import View_Grade from './Pages/Grade/View_Grade/View_Grade';
import AddBonus from './Pages/Bonus/AddBonus/AddBonus';
import Add_Grade from './Pages/Grade/Add_Grade/Add_Grade';
import Document from "./Pages/SalarySummary/SalarySummaryDetails/document"
import LeaveDetails from "./Pages/LeaveManagement/LeaveApprovals/LeaveDetails"
import LoanDetails from "./Pages/LoanEmi/LoanApprovals/LoanDetails"
import AdvanceDetails from "./Pages/Advance/AdvanceApprovals/AdvanceDetails"
import FineDetail from './Pages/FineManagement/FineApprovals/FineDetails';
import LoanEMIDetails from './Pages/LoanEmi/LoanApprovals/LoanEMIDetails';
import EMIAll from "./Pages/LoanEmi/LoanApprovals/EMIAll"
import EmployeeTransferDetails from './Pages/EmployeeTransfer/EmployeeTransferDetails';
import Add_Notification from './Pages/Notification/Add_Notification';
import Notification from './Pages/Notification/Notification';
import Edit_Notification from './Pages/Notification/Edit_Notification';
import SalaryCerti from './Pages/SalaryDocs/SalaryCertificate/SalaryCerti';
import NewSalarySlip from './Pages/SalaryDocs/SalarySlip/NewSalarySlip';
import EditGrade from './Pages/Grade/Edit_Grade/Edit_Grade';
import AllPresent from './Pages/AllAttendence/AllPresent';
import AllAbsent from './Pages/AllAttendence/AllAbsent';
import AllOnLeave from './Pages/AllAttendence/AllOnLeave';
import AllOut from './Pages/AllAttendence/AllOut';
import PendingApprovals from './Pages/ExpenseApprovals/PendingApprovals';
import ApprovedExpenses from './Pages/ExpenseApprovals/ApprovedExpenses';
import TotalExpense from './Pages/ExpenseApprovals/TotalExpense';
import PermanentEmployee from './Pages/ExployeeDetails/PermanentEmployee';
import TrialEmployee from './Pages/ExployeeDetails/TrialEmployee';
import ApprovedLeaves from './Pages/LeaveManagement/ApprovedLeaves';
import PendingLeaves from './Pages/LeaveManagement/PendingLeaves';
import TotalLeaves from './Pages/LeaveManagement/TotalLeaves';
import TotalLoans from './Pages/LoanEmi/TotalLoans';
import LoanApproved from './Pages/LoanEmi/LoanApproved';
import LoanPending from './Pages/LoanEmi/LoanPending';
import TotalAdvanceToday from './Pages/Advance/TotalAdvanceToday';
import TotalApprovedAdvance from './Pages/Advance/TotalApprovedAdvance';
import TotalPendingAdvance from './Pages/Advance/TotalPendingAdvance';
import TotalFinesApproved from './Pages/FineManagement/TotalFinesApproved';
import TotalFinesToday from './Pages/FineManagement/TotalFinesToday';
import PendingSalary from './Pages/SalaryDetails/pendingSalary';
import PendingSalaryPF from './Pages/SalaryDetails/PendingSalaryPF';
import PendingSalaryCash from './Pages/SalaryDetails/PendingSalaryCash';
import TodayInterviews from './Pages/Interviews/TodayInterviews';
import TotalTrials from './Pages/Interviews/TotalTrials';
import TotalRejected from './Pages/Interviews/TotalRejected';
import TotalPermanent from './Pages/Interviews/TotalPermanent';
import AddEmployeeAfterInterview from "./Pages/AddEmployeeAfterInterview/AddEmployee.jsx"
import UpdateInterview from './Pages/Interviews/UpdateInteview';
import UploadAttendance from './Pages/UploadAttendance/UploadAttendance.jsx';
window.React = React
const App = () => {

  const urlPath = useLocation()
  const logPath = urlPath.pathname.includes('/admin_login');

  return (

    <React.Fragment>
      {logPath === true ?
        <Routes>
          <Route exact path='/admin_login' element={<AdminLogin />} />
        </Routes >
        :
        <Layout>
          <main className='main_container'>
            <Routes>

              <Route exact path="/" element={<AttendenceApprovals />} />
              <Route exact path='/all_attendence' element={<AllAttendence />} />
              <Route exact path='/attendence_history/:datetime/:id' element={<AttendenceHistory />} />
              <Route exact path="/all_attendence/present/" element={<AllPresent/>}></Route>
              <Route exact path="/all_attendence/absent/" element={<AllAbsent/>}></Route>
              <Route exact path="/all_attendence/on-leave/" element={<AllOnLeave/>}></Route>
              <Route exact path="/all_attendence/total-outs/" element={<AllOut/>}></Route>

              <Route exact path='/attendence_approval/:attendance_id/:employee_id' element={<AttendenceApproval />} />
              <Route exact path='/add_leave' element={<AddLeave />} />
              <Route exact path='/add_fine' element={<AddFine />} />

              <Route exact path="/attendance_corrections" element={<AttendenceCorrection />} />
             
              <Route exact path="/advance" element={<Advance />} />
              <Route exact path="/advance/total-advance" element={<TotalAdvanceToday />} />
              <Route exact path="/advance/total-granted" element={<TotalApprovedAdvance />} />
              <Route exact path="/advance/total-pending" element={<TotalPendingAdvance />} />
              <Route exact path="/advance_approvals/:id/:employee_id" element={<AdvanceApprovals />} />
              <Route exact path="/advance_details/:id/:employee_id" element={<AdvanceDetails />} />
              <Route exact path="/add_advance" element={<AddAdvance />} />
              <Route exact path="/edit_grade/:id" element={<EditGrade />} />

              <Route exact path="/expense_approvals" element={<ExpenseApprovals />} />
              <Route exact path="/expense_approvals/pending_approvals" element={<PendingApprovals />} />
              <Route exact path="/expense_approvals/expense_approved" element={<ApprovedExpenses />} />
              <Route exact path="/expense_approvals/total_expense" element={<TotalExpense />} />
              <Route exact path="/expense_approval/:id/:employee_id" element={<ExpenseApproval />} />
              <Route exact path="/expense_details/:id/:employee_id" element={<ExpenseDetails />} />
              <Route exact path="/add_expense" element={<AddExpense />} />


              <Route exact path="/employee_details" element={<EmployeeDetails />} />
              <Route exact path="//employee_details/permanent_employee" element={<PermanentEmployee />} />
              <Route exact path="/employee_details/trial_employee" element={<TrialEmployee />} />
              <Route exact path="/add_employee" element={<AddEmployee />} />
              <Route exact path="/add_employee/:id" element={<AddEmployeeAfterInterview />} />
              <Route exact path="/edit_employee/:id" element={<AddEmployee />} />
              <Route exact path="/employee_profile/:id" element={<EmployeeProfile />} />
              <Route exact path="/update-interview/:id" element={<UpdateInterview />} />


              <Route exact path="/fine_management" element={<FineManagement />} />
              <Route exact path="/fine_management/total-fines" element={<TotalFinesToday />} />
              <Route exact path="/fine_management/fines-approved" element={<TotalFinesApproved />} />
              <Route exact path="/fine_approvals/:id/:employee_id" element={<FineApprovals />} />
              <Route exact path="/fine_details/:id/:employee_id" element={<FineDetail />} />

              <Route exact path="/leave_management" element={<LeaveManagement />} />
              <Route exact path="/leave_management/leave-approved" element={<ApprovedLeaves />} />
              <Route exact path="/leave_management/leave-pending" element={<PendingLeaves />} />
              <Route exact path="/leave_management/total-leaves" element={<TotalLeaves />} />

              <Route exact path="/leave_approvals/:id/:employee_id" element={<LeaveApprovals />} />
              <Route exact path="/emi_details_all_loans/:employee_id" element={<EMIAll />} />

              <Route exact path="/loan_emi" element={<LoanEmi />} />
              <Route exact path="/loan_emi/total-loans" element={<TotalLoans />} />
              <Route exact path="/add_loan" element={<AddLoan />} />
              <Route exact path="//loan_emi/total-granted" element={<LoanApproved />} />
              <Route exact path="/loan_emi/total-pending" element={<LoanPending />} />
              <Route exact path="/loan_approvals/:id/:employee_id" element={<LoanApprovals />} />
              <Route exact path="/loan_details/:id/:employee_id" element={<LoanDetails />} />
              <Route exact path="/loan_emi_details/:id" element={<LoanEMIDetails />} />
              <Route exact path="/salary_details" element={<SalaryDetails />} />
              <Route exact path="/salary_details/pending-salary" element={<PendingSalary />} />
              <Route exact path="/salary_details/pending-pf-salary" element={<PendingSalaryPF />} />
              <Route exact path="/salary_details/pending-cash-salary" element={<PendingSalaryCash />} />
              {/* <Route exact path="/salary_slip" element={<SalarySlip />} /> */}
              {/* <Route exact path="/salary_certificate" element={<SalaryCertificate />} /> */}
              <Route exact path="/overall_salary_details/:id" element={<OverallSalaryDetails />} />
              <Route exact path="/leave_details/:id/:employee_id" element={<LeaveDetails />} />

              <Route exact path="/employee_transfer" element={<EmployeeTransfer />} />
              <Route exact path="/emp_transfer/:id/:employee_id" element={<Emp_Transfer />} />
              <Route exact path="/emp_transfer_details/:id/:employee_id" element={<EmployeeTransferDetails />} />

              <Route exact path="/interviews" element={<Interviews />} />
              <Route exact path="/interviews/today-interviews" element={<TodayInterviews />} />
              <Route exact path="/interviews/total-trials" element={<TotalTrials />} />
              <Route exact path="/interviews/total-rejected" element={<TotalRejected />} />
              <Route exact path="/interviews/total-permanent" element={<TotalPermanent />} />
              <Route exact path="/commission_details/:empID/:month/:year/:id" element={<TotalCommission />} />

              <Route exact path="/add_interview" element={<AddInterview />} />
              <Route exact path="/add_transfer" element={<AddTransfer />} />


              <Route exact path="/timing_approvals" element={<TimingApprovals />} />
              <Route exact path="/timing_approve/:attendance_id/:employee_id" element={<TimingApprove />} />
              <Route exact path="/upload-attendance" element={<UploadAttendance />} />



              {/* <Route exact path="/roles/" element={<Roles />} />
              <Route exact path="/add_roles" element={<AddRoles />} />
              <Route exact path="/edit_roles/:id" element={<EditRoles />} />
              <Route exact path="/role_details/:id" element={<RoleDetails />} /> */}


              <Route exact path="/salary_summary" element={<SalarySummary />} />
              <Route exact path="/salary_summary_details/:id" element={<SalarySummaryDetails />} />
              


              {/* <Route exact path="/report" element={<Report />} /> */}

              <Route exact path="/bonus" element={<Bonus />} />
              <Route exact path="/add_bonus" element={<AddBonus />} />

              {/* <Route exact path='/hierarchy' element={<HierarchyPage />} /> */}

              <Route exact path='/grade' element={<Grade />} />
              <Route exact path='/view_grade/:id' element={<View_Grade />} />
              <Route exact path='/add_grade' element={<Add_Grade />} />
              <Route exact path='/download/:id' element={<Document />} />

              {/* Extra Pages */}
              <Route exact path="/fine_details/:id/:month/:year"  element={<FineDetails />} />


              <Route exact path="/notification" element={<Notification />} />
              <Route exact path="/add_notification" element={<Add_Notification />} />
              <Route exact path="/edit_notification/:id" element={<Edit_Notification />} />


              {/* 2 new Salary Routed */}
              <Route exact path='/salary_certificate/:id' element={<SalaryCertificate />} />
              <Route exact path='/salary_certi/:month/:year/:id/:purpose' element={<SalaryCerti />} />
              <Route exact path='/salary_slip/:month/:id' element={<NewSalarySlip />} />
            </Routes>
          </main>
        </Layout>
      }
    </React.Fragment>
  )
}

export default App