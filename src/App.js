import "./app.css";
import React from "react";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import Login from "./components/login/Login";
import Rooms from "./pages/room/rooms/Rooms";
import Logout from "./components/login/Logout";
import NavBar from "./components/navbar/NavBar";
import NotFound from "./pages/notfound/NotFound";
import Customers from "./pages/customers/Customers";
import Employees from "./pages/employees/Employees";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./common/protectedRoute";
import { makeStyles } from "@material-ui/core/styles";
import Products from "./pages/products/products/Products";
import CustomerForm from "./pages/customers/CustomerForm";
import EmployeeForm from "./pages/employees/EmployeeForm";
import SpeedDials from "./components/speeddial/SpeedDials";
import RoomPricing from "./pages/room/pricing/RoomPricing";
import RoomVariants from "./pages/room/variants/RoomVariants";
import Payments from "./pages/functionality/payments/Payments";
import Discounts from "./pages/functionality/discounts/Discounts";
import ProductCategory from "./pages/products/category/ProductCategory";
import ReservationModal from "./components/reservation/ReservationModal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingTop: "130px",
  },
  containerPaddingTop: {
    paddingTop: "160px",
  },
  container_child: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: "280px",
      width: "-webkit-fill-available",
    },
  },
}));

function App() {
  //..
  const classes = useStyles();
  const userIsLoggedIn = useSelector((state) => state.entities.user.isLoggedIn);

  return (
    <>
      <Router>
        <div className={classes.container}>
          <div className={userIsLoggedIn ? classes.container_child : ""}>
            <NavBar />
            <SpeedDials />
            <ReservationModal />
            <Switch>
              <Route path="/a/login" component={Login} />
              <Route path="/a/logout" component={Logout} />
              <ProtectedRoute path="/a/dashboard" component={Dashboard} />
              <ProtectedRoute
                path="/a/user-management/employees/:id"
                component={EmployeeForm}
              />
              <ProtectedRoute
                path="/a/user-management/employees"
                component={Employees}
              />
              <ProtectedRoute
                path="/a/user-management/customers/:id"
                component={CustomerForm}
              />
              <ProtectedRoute
                path="/a/user-management/customers"
                component={Customers}
              />
              <ProtectedRoute
                path="/a/room-management/rooms"
                component={Rooms}
              />
              <ProtectedRoute
                path="/a/room-management/room-variants"
                component={RoomVariants}
              />
              <ProtectedRoute
                path="/a/room-management/room-pricings"
                component={RoomPricing}
              />
              <ProtectedRoute
                path="/a/product-management/category"
                component={ProductCategory}
              />
              <ProtectedRoute
                path="/a/product-management/products"
                component={Products}
              />
              <ProtectedRoute
                path="/a/system-functionality/payments"
                component={Payments}
              />
              <ProtectedRoute
                path="/a/system-functionality/discounts"
                component={Discounts}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/a/dashboard" />
              <Redirect to="/not-found" />
              <ProtectedRoute path="/" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
