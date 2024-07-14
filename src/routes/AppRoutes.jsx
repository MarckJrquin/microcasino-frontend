import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import Public from "../pages/Public";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PasswordRecovery from "../pages/PasswordRecovery";
import PasswordReset from "../pages/PasswordReset";
import VerifyRegistration from "../pages/verifyRegistration";
import Help from "../pages/Help";
import Unauthorized from "../pages/Unauthorized";
import PageNotFound from "../pages/PageNotFound";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AdminBoard from "../pages/AdminBoard";
import ModeratorBoard from "../pages/ModeratorBoard";

import Games from "../pages/Games";
import RouletteGames from "../pages/RouletteGames";
import BlackjackGames from "../pages/BlackjackGames";
import SlotsGames from "../pages/SlotsGames";
import BaccaratGames from "../pages/BaccaratGames";
import SlotGame3 from "../components/SlotGame3";
import ComingSoon from "../pages/ComingSoon";

import Exchange from "../pages/Exchange";
import Promotions from "../pages/Promotions";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";


const App = () => {
  return (
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Public />} />
        <Route path="/public" element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />  
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route path="/verify-registration/:token" element={<VerifyRegistration />} />
        <Route path="/help" element={<Help />} />
        <Route path="/unauthorized" element={<Unauthorized />} /> 
        
        {/* protected routes */}
        <Route path="/home" element={<Public />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/admin-board" element={<AdminBoard />} />
        <Route path="/moderator-board" element={<ModeratorBoard />} /> 

        {/* shop routes */}
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />

        {/* Games routes */}
        <Route path="/games" element={<Games />} />
        <Route path="/games/ruleta" element={<RouletteGames />} />
        <Route path="/games/blackjack" element={<BlackjackGames />} />
        <Route path="/games/slots" element={<SlotsGames />} />
        <Route path="/games/baccarat" element={<BaccaratGames />} />
        <Route path="/games/slotgame3" element={<SlotGame3 />} />
        <Route path="/games/coming-soon" element={<ComingSoon />} />

        {/* catch all */}
        <Route path="*" element={<PageNotFound />} />   
      </Routes>
    // </BrowserRouter>
  );
};

export default App;