import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import npm packages
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { toast } from 'react-toastify';  

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

const Signup = () => {
  // HOOK: CONTEXT FOR AUTH
  const { loginSaveUser } = useAuth();
  // REACT-ROUTER DOM HOOKS
  const navigate = useNavigate();

  // HOOK: SETTING COMPONENT STATE (& init values)
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  // Destructure data state nested object properties
  const { fullName, username, email, password } = user;

  // HOOK: useRef
  const passwordConfirmRef = useRef();

  // FORM FUNCTIONS
  // [1] handleTextChange handles state value change for all login data
  const handleTextChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // [2] handleSubmit will submit form data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Early Validation - Error Check First
    if(password !== passwordConfirmRef.current.value){
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // API Call to Write User Data
    try {
      const response = await authService.register(user);
      loginSaveUser(response.data);
      navigate('/dashboard');
    } catch(err) {
      console.log(err?.response);
    }
  }

  return (
    <BSCard title="Sign Up" authform>
      <Form onSubmit={ handleSubmit }>
        {/* GROUP 1: USERNAME */}
        <Form.Group className="mb-3" controlId="fullName">
          <FormLabel>Full Name</FormLabel>
          <FormControl
            type="text" 
            placeholder="Full Name"
            name="fullName"
            value={fullName}
            onChange={ handleTextChange }
            required 
          />
        </Form.Group>
        {/* GROUP 1: USERNAME */}
        <Form.Group className="mb-3" controlId="username">
          <FormLabel>Username</FormLabel>
          <FormControl
            type="text" 
            placeholder="Username"
            name="username"
            value={username}
            onChange={ handleTextChange }
            required 
          />
        </Form.Group>
        {/* GROUP 2: EMAIL */}
        <Form.Group className="mb-3" controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl type="email" placeholder="Email" name="email" value={email} onChange={ handleTextChange } required />
        </Form.Group>

        {/* GROUP 3: PASSWORD */}
        <Form.Group className="mb-3" controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl type="password" placeholder="Password" name="password" value={password} onChange={ handleTextChange } required />
        </Form.Group>

        {/* GROUP 4: PASSWORD CONFIRM */}
        <Form.Group className="mb-3" controlId="password-confirm">
          <FormLabel>Password</FormLabel>
          <FormControl type="password" placeholder="Password Confirmation" ref={passwordConfirmRef} required />
        </Form.Group>

        {/* SUBMIT BUTTON */}
        <BSButton loadingState={loading}>
          {loading ? '...' : 'Submit'}
        </BSButton>
      </Form>
      <UserNav>
        Already a member? &nbsp; <Link to="/login">Login Here</Link>
      </UserNav>
    </BSCard>
  )
}

export default Signup