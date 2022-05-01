import React from 'react';

export default React.createContext({
  cars: [] as any[],
  addNewCar: (car: any) => {},
  deleteCar : (carId: number) => {},
  deleteContext: () => {}
});