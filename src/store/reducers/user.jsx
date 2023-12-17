import { createSlice } from "@reduxjs/toolkit";

const initialTokens = {
  access_token: "",
  refresh_token: "",
};

const initialState = {
  userid: null,
  username: "",
  email: "",
  usertype: "",
  tokens: initialTokens,
  photo: null,
  company_name: null,
  phone: "",
  fullname: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    _setUser: (state, action) => {
      const {
        userid,
        username,
        email,
        usertype,
        photo,
        company_name,
        phone,
        fullname,
        tokens,
      } = action.payload;
      state.userid = userid;
      state.username = username;
      state.email = email;
      state.usertype = usertype;
      state.photo = photo;
      state.company_name = company_name;
      state.phone = phone;
      state.fullname = fullname;
      state.tokens = tokens;
    },

    _setInformations: (state, action) => {
      const { fullname, email, company_name, phone } = action.payload;
      state.fullname = fullname;
      state.email = email;
      state.company_name = company_name;
      state.phone = phone;
    },

    _setTokens: (state, action) => {
      state.tokens = action.payload;
    },

    _logOut: (state) => {
      state.userid = null;
      state.username = "";
      state.email = "";
      state.usertype = "";
      state.photo = null;
      state.company_name = null;
      state.phone = "";
      state.fullname = "";
      state.tokens = initialTokens;
    },

    _setPhoto: (state, action) => {
      state.photo = action.payload;
    },
  },
});

export const { _setUser, _setInformations, _setTokens, _logOut, _setPhoto } =
  user.actions;
export default user.reducer;
