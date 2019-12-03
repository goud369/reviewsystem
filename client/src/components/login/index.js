import React, {useState} from 'react';
import {Form, Button, Alert, Card} from 'react-bootstrap';
import {getLoginDetails} from '../../actions';
import { useHistory } from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setErrors] = useState(false);
    let history = useHistory();
    async function handleSubmit(e){
        e.preventDefault();
        let authJwt = await getLoginDetails({email:email,password:password});
        if(authJwt.errors){
            sessionStorage.setItem('auth','');
            sessionStorage.setItem('isAuthenticated',false);
            setErrors({error:!error});
        }
        else{
            sessionStorage.setItem('auth',authJwt.accessToken);
            sessionStorage.setItem('isAuthenticated',true);
            sessionStorage.setItem('email',email);
            history.push('/orders');
            setErrors({error:!error});
        }
    }
    return(
      <div style={{marginTop:'30px'}}>
      <h3 className="text-center">Review System (with multiple login credentials)</h3>
        <Form onSubmit={handleSubmit}>
        { error &&  <Alert variant='danger'>Enter Valid Credentials</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} required/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}  required/>
        </Form.Group>
        <Button variant="danger" type="submit">
          Submit
        </Button>
        <hr/>
      </Form>
      <Card>
      <Card.Header>Demo Users</Card.Header>  
    <Card.Body>
        <ul className="list list-unstyled">
          <li>email: user1@g.com, password: 12345</li>
          <li>email: user2@g.com, password: 12345</li>
          <li>email: user3@g.com, password: 12345</li>
        </ul>
      </Card.Body>
    </Card>
    </div>
    )
}

export default Login;