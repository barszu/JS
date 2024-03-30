import ReactDOM from 'react-dom/client'
import {useState , useEffect} from "react";
import React from "react";
import { sellVehicle , getAllVehicles } from "../database.js";

// const [needRender, setNeedRender] = useState(true);
const clientId = 1;

const Vehicle = ({ vehicle }) => {
  const handleSell = async (clientId, vehicleId) => {
    // await sellVehicle(clientId, vehicleId);
    // setNeedRender(true);
  };
  // console.log(vehicle.image);
  return (
    <div className="card col-md-3 m-3" style={{ width: "18rem" }}>
      <img src={vehicle.image} className="card-img-top rounded mx-auto d-block" alt="Nie udalo sie wczytac zdjecia..." />
      <div className="card-body">
        <h5 className="card-title">{vehicle.name}</h5>
        <p className="card-text">{vehicle.description}</p>
        <p className="card-text">{vehicle.price}$</p>
        <button
          onClick={() => handleSell(clientId, vehicle.id)}
          className="btn btn-primary"
        >
          Kup
        </button>
      </div>
    </div>
  )
};

const ProductsList = () => {
  const [vehiclesFromQuery, setVehiclesFromQuery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllVehicles()
        .then((vehicles) => {
          // console.log('fetched' , vehicles)
          setVehiclesFromQuery(vehicles);
        });
    };

    fetchData();
  }, []);


  if (vehiclesFromQuery.length === 0) {
    return <p>Loading...</p>;
  }
  else{
    // console.log('ready' , vehiclesFromQuery);
    return (
      <div class="row d-flex flex-row">
        {vehiclesFromQuery.map((vehicle) => (
          <Vehicle key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    )
  }
};




// wstrzykiwane do html main
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ProductsList />
  </React.StrictMode>
);

