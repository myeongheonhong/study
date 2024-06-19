import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const { register, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const google_url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

  const kakao_url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}
`;

  const postSignup = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: watch('email'),
          username: watch('username'),
          password: watch('password'),
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {}
  };

  return (
    <>
      <h1>Signup Page</h1>
      <input placeholder="아이디" {...register('email')} />
      <br />
      <input placeholder="userName" {...register('username')} />

      <br />
      <br />
      <input placeholder="패스워드" {...register('password')} />
      <br />
      <input placeholder="패스워드 확인" {...register('password')} />
      <button onClick={postSignup}>회원가입</button>

      <br />
      <button
        onClick={() => {
          window.location.href = google_url;
        }}>
        구글로 회원가입하기
      </button>

      <br />
      <button
        onClick={() => {
          window.location.href = kakao_url;
        }}>
        카카오로 회원가입하기
      </button>
    </>
  );
}
