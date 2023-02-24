import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./app/layouts/MainLayout";
import AccountPage from "./app/pages/user/AccountPage";
import HomePage from "./app/pages/HomePage";
import SigninPage from "./app/pages/auth/SigninPage";
import SignupPage from "./app/pages/auth/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/auth/signin" element={<SigninPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
