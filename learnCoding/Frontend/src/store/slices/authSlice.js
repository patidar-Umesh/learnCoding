import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')) : null,
  signupData: null,
  loading: false,
}


// crate auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,

  reducers: {
  setToken : (state, action) => {
    state.token = action.payload
  },
  setSignupData(state, action) {
    state.signupData = action.payload;
  },
  setLoading(state, action) {
    state.loading = action.payload;
  },
  }
})

export const {setToken, setLoading, setSignupData} = authSlice.actions

export default authSlice.reducer

