
import axios from 'axios' 
const crypto = require('crypto')
export const state = () => ({
  isAuth: false,
  biggerScreen: true,
  user:"",
  selectedBranchId:100,
  role:""


})

export const mutations = {
  setAuth: function (state, auth) {
    state.isAuth = auth
  },
  setBiggerScreen: function (state, biggerScreen) {
    state.biggerScreen = biggerScreen
  },
  setUser: function (state, user) {
    state.user = user
  },
  setBranchId: function (state, selectedBranchId) {
    state.selectedBranchId = selectedBranchId
  },
  setRole: function (state, selectedRole) {
    state.role = selectedRole
  },
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { app }) {
        let isAuth = false;
        let user=null;
        let selectedRole="";
        if (app.$cookies.get('_sessionId') != "") {
          try {
              let mykey = crypto.createDecipher('aes-128-ecb', '123');
              let cookieVal= mykey.update(app.$cookies.get('_sessionId'), 'hex','utf8');
              cookieVal+=mykey.final('utf8');
              const session=JSON.parse(cookieVal)
              if(session.userEmail != "")
              {
                isAuth = true;
                user = session.userEmail;
                selectedRole=session.userRole;
              }
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setAuth', isAuth)
        commit('setUser', user);
        commit('setRole',selectedRole);

      }

}
