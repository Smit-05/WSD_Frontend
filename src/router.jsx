import {
    createBrowserRouter,
} from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import AddProduct from "./components/AddProduct";
import ViewProduct from "./components/ViewProduct";
import MyProducts from "./components/MyProducts";
import Profile from "./components/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path:"/home",
        element: <Main/>
    },
    {
        path:"/addproduct",
        element: <AddProduct/>
    },
    {
        path:'/product/:id',
        element:<ViewProduct/>
    },
    {
        path:'/myproducts',
        element:<MyProducts/>
    },
    {
        path:"/profile",
        element: <Profile/>
    }
]);


export default router;