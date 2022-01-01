
import { useContext } from 'react';
import { Route, Redirect} from 'react-router-dom';
import ReducerContext from '../context/reducerContext';

export default function AuthenticatedRoute(props) {
  const context = useContext(ReducerContext)

  return props.user
    ? <Route {...props} />
    : <Redirect to="/zaloguj" />
}