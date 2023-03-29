import React from "react";

import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import App from "../home/App";
import Appointment from "../appointment";
import Outlet from "../outlet";
import Login from "../auth/login";
import Signup from "../auth/signup";

import Parents from "../registration/parents";
import Babysitter from "../registration/babysitter";

import Creche from "../registration/creche";

import AdminDashboard from "../dashboard/admin";
import ParentDashboard from "../dashboard/parent";
import BabysitterDashboard from "../dashboard/babysitter";
import CrecheDashboard from "../dashboard/creche.jsx";
import Error from "../Utils/error";
import Explore from "../explore";
import Payments from "../payments/payments";
import Bookings from "../bookings";
import About from "../about";
import WhyUs from "../whyus";
import Contact from "../contact";

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Outlet />}>
          <Route index element={<App />} />
          <Route path="appointments" element={<Appointment />} />

          <Route path="login/creche" element={<Login type="creche" />} />
          <Route
            path="login/babysitter"
            element={<Login type="babysitter" />}
          />
          <Route path="login/parent" element={<Login type="parent" />} />
          <Route path="login/admin" element={<Login type="admin" />} />

          <Route path="explore" element={<Explore />} />
          <Route path="signup" element={<Signup />} />

          <Route path="reg/parent" element={<Parents />} />
          <Route path="reg/babysitter" element={<Babysitter />} />
          <Route path="reg/creche" element={<Creche />} />

          <Route path="dashboard/admin" element={<AdminDashboard />} />
          <Route path="dashboard/parent" element={<ParentDashboard />} />
          <Route
            path="dashboard/babysitter"
            element={<BabysitterDashboard />}
          />
          <Route path="dashboard/creche" element={<CrecheDashboard />} />

          <Route path="about" element={<About/>} />
          <Route path="why-us" element={<WhyUs/>} />
          <Route path="contact" element={<Contact/>} />

          <Route path="checkout" element={<Payments />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="*" element={<Error status="404" />} />
        </Route>
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
