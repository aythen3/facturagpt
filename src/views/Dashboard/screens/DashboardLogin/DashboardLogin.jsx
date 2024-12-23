import React, { useEffect, useState } from 'react';
import styles from './DashboardLogin.module.css';
import googleIcon from '../../assets/Google.svg';
import facebookIcon from '../../assets/Vector.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAccount, loginToManager } from '../../../../actions/emailManager';
import { useSelector } from 'react-redux';
import { setUser } from '../../../../slices/emailManagerSlices';

const DashboardLogin = () => {
  const {user} = useSelector(state=>state.emailManager)
  const dispatch = useDispatch()
  const [mode,setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    console.log('User changed to', user);
    if (user?.email && user?.id && user?.role) {
        localStorage.setItem('emailManagerAccount', JSON.stringify(user));
        console.log('User data stored in localStorage:', user);
        navigate('/dashboard/home')
    }
}, [user]);


useEffect(() => {
  const storedUser = localStorage.getItem('emailManagerAccount');
  if (storedUser) {
      try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.email && parsedUser?.id && parsedUser?.role) {
             dispatch(setUser(parsedUser))
              console.log('Logged-in account restored from localStorage:', parsedUser);
          }
      } catch (error) {
          console.error('Error parsing stored user data:', error);
      }
  }
}, []);

  const clearStates = () => {
    setEmail('')
    setPassword('')
    setRepeatPassword('')
  }

  useEffect(()=>{
    clearStates()
  },[mode])

  const handleSignin = () => {
    console.log('Handling sign in...', {email,password})
    if(email.length>1 && password.length>1){
      dispatch(loginToManager({email,password}))
    }
    clearStates()
  }

  const handleSignup = () => {
    console.log('Handling sign up...', {email, password, repeatPassword})
    if(email.length>1 && password.length>1 && password === repeatPassword){
      dispatch(createAccount({email,password}))
    }
    clearStates()
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h1 className={styles.title}>¡Estás de vuelta!</h1>
        <p className={styles.subtitle}>
          Aquí vas a poder ver el estado actual de las gestiones documentales entre Aythen y HSB.
        </p>
        <form className={styles.form}>
          <label className={styles.label}>
            Email
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Example@email.com" className={styles.input} />
          </label>
          <label className={styles.label}>
            Password
            <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder="at least 8 characters" className={styles.input} />
          </label>
          {mode === 'signup' &&  <label className={styles.label}>
            Confirm password
            <input  value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)}  type="password" placeholder="Repeat password" className={styles.input} />
          </label>}
         {mode === 'signin' && <a href="#" className={styles.forgotPassword}>
            Forgot Password?
          </a>}
          <div onClick={()=>mode === 'signin' ? handleSignin() : handleSignup()} className={styles.signInButton}>
            {mode === 'signin' ? 'Sign in':'Sign up'}
          </div>
        </form>
        {/* <div className={styles.divider}>
          <span className={styles.line}></span>
          <span className={styles.or}>Or</span>
          <span className={styles.line}></span>
        </div>
        <div className={styles.socialLogin}>
          <button className={styles.socialButton}>
           <div className={styles.innerButton}>
           <img src={googleIcon} alt="Google" className={styles.icon} />
           Sign in with Google
           </div>
          </button>
          <button className={styles.socialButton}>
           <div className={styles.innerButton}>
           <img src={facebookIcon} alt="Facebook" className={styles.icon} />
           Sign in with Facebook
           </div>
          </button>
        </div> */}
        <p className={styles.footerText}>
          {mode === 'signin' ? 'Don’t you' : 'Already'} have an account? <a onClick={()=>setMode(mode !== 'signin' ? 'signin':'signup')} className={styles.signUp}>{mode !== 'signin' ? 'Sign in':'Sign up'}</a>
        </p>
        <p className={styles.footer}>© 2024 ALL RIGHTS RESERVED</p>
      </div>
      <div className={styles.rightContainer}></div>

    </div>
  );
};

export default DashboardLogin;
