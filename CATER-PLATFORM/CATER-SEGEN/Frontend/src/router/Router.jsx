import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Packages from '../pages/Packages/Packages'
import BoxGenie from "../pages/menuPage/BoxGenie";
import Signup from "../components/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CartPage from "../pages/menuPage/CartPage";
import Login from "../components/Login";
import Order from "../pages/dashboard/user/Order";
import UserProfile from "../pages/dashboard/user/UserProfile";
import Buffet from '../pages/Buffet/Buffet';
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/menuPage/Payment";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import BuffetPage from "../pages/dashboard/admin/BuffetPage";
import Contact from '../pages/Contact/Contact'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/boxgenie",
          element: <BoxGenie/>
        },
        {
          path: "/order",
          element:<PrivateRoute><Order/></PrivateRoute>
        },
        {
          path: "/update-profile",
          element: <UserProfile/>
        },
        {
          path: "/cart-page",
          element: <CartPage/>
        },
        {
          path: "/process-checkout",
          element: <Payment/>
        },
        {
          path:"/wedding-catering",
          element: <Buffet catering="Wedding Catering"/>
        },
        {
          path:"/event-catering",
          element: <Buffet catering="Event Catering"/>
        },
        {
          path:"/corporate-catering",
          element: <Buffet catering ="Corporate Catering" />
        },
        {
          path:"/Packages",
          element: <Packages/>
        },
        {
          path:"/contact",
          element:<Contact/>
        }
      ]
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
      children: [
        {
          path: '',
          element: <Dashboard/>
        },
        {
          path: 'users',
          element: <Users/>
        },
        {
          path: 'add-menu',
          element: <AddMenu/>
        },
        {
          path: 'manage-items',
          element: <ManageItems/>
        },
        {
          path: 'update-menu/:id',
          element: <UpdateMenu/>,
          loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)  //BOX-GENIE BACKEND MENU
        },
        {
          path: 'bookings',
          element: <ManageBookings/>
        },
        {
          path: 'buffetser',
          element: <BuffetPage/>
        },
      ]
    }
  ]);

  export default router;