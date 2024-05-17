import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage, { GoogleOAuthPage, KakaoOAuthPage } from './pages/loginPage';
import MainPage from './pages/mainPage';
import SignupPage from './pages/signupPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/google" element={<GoogleOAuthPage />} />
        <Route path="/auth/kakao" element={<KakaoOAuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}
