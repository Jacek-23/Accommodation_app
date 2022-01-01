import axios from '../../../../axios';
import { useHistory } from 'react-router-dom';
import HotelForm from '../HotelForm';
import useAuth from '../../../../hooks/useAuth';

const AddHotel = props => {
  const [auth] = useAuth();
  const history = useHistory();

  const submit = async form => {
    await axios.post(`/hotels.json?auth=${auth.token}`, form);
    history.push('/profil/hotele');
  }

  return (
    <div className="card">
      <h4 className="card-header">Dodaj hotel</h4>
      <div className="card-body">
        <p className="text-muted text-center">Uzupełnij dane hotelu</p>
          <HotelForm 
            buttonText="Dodaj!"
            onSubmit={submit} />
      </div>
    </div>
  );
}

export default AddHotel;