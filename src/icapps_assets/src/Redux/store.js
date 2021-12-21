import { configureStore } from "@reduxjs/toolkit";
import icpPriceSlice from "./icpPriceSlice";

export const store = configureStore({
    reducer: {
        icpPrice: icpPriceSlice,
    }
})

