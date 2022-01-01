import { useState, useEffect } from "react";
import { validateEmail } from '../../../helpers/validations';
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import axios from "../../../axios-auth";
 

export default function Login(props) {
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    passsword: ''
  });
  const buttonDisabled = Object.values(errors).filter(x => x).length;

  const submit = async (e) => {
    //logowanie
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true,
      });
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      history.push('/');
    } catch (ex) {
      setError(ex.response.data.error.message);
      setLoading(false);
      console.log(ex.response);
    }
  }

  if (auth) {
    history.push('/');
  }

  useEffect(() => {
    if (validateEmail(email)) {
      setErrors({...errors, email: ''});
    } else {
      setErrors({...errors, email: 'Niepoprawny email'});
    }
  }, [email]);

  useEffect(() => {
    if (password.length >= 6 || !password) {
      setErrors({...errors, password: ''});
    } else {
      setErrors({...errors, password: 'Wymagane 6 znaki'});
    }
  }, [password]);

  return (
    <div>
      <h2>Logowanie</h2>
      
      {valid === false ? (
        <div className="alert alert-danger mt-2">Niepoprawne dane logowania</div>
      ) : null}

      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="email-input">Email</label>
          <input
          id="email-input" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`} />
        </div>
        <div className="form-group mt-2">
          <label>Hasło</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">
            {errors.password}
          </div>
        </div>

        {error ? (
          <div className="alert alert-danger mt-2">{error}</div>
        ) : null}
        
        <LoadingButton loading={loading} disabled={buttonDisabled}>Zaloguj</LoadingButton>
      </form>
    </div>
  )
}