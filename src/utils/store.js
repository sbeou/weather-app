import { configureStore } from "@reduxjs/toolkit";
import { adressSlice } from "../features/AdressSlices";

export default configureStore({
    reducer: {
        adress: adressSlice.reducer
    }
})