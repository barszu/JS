import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllVehicles , sellVehicle } from "../database.js";



const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {

  const [vehiclesFromQuery, setVehiclesFromQuery] = useState(null);
  const [needFetch, setNeedFetch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getAllVehicles()
        .then((vehicles) => {
          // console.log('fetched' , vehicles)
          setVehiclesFromQuery(vehicles);
          setNeedFetch(false);
        });
    };
    if (needFetch) {fetchData();}
  }, [needFetch]);

  const handleSell = async (clientId, vehicleId) => {
    await sellVehicle(clientId, vehicleId);
    setNeedFetch(true);
  };

  return (
    <ShopContext.Provider value={{ vehiclesFromQuery , handleSell }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);