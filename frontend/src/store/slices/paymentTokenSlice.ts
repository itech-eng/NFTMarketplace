import { createSlice } from "@reduxjs/toolkit";

interface tokenType {
  id: number;
  name: string;
  contract_address: string;
  token_symbol: string;
  total_decimal: number;
  is_wrapable: number;
  is_default: number;
  min_amount_to_execute_auction: number;
  type: number;
  logo: string;
  usd_rate: number;
}

interface initialStateType {
  nativeToken: null | tokenType;
  wrapToken: null | tokenType;
}

const initialState: initialStateType = {
  nativeToken: null,
  wrapToken: null,
};

const paymentTokenSlice = createSlice({
  name: "paymentTokens",
  initialState,
  reducers: {
    setNativeToken: (state, action) => {
      state.nativeToken = action.payload;
    },
    setWrapToken: (state, action) => {
      state.wrapToken = action.payload;
    },
  },
});

export const { setNativeToken, setWrapToken } = paymentTokenSlice.actions;

export default paymentTokenSlice.reducer;
