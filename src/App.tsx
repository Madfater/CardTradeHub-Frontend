import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  MainPage,
  ShoppingCart,
  StoreManager,
  SearchPage,
  RegisterPage,
  CardIntro,
  StorePage,
  OrderPage
} from "./Pages";
import { AuthProvider } from "./Contexts/AuthContext";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/storemanager" element={<StoreManager />} />
            <Route path="/searchpage" element={<SearchPage />} />
            <Route path="/registerpage" element={<RegisterPage/>}/>
            <Route path="/cardintroduction" element={<CardIntro/>}/>
            <Route path="/storepage" element={<StorePage/>}/>
            <Route path="/orderpage" element={<OrderPage/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}
