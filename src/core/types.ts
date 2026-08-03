export interface Car {
  id: string;
  name: string;
  emoji: string;
  price: number;
}

export interface PlayerData {
  coins: number;
  currentCarId: string;
  unlockedCars: string[];
}