import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    addFavourites(state, action) {
      state.favourites = [...state.favourites, action.payload];
      localStorage.setItem("Favourites", JSON.stringify(state.favourites));
    },
    removeFavourites(state, action) {
      const index = state.favourites.findIndex(
        (favourite) => favourite.id === action.payload.id
      );
      if (index !== -1) {
        state.favourites.splice(index, 1);
        localStorage.setItem("Favourites", JSON.stringify(state.favourites));
      }
    },
    clearFavourites(state, action) {
      localStorage.removeItem("Favourites");
      state.favourites = [];
    },
  },
});

export const { addFavourites, removeFavourites, clearFavourites } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
