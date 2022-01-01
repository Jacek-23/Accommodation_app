import { useState } from "react";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import { validate } from "../../../helpers/validations";
import Input from "../../../components/Input/Input";
import axios from "../../../axios-auth";
import useAuth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";



export default function Register(props) {
  const history = useHistory();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: {
      value: '',
      error: '',
      showError: false,
      rules: ['required', 'email']
    },
    password: {
        value: '',
        error: '',
        showError: false,
        rules: ['required']
    },
  });
  const [error, setError] = useState('');
  const valid = !Object.values(form)
    .map(input => input.error)
    .filter(error => error)
    .length;

  

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('accounts:signUp', {
      email: form.email.value,
      password: form.password.value,
      returnSecureToken: true
    });
     
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      history.push('/');
    } catch (ex) {
      setError(ex.response.data.error.message);
      console.log(ex.response);
    }

    setLoading(false)
  }

  const changeHandler = (value, fieldName) => {
    const error = validate(form[fieldName].rules, value);

    setForm({
      ...form, 
      [fieldName]: {
        ...form[fieldName],
        value,
        showError: true,
        error: error
      } 
    });
  }

  if (auth) {
    history.push('/');
  }

  return (
    <div className="card">
      <h4 className="card-header">Rejestracja</h4>
      <div className="card-body">
        
        <p className="text-muted text-center">Uzupełnij dane</p>

        <form onSubmit={submit}>

          <Input
            label="Email"
            type="email"
            value={form.email.value}
            onChange={val => changeHandler(val, 'email')}
            className="form-control mb-3"
            error={form.email.error}
            showError={form.email.showError} />

          <Input
            label="Hasło"
            type="password"
            value={form.password.value}
            onChange={val => changeHandler(val, 'password')}
            className="form-control mb-3"
            error={form.password.error}
            showError={form.password.showError} />

          {error ? (
            <div className="alert alert-danger mt-2">{error}</div>
          ) : null}

          <div className="text-center mt-2">
            <LoadingButton 
              loading={loading} 
              disabled={!valid}
              className="btn-success">
                Gotowe!
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}