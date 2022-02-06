import { Button } from '@mui/material';
import React from 'react';
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';
import './Login.css'

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = ()=> {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        }).catch((error) => alert(error))
    }
    return <div className='login'>
        <div className="login-container">
            <img style={{ height: '100px', objectFit: 'contain', marginTop: '-50px', marginBottom: '20px'}} src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="whatsappLogo" />
            {/* <div className="login-text">
                <h1>Sign in to the whatsapp</h1>
            </div> */}
            <Button onClick={signIn} style={{background: 'rgb(19, 136, 78)', textTransform: 'inherit'}} variant="contained">Sign In With Google</Button>
        </div>
    </div>;
}

export default Login;
