
import {getAuth , signInWithPopup, createUserWithEmailAndPassword  , GoogleAuthProvider ,sendEmailVerification ,sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import initional from './firebase/firebase.init';

initional()
const provider = new GoogleAuthProvider();

function App() {
  const[email , setEmail] = useState('');
  const [password , setPassword ] =useState('');
  const [error , setError] = useState('');
  const auth = getAuth();
  const [isLogin , setisLogin ] = useState(false);
  const [name , setName ] = useState()

  const googleLoginClick =() =>{
    
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })

  }
const emailhendelar =e =>{
  setEmail(e.target.value);
}

const passwordhendel =e =>{
  setPassword(e.target.value);
}

const handelRegister=e=>{
  e.preventDefault()
  console.log(email ,password);
  if (password.length < 6) {
    setError('Password Must be at least 6 characters long.')
    return;
  }
  if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
    setError('Password Must contain 2 upper case');
    return;
  }
  
  if (isLogin) {
    processLogin(email, password);
  }
  else {
    registerNewUser(email, password);
  }
 
  
}

const userInputApply=e=>{
  setisLogin(e.target.checked);
}

const processLogin =()=>{
  createUserWithEmailAndPassword (auth , email,password)
  .then(result =>{
    const user = result.user;
    console.log(user);
    setError('')
  })
  .catch((error) => {
    const errorCode = error.code;
    setError(errorCode)
    // ..
  });
}

const registerNewUser=(email ,password)=>{
  createUserWithEmailAndPassword(auth, email, password)
  .then((result)=>{
    const user = result.user;
    console.log(user);
    setError("")
    EmailVerification()
  })
  .catch(error =>{
    setError(error.massage)
  })
}

const EmailVerification =() =>{
  sendEmailVerification(auth.currentUser)
  .then( result => {
    console.log(result);
  });
}
const hendelResetPassword =()=>{
  sendPasswordResetEmail(auth ,email)
  .then(result =>{
    console.log("success");
  })
}

const handeNameChange=e=>{
  setName(e.target.value)
}

  return (
    <>
    <div className="container">
    <form onSubmit={handelRegister}>
      <h1 className="text-primary text-center">Please {isLogin ? 'Login' : 'Register'} </h1>
  { !isLogin &&
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name  :</label>
    <input onBlur={handeNameChange} type="email" className="form-control" placeholder="Enter Your Name"  />
    
  </div>
  
  }

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input onBlur={emailhendelar} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input onBlur={passwordhendel} type="password" className="form-control" id="exampleInputPassword1" />
  </div>

  <div className="mb-3 form-check">
    <input type="checkbox" onChange={userInputApply} className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Already Registered ?</label>
  </div>

  <div className="row mb-3 text-denger">
    {error}
  </div>
 
  <button type="submit" className="btn btn-primary">
  {isLogin ? 'Login' : 'Register'}
    </button>

    <button type="button" onClick={hendelResetPassword}>Reset Password</button>
</form>
    </div>
      <br />
      <br />
      <br />
            <div>--------------------------------------</div>
      <br />
      <br />
      <button onClick={googleLoginClick}>Google Sing In</button>
     
    </>
  );
}

export default App;
