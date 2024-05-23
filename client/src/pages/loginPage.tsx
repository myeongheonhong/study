import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { register, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const google_url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

  const kakao_url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}
`;
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = sessionStorage.getItem('access-token');

    if (accessToken) {
      // navigate('/');
    }
  }, []);

  const postLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: watch('email'),
          password: watch('password'),
        }),
      });
      const data = await response.json();
      console.log(data);

      // if (data.status) {
      //   console.log(data);
      //   sessionStorage.setItem('access-token', data.data.accessToken);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const getGoogleLogin = async () => {
    window.location.href = google_url;
  };

  const getKakaoLogin = () => {
    window.location.href = kakao_url;
  };

  return (
    <>
      <h1>Login Page</h1>
      <input placeholder="아이디" {...register('email')} />
      <input placeholder="패스워드" {...register('password')} />
      <button onClick={postLogin}>로그인</button>
      <br />
      <button onClick={getGoogleLogin}>구글로 로그인하기</button>
      <button onClick={getKakaoLogin}>카카오로 로그인하기</button>
    </>
  );
}

export function GoogleOAuthPage() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const code = new URLSearchParams(search).get('code');

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://localhost:8080/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: code,
          }),
        });

        const responseData = await response.json();
        if (responseData.success) {
          sessionStorage.setItem('access-token', responseData.data.accessToken);
          console.log(responseData);
          // alert('로그인 성공');
          navigate('/');
        } else {
          console.log(responseData);
          // alert('로그인 실패');
          navigate('/login');
        }
      } catch (error) {
        console.log('error!!', error);
        navigate('/');
      }
    }
    getData();
  }, []);

  return (
    <>
      <h1>Google OAuth Page</h1>
    </>
  );
}

export function KakaoOAuthPage() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const code = new URLSearchParams(search).get('code');

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://localhost:8080/auth/kakao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: code,
          }),
        });

        const responseData = await response.json();
        if (responseData.success) {
          sessionStorage.setItem('access-token', responseData.data.accessToken);
          console.log(responseData);
          // alert('로그인 성공');
          // navigate('/');
        } else {
          console.log(responseData);
          // alert('로그인 실패');
          // navigate('/login');
        }
      } catch (error) {
        console.log('error!!', error);
        // navigate('/');
      }
    }
    getData();
  }, []);

  return (
    <>
      <h1>Kakao OAuth Page</h1>
    </>
  );
}
