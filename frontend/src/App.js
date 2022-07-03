import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Index from './components/index';
import Feedback from './components/user.feedback';
import YourFeedback from './components/user.feedback.your';
import EditFeedback from './components/user.feedback.edit';
import DashboardFeedback from './components/Admin/feedback/feedback.dashboard';



import UserLogin from './components/user.login';
import UserRegistration from './components/user.registration';
import UserProfile from './components/user.profile';
import UserProfileEdit from './components/user.profile.edit';

import About from './components/user.About';
import Admin from './components/Admin/admin';
import AdminLogin from './components/Admin/admin.login';
import AdminReg from './components/Admin/admin.reg';


import EmployeeProfile from './components/Admin/employees/emplooyee.profile';
import EmployeeDashboard from './components/Admin/employees/EmployeeDashboard';
import EmployeeView from './components/Admin/employees/EmployeeView';
import EmployeeEdit from './components/Admin/employees/employee.profile.edit';
import EmployeeAddStepone from './components/Admin/employees/employee.admin.add.stepone';
import EmployeeAddStepTwo from './components/Admin/employees/employee.admin.add.stepsecond';

import VehicleDashboard from './components/Admin/vehicle/vehicle.dashboard';
import Vehiclecategory from './components/Admin/vehicle/vehicle.category';

import VehicleAdd from './components/Admin/vehicle/vehicle.add';
import VehicleEdit from './components/Admin/vehicle/vehicle.edit';
import VehicleRequest from './components/Admin/vehicleimport/vehicle.request';
import UserDashboard from './components/Admin/user/UserDashboard';


import ImportDashboard from './components/Admin/vehicleimport/import.dashboard';
import ImportEdit from './components/Admin/vehicleimport/import.vehicle.edit';
import ImportAdd from './components/Admin/vehicleimport/import.vehicle.Add';

import MaintanceDashboard from './components/Admin/maintance/maintance.dashboad';
import ServiceCenter from './components/Admin/maintance/maintance.add.service.center';
import ServiceCenterEdit from './components/Admin/maintance/maintance.edit.service.center';
import BookingDashboard from './components/Admin/maintance/bookingDashboard';
import BookingReport from './components/Admin/maintance/bookingReport'; 
import Feedbackreport from './components/Admin/feedback/feedback.report';




import FeedbackView from './components/Admin/feedback/feedback.view';

import MarketingDashboard from './components/Admin/marketing/MarketingDashboard';
import MarketingAdd from './components/Admin/marketing/Marketing.Add';
import MarketingEdit from './components/Admin/marketing/Marketing.Edit';
import CustomerAdDashboard from './components/Admin/marketing/customer.ad.Dashboard';

import userAdminDashboard from './components/userAdmin/userAdminDashboard';
import serviceCenters from './components/userAdmin/serviceCenters';
import serviceBooking from './components/userAdmin/serviceBooking';
import serviceBookingEdit from './components/userAdmin/serviceBookingEdit';
import Advertisment from './components/userAdmin/advertisment';
import AdvertismentEdit from './components/userAdmin/advertismentEdit';
import UserViewAdvertisement from './components/userAdmin/userViewAdvertisement';
import UserViewOneAdvertisement from './components/userAdmin/userViewOneAdvetisment';
import importVehicleUser from './components/userAdmin/importVehicleUser';
import ImportVehicleOne from './components/userAdmin/import.vehicle.one';

import Payment from './components/userAdmin/userPayment';
import PaymentDashboard from './components/Admin/payment/paymentDashboard';
import PaymentView from './components/Admin/payment/paymentView';



import { BrowserRouter as Router,Route} from 'react-router-dom'


