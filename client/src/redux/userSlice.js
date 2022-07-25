import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
    },
    loginFailure: (state) => {
      state.loading = false
      state.error = true
    },
    logout: (state) => {
      return initialState
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedTo.includes(action.payload)) {
        state.currentUser.subscribedTo.splice(
          state.currentUser.subscribedTo.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        )
      } else {
        state.currentUser.subscribedTo.push(action.payload)
      }
    },
    updateStart: (state) => {
      state.loading = true
    },
    updateSuccess: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
    },
    updateFailure: (state) => {
      state.loading = false
      state.error = true
    },
  }
})

export const { loginStart, loginSuccess, loginFailure, logout, subscription, updateStart, updateSuccess, updateFailure} = userSlice.actions

export default userSlice.reducer