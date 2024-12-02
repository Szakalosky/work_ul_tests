import React, { createContext, useContext } from "react";

interface carPropsType {
  id: number;
  name: string;
}

const CarContext = createContext<carPropsType[] | undefined>(undefined);

const Car = () => {
  const cars = useContext(CarContext);

  if (!cars) {
    return <p>No cars in Car component</p>;
  }

  return (
    <>
      <>Component Nr 1</>
      {cars?.map((car) => (
        <ul key={car.id}>
          <li>{car.name}</li>
        </ul>
      ))}
    </>
  );
};

const Car2 = () => {
  return (
    <>
      <p>Component Nr2</p>
      <Car />
    </>
  );
};

const Car3 = () => {
  const carCon = useContext(CarContext);

  if (!carCon) {
    return <p>No available cars</p>;
  }
  return (
    <>
      <p>Component Nr 3</p>
      <Car2 />
      <p>{carCon.map((car) => car.name).join(", ")}</p>
    </>
  );
};

//Main component

const NewProps = () => {
  const cars: carPropsType[] = [
    { id: 0, name: "Mitsubishi" },
    { id: 1, name: "Audi" },
    { id: 2, name: "Seat" },
  ];
  return (
    <CarContext.Provider value={cars}>
      <Car3 />
    </CarContext.Provider>
  );
};

export default NewProps;
