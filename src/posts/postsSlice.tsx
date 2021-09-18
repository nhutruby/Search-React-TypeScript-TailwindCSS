import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'

type Post = { id: string, body: string, title: string }

const postsAdapter = createEntityAdapter<Post>()

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  let posts
  try {
    const response: any = await axios.get('https://jsonplaceholder.typicode.com/posts')
    if (response.status === 200) {
      return response.data
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : posts)
  }
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      postsAdapter.upsertMany(state, action.payload)
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message as any
    })
  },
})

export default postsSlice.reducer

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors<RootState>((state) => state.posts)

