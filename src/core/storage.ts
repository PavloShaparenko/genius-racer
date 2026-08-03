import { PlayerData } from './types';

const STORAGE_KEY = 'tima_math_racing_data';

const defaultData: PlayerData = {
  coins: 0,
  currentCarId: 'basic',
  unlockedCars: ['basic'],
};

export const loadPlayerData = (): PlayerData => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : defaultData;
};

export const savePlayerData = (data: PlayerData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};