import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import npm packages
import { Form } from 'react-bootstrap';
import styled from 'styled-components';  

// Import custom modules
import authService from '../../services/authService';
import useAuth from '../../hooks/useAuth';
import BSCard from '../../components/common/BSCard';
import BSButton from '../../components/common/BSButton';

const FormLabel = styled(Form.Label)`
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0rem;
  margin-left: 0.7rem;
`;

const FormControl = styled(Form.Control)`
  background-color: var(--highlight-light);
  color: var(--complementary);
  border: none;
  border-bottom: 3px solid var(--highlight-dark);
  border-radius: 0rem;
  margin-top: 0rem;
  padding-bottom: 0.25rem;
`;

const UserNav = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  font-size: 0.9em;
  font-style: italic;
  text-align: center;

  a {
    text-decoration: none;
    color: var(--brand);

    &:hover {
      color: var(--brand-dark);
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  // HOOK: CONTEXT FOR AUTH
  const { loginSaveUser } = useAuth();
  // REACT-ROUTER DOM HOOKS
  const navigate = useNavigate();

  // HOOK: SETTING COMPONENT STATE (& init values)
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  // Destructure data state nested object properties
  const { email, password } = user;

  // FORM FUNCTIONS
  // [1] handleTextChange handles state value change for all login data
  const handleTextChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // [2] handleSubmit will submit form data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(user);
      loginSaveUser(response.data);
      navigate('/dashboard');
    } catch(err) {
      console.log(err?.response);
    }
  }

  return (
    <BSCard title="Login" authform>
      <Form onSubmit={ handleSubmit }>
        {/* GROUP 1: EMAIL */}
        <Form.Group className="mb-3" controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl type="email" placeholder="Enter email" name="email" value={email} onChange={ handleTextChange } required />
        </Form.Group>

        {/* GROUP 2: PASSWORD */}
        <Form.Group className="mb-3" controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl type="password" placeholder="Enter password" name="password" value={password} onChange={ handleTextChange } required />
        </Form.Group>

        {/* SUBMIT BUTTON */}
        <BSButton loadingState={loading}>
          {loading ? '...' : 'Submit'}
        </BSButton>
      </Form>
      <UserNav>
        Not a member? &nbsp; <Link to="/signup">Sign Up</Link>
      </UserNav>
    </BSCard>
  )
}

export default Login