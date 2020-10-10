import Home from "./views/Home";
import Category from "./views/Category";
import Contact from "./views/Contact";
import Product_Detail from "./views/Product_Detail";
import MyCart from "./views/MyCart";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";

import Dashboard from "./views/Admin/Dashboard";
import ProductDetail from "./views/Admin/Product_detail";
import Order from "./views/Admin/Order";
import Product from "./views/Admin/Product";
import Restock from "./views/Admin/Restock";
import Setting from "./views/Admin/Setting";
import Transaction from "./views/Admin/Transaction";
import AddProduct from "./components/Admin/AddProduct";
import Search from "./views/Search";

export const route_user = [
    {path:'/search/:key', component:Search, exact:true},
    {path:'/category/:id', component:Category, exact:true},
    {path:'/contact', component:Contact, exact:true},
    {path:'/product_detail/:id', component:Product_Detail, exact:true},
    {path:'/mycart', component:MyCart, exact:true},
    {path:'/login', component:Login, exact:true},
    {path:'/register', component:Register, exact:true},
    {path:'', component:Home, exact:true},
]

export const route_admin = [
    {path:'/admin/dashboard/', component: Dashboard, exact: true},
    {path:'/', component: Dashboard, exact: true},
    {path:'/admin/', component: Dashboard, exact: true},
    {path:'/admin/product_detail/:id', component: ProductDetail, exact: true},
    {path:'/admin/order/', component: Order, exact: true},
    {path:'/admin/product/', component: Product, exact: true},
    {path:'/admin/add_product/', component: AddProduct, exact: true},
    {path:'/admin/restock/', component: Restock, exact: true},
    {path:'/admin/setting/', component: Setting, exact: true},
    {path:'/admin/transaction/', component: Transaction, exact: true},
]
