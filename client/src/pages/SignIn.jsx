import React, { useState } from 'react';
import styled from 'styled-components';
import { api } from '../axios';
import { useDispatch } from 'react-redux';
import { loginFailed, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 20px 50px;
  border: 1px solid ${({ theme }) => theme.soft};
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
  outline: none;
  transition: 0.4s;

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.hover};
  }
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  console.log(email);

  const handleLoginFn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await api.post('/auth/sign-in', { name, password });
      dispatch(loginSuccess(res.data));
    } catch {
      dispatch(loginFailed());
    }
  };

  const signInWithGoogle = () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then(async (result) => {
        await api
          .post('/auth/google', {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL
          })
          .then((res) => dispatch(loginSuccess(res.data)));
      })
      .catch((err) => dispatch(loginFailed(err)));
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle> to continue to YouTube</SubTitle>
        <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLoginFn}> Sign In</Button>

        <Title> or </Title>
        <Button onClick={signInWithGoogle}> sign in with Google</Button>
        <Title> or </Title>

        <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button> Sign Up</Button>
      </Wrapper>

      <More>
        English(USA)
        <Links>
          <Link>Help</Link>

          <Link>Privacy</Link>

          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