function App() {
  return (
    <Router>
         <div>
                <Route exact path="/" >
                    <Index/>
                </Route>
                  <Route path="/Feedback" exact component={Feedback}/>
                  
                  <Route path="/YourFeedback" exact component={YourFeedback}/>
                  <Route path="/EditFeedback" exact component={EditFeedback}/>
                  <Route path="/UserLogin" exact component={UserLogin}/>
                  <Route path="/UserRegistration" exact component={UserRegistration}/>
                  
                  <Route path="/About" exact component={About}/>
                  <Route path="/Admin" exact component={Admin}/>
                  <Route path="/AdminLogin" exact component={AdminLogin}/>
                  <Route path="/AdminReg" exact component={AdminReg}/>
                  
                  <Route path="/EmployeeProfile" exact component={EmployeeProfile}/>
                  <Route path="/EmployeeDashboard" exact component={EmployeeDashboard}/>
                  <Route path="/EmployeeView" exact component={EmployeeView}/>
                  <Route path="/EmployeeEdit" exact component={EmployeeEdit}/>
                  <Route path="/EmployeeAddStepone" exact component={EmployeeAddStepone}/>
                  <Route path="/EmployeeAddStepTwo" exact component={EmployeeAddStepTwo}/>

                  <Route path="/VehicleDashboard" exact component={VehicleDashboard}/>
                  <Route path="/Vehiclecategory" exact component={Vehiclecategory}/>
                  
                  <Route path="/VehicleAdd" exact component={VehicleAdd}/>
                  <Route path="/VehicleEdit" exact component={VehicleEdit}/>
                  <Route path="/ImportDashboard" exact component={ImportDashboard}/>
                  <Route path="/ImportVehicleEdit" exact component={ImportEdit}/>
                  <Route path="/ImportAdd" exact component={ImportAdd}/>
                  <Route path="/MaintanceDashboard" exact component={MaintanceDashboard}/>
                  <Route path="/ServiceCenter" exact component={ServiceCenter}/>
                  <Route path="/ServiceCenterEdit" exact component={ServiceCenterEdit}/>
                  <Route path="/DashboardFeedback" exact component={DashboardFeedback}/>
                  

                  <Route path="/FeedbackView" exact component={FeedbackView}/>
                  <Route path="/MarketingDashboard" exact component={MarketingDashboard}/>
                  <Route path="/MarketingAdd" exact component={MarketingAdd}/>
                  <Route path="/MarketingEdit" exact component={MarketingEdit}/>
                  <Route path="/userAdminDashboard" exact component={userAdminDashboard}/>
                  <Route path="/serviceCenters" exact component={serviceCenters}/>
                  <Route path="/serviceBooking" exact component={serviceBooking}/>
                  <Route path="/serviceBookingEdit" exact component={serviceBookingEdit}/>
                  <Route path="/Advertisment" exact component={Advertisment}/>
                  <Route path="/AdvertismentEdit" exact component={AdvertismentEdit}/>
                  <Route path="/UserViewAdvertisement" exact component={UserViewAdvertisement}/>
                  <Route path="/UserViewOneAdvertisement" exact component={UserViewOneAdvertisement}/>
                  <Route path="/Payment" exact component={Payment}/>
                  <Route path="/BookingDashboard" exact component={BookingDashboard}/>
                  <Route path="/BookingReport" exact component={BookingReport}/>
                  
                  <Route path="/CustomerAdDashboard" exact component={CustomerAdDashboard}/>
                  <Route path="/VehicleRequest" exact component={VehicleRequest}/>
                  <Route path="/importVehicleUser" exact component={importVehicleUser}/>
                  <Route path="/ImportVehicleOne" exact component={ImportVehicleOne}/>
                  <Route path="/PaymentDashboard" exact component={PaymentDashboard}/>
                  <Route path="/PaymentView" exact component={PaymentView}/>
                  <Route path="/Feedbackreport" exact component={Feedbackreport}/>
                  <Route path="/UserProfile" exact component={UserProfile}/>
                  <Route path="/UserProfileEdit" exact component={UserProfileEdit}/>
                  <Route path="/UserDashboard" exact component={UserDashboard}/>
         </div>
    </Router>
  );
}

export default App;
