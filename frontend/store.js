import { create } from 'zustand';

export const initialState = {
    location: "",
    dates: [new Date(), new Date()],
    guests: 0,
    rooms: 0, // Nuevo estado para la cantidad de habitaciones
};

export const useSearchStore = create((set) => ({
    ...initialState,
    increaseGuests: () => set((state) => ({ guests: state.guests + 1 })),
    decreaseGuests: () => set((state) => ({ guests: state.guests - 1 })),
    increaseRooms: () => set((state) => ({ rooms: state.rooms + 1 })), // Nueva función para incrementar la cantidad de habitaciones
    decreaseRooms: () => set((state) => ({ rooms: state.rooms - 1 })), // Nueva función para decrementar la cantidad de habitaciones
    removeAllFilters: () => set(initialState),
}));
