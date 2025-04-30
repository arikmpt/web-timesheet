import { create } from 'zustand';
import { Country } from '../api/ref';

interface RefState {
  countries: Country[];
  setCountries: (countries: Country[]) => void;
}

export const useRefStore = create<RefState>((set) => ({
  countries: [],
  setCountries: (countries) => set({ countries }),
}));
