import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { ROLE } from "./utils/constants";
// Redux
import { useDispatch, useSelector } from "react-redux";

// Pages

import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VerifyEmail from "./pages/VerifyEmail";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard"

// components
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import OpenRoute from "./components/core/Auth/OpenRoute"
import MyProfile from './components/core/Dashboard/MyProfile'
import Setting  from "./components/core/Dashboard/Settings/index"
import Cart from "./components/core/Dashboard/Cart/index"
import AddProduct from "./components/core/Dashboard/AddProduct/index"
import AdminOrder from "./components/core/Dashboard/Orders/Admin/index";
import CustomerOrders from "./components/core/Dashboard/Orders/Customer/index";
import SingleOrder from "./components/core/Dashboard/Orders/Customer/SingleOrder";
import SingleOrderAdmin from "./components/core/Dashboard/Orders/Admin/SingleOrderAdmin"

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Setting />} />

          {/*Route only for customer */}
          {
            user?.role === ROLE.CUSTOMER && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/orders" element={<CustomerOrders />} />
                <Route path="dashboard/orders/:id" element={<SingleOrder />} />
              </>
            )
          }
          {user?.role === ROLE.ADMIN && (
            <>
              <Route path="dashboard/add-products" element={<AddProduct />} />
              <Route path="dashboard/admin/orders" element={<AdminOrder />} />
              <Route path="/dashboard/orders/admin/:id" element={<SingleOrderAdmin />} />
            </>
          )}
          
        </Route>
      </Routes>
    </div>
  );
};

export default App;
