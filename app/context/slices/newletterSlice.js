import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching newsletters data
export const fetchnewsletters = createAsyncThunk(
  "newsletters/fetchnewsletters",
  async () => {
    const response = await fetch(`http://localhost:3000/api/newsletter`);
    if (!response.ok) {
      throw new Error("Failed to fetch newsletters");
    }
    const data = await response.json();
    return data?.newsletters;
  }
);

const newsletterSlice = createSlice({
  name: "newsletters",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchnewsletters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchnewsletters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchnewsletters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newsletterSlice.reducer;
