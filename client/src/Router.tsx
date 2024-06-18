import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage, { GoogleOAuthPage, KakaoOAuthPage } from './pages/loginPage';
import MainPage from './pages/mainPage';
import SignupPage from './pages/signupPage';
import SearchPage from './pages/searchPage';
import UploadPage from './pages/uploadPage';
import PortfolioPage from './pages/portfolioPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/google" element={<GoogleOAuthPage />} />
        <Route path="/auth/kakao" element={<KakaoOAuthPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/portfolios" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  );
}
