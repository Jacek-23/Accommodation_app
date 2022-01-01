import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from '../../../axios';
import { objectToArrayWithId } from '../../../helpers/objects';
import useAuth from '../../../hooks/useAuth';

export default function MyHotels(props) {
  const [auth] = useAuth();
  const { url } = useRouteMatch();
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const res = await axios.get('/hotels.json');
      const newHotel = objectToArrayWithId(res.data)
                    .filter(hotel => hotel.user_id === auth.userId);
      setHotels(newHotel);
    } catch (ex) {
      console.log(ex.response);
    }
  }

  const deleteHandler = async id => {
    try {
      await axios.delete(`/hotels/${id}.json`);
      setHotels(hotels.filter(x => x.id !== id));
    } catch (ex) {
      console.log(ex.response);
    }
  }

  useEffect(() => {
    fetchHotels();
  }, []);


  return (
    <div>
      {hotels ? (
        <table className="table">
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Status</th>
              <th>Opcje</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(hotel => (
              <tr key={hotel.id}>
                <td>{hotel.name}</td>
                <td>
                  {hotel.status == 1
                    ? <span className="badge bg-success">aktywny</span>
                    : <span className="badge bg-secondary">ukryty</span>
                  }
                </td>
                <td>
                  <Link to={`/profil/hotele/edytuj/${hotel.id}`} className="btn btn-warning">Edytuj</Link>
                  <button onClick={() => deleteHandler(hotel.id)} className="ml-2 btn btn-danger">Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nie masz jeszcze żadnego hotelu.</p>
      )}
      <div className="text-center">
        <Link to={`${url}/dodaj`} className="btn btn-primary">Dodaj hotel</Link>
      </div>
    </div>
  );
}