import { Region } from 'react-native-maps';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from './storage';

export type MarkerState = {
  id?: string;
  title: string;
  description: string;
  region: Region; // Make region nullable
};

interface TempMarkerState {
  marker: MarkerState | null;
  activateMarker: (marker: MarkerState) => void;
  deactivateMarker: () => void;
}

export const useTempMarkerStore = create<TempMarkerState>((set) => ({
  marker: null,
  activateMarker: (marker: MarkerState) => set({ marker }),
  deactivateMarker: () => set({ marker: null }),
}));

interface PersistedMarkerState {
  markers: Required<MarkerState>[];
  addMarker: (marker: Required<MarkerState>) => void;
  removeMarker: (id: string) => void;
  getMarker: (id: string) => Required<MarkerState> | undefined;
  updateMarker: (id: string, marker: Omit<MarkerState, 'id'>) => void;
}

export const usePersistedMarkerStore = create<PersistedMarkerState>()(
  persist(
    (set, get) => ({
      markers: [],
      addMarker: (marker) => set((state) => ({ markers: [...state.markers, marker] })),
      removeMarker: (id) => set((state) => ({ markers: state.markers.filter((m) => m.id !== id) })),
      getMarker: (id: string) => get().markers.find((m) => m.id === id),
      updateMarker: (id, marker) =>
        set((state) => ({
          markers: state.markers.map((m) => (m.id === id ? { ...marker, id } : m)),
        })),
    }),
    {
      name: 'mmkv-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

interface AppSettingsState {
  settings: {
    theme: 'light' | 'dark';
    expandedSearch: boolean;
  };
  toggleTheme: () => void;
  expandSearchBar: () => void;
  minimizeSearchBar: () => void;
}

export const useAppSettingsStore = create<AppSettingsState>((set) => ({
  settings: {
    theme: 'light',
    expandedSearch: false,
  },
  toggleTheme: () =>
    set((state) => ({
      settings: {
        ...state.settings,
        theme: state.settings.theme === 'light' ? 'dark' : 'light',
      },
    })),
  expandSearchBar: () =>
    set((state) => ({
      settings: {
        ...state.settings,
        expandedSearch: !state.settings.expandedSearch,
      },
    })),
  minimizeSearchBar: () =>
    set((state) => ({
      settings: {
        ...state.settings,
        expandedSearch: false,
      },
    })),
}));
