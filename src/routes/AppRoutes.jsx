import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import Public from "../pages/Public";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PasswordRecovery from "../pages/PasswordRecovery";
import VerifyRegistration from "../pages/verifyRegistration";
import Help from "../pages/Help";
import Unauthorized from "../pages/Unauthorized";
import PageNotFound from "../pages/PageNotFound";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AdminBoard from "../pages/AdminBoard";
import ModeratorBoard from "../pages/ModeratorBoard";

import Exchange from "../pages/Exchange";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";


const App = () => {
  return (
    // <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Public />} />
        <Route path="/public" element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />  
        <Route path="/verify-registration/:token" element={<VerifyRegistration />} />
        <Route path="/help" element={<Help />} />
        <Route path="/unauthorized" element={<Unauthorized />} /> 
        
        {/* protected routes */}
        <Route path="/home" element={<Home />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/admin-board" element={<AdminBoard />} />
        <Route path="/moderator-board" element={<ModeratorBoard />} /> 

        {/* shop routes */}
        <Route path="/promotions" element={<Exchange />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/payment/cancel" element={<Exchange />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />

        {/* catch all */}
        <Route path="*" element={<PageNotFound />} />   
      </Routes>
    // </BrowserRouter>
  );
};

export default App;