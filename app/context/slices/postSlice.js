import { BASE_URL } from "@/app/utils/base-url";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching posts data
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(`${BASE_URL}/api/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  return data?.posts;
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
