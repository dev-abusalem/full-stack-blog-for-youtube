import { BASE_URL } from "@/app/utils/base-url";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching contact data
export const fetchcontact = createAsyncThunk(
  "contact/fetchcontact",
  async () => {
    const response = await axios.get(`${BASE_URL}/api/contact`);
    return response.data?.contacts;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    data: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcontact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchcontact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchcontact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
