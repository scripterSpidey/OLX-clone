
import Home from "./pages/Home";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Header from "./components/Header";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SalePage from "./pages/SalePage";
import ProductPage from "./pages/ProductPage";
function App() {
    return(
        <div>
            {/* <ProductContext> */}
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path='/signup' element={<SignupPage/>}/>
                        <Route path="/login" element={<LoginPage/>}></Route>
                        <Route path='/sale-product' element={<SalePage/>}></Route>
                        <Route path='/product/:productId' element={<ProductPage/>}></Route>
                    </Routes>
                </BrowserRouter>
            {/* </ProductContext> */}
            
        </div>
    )
}

export default App
