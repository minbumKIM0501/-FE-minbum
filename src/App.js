import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Main from './pages/product/Main';
import Merge from './pages/product/Merge';
import Report from './pages/report/Report';
import AddProduct from './pages/product/AddProduct';
import Login from './pages/user/Login';
import Test from './pages/user/Test';
import ReportManagement from './pages/report/ProcessManagement';
import ProcessDetail from './pages/report/ProcessDetail';

import ReportUpdate from './pages/report/ReportUpdate';
import AdminNav from './components/common/AdminNav';
import Search from './pages/report/Search';

import MessageList from './pages/message/MessageList';
import UsedProduct from './pages/product/UsedProduct';
import UsedProductDetail from './pages/product/UsedProductDetail';
import WishList from './pages/wish/WishList';
import SubHeaderLayout from './layouts/SubHeaderLayout';
import MyProductList from './pages/product/MyProductList';
import MessageDetail from './pages/message/MessageDetail';
import ProductEdit from './pages/product/ProductEdit';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='merge' element={<Merge />} />
          <Route path='usedProduct' element={<UsedProduct />} />
          <Route path='usedProduct/:productCode' element={<UsedProductDetail />} />
          <Route path='addProduct' element={<AddProduct />} />
          <Route path='productEdit' element={<ProductEdit /> } />
          

          <Route path='admin' element={<AdminNav />} />


          <Route path='myPage' element={<SubHeaderLayout />}>
            <Route path='myproductlist' element={<MyProductList />} />
            <Route path='wishList' element={<WishList />} />
          </Route>

          <Route path='admin' element={<AdminNav />} />
          <Route path='messageList' element={<MessageList />} />
          <Route path='/messageDetail/:msgCode' element={<MessageDetail/>}/>

          <Route path='/report' element={<Report />} />
          <Route path='search' element={<Search />} />
          <Route path='/processManagement' element={<ReportManagement />} />
          <Route path='/processDetail/:reportNo' element={<ProcessDetail />} />

          <Route path='/process/:reportNo' element={<ReportUpdate />} />
          <Route path='login' element={<Login />} />
          <Route path='test' element={<Test />} />
        </Route>
        <Route path='login' element={<Login />} />
      <Route path='test' element={<Test />} />
      </Routes >

    </BrowserRouter >
  );
}

export default App;
