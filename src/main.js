import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import { auth, timestamp, storage } from './config/firebase'
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth'

import Feed from '../src/components/Feed.vue'
import Users from '../src/components/Users.vue'
import Login from '../src/components/Login.vue'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Vuelidate)
const axios = require('axios').default
const provider = new GoogleAuthProvider()

const users = {
  namespaced: true,
  state: {
    users: [
      {
        name: 'Kamila Benevides',
        id: 0
      }
    ],
    loggedUser: null,
    countId: 1,
    currentUser: null
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    create({ commit }, payload) {
      const { email, password, name } = payload
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const userTest = res.user
          console.log({ userTest })
          let addUser = {
            name: name,
            id: userTest.uid,
            email: email
          }
          commit('NewUser', addUser)
          router.push('/users')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // eslint-disable-next-line no-unused-vars
    authenticate({ commit }, payload) {
      const { email, password } = payload
      console.log(payload)
      console.log(email, password)
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res)
          const userTeste = res.user
          console.log(userTeste.displayName)
          commit('setUser', userTeste)

          router.push('/users')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // eslint-disable-next-line no-unused-vars
    authenticateGoogle({ commit }) {
      const auth = getAuth()
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user
          commit('loginGoogle', user)
          router.push('/users')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // eslint-disable-next-line no-unused-vars
    logout({ commit }) {
      signOut(auth)
        .then(() => {
          console.log('deslogou')
          ;(this.loggedUser = null), (this.currentUser = ' ')
          router.push('/')
        })
        .catch((error) => {
          console.log('erro ao deslogar ' + error)
        })
    }
  },
  mutations: {
    async setUser(state, user) {
      console.log(user.uid)
      const UserReq = await axios.get(
        `https://dozeroabeyondprojeto-yy4bt5tepq-uc.a.run.app/users/${user.uid}`,
        {
          headers: {
            Authorization: 'Bearer autenticado'
          }
        }
      )
      console.log(UserReq.data)
      state.currentUser = {
        cName: UserReq.data.name,
        cId: UserReq.data.id
      }
    },
    async NewUser(state, dates) {
      console.log('chegou aqui pra criar')
      console.log(dates)
      await axios
        .post(
          'https://dozeroabeyondprojeto-yy4bt5tepq-uc.a.run.app/users',
          {
            name: dates.name,
            email: dates.email,
            id: dates.id
          },
          {
            headers: {
              Authorization: 'Bearer autenticado'
            }
          }
        )
        .then(function(response) {
          console.log(response)
          console.log('deu certo, user foi registrado')
        })
        .catch(function(error) {
          console.log(error)
        })
      state.currentUser = { cName: dates.name, cId: dates.id }
      console.log('chegou aqui ' + state.currentUser.cName)
    },
    loginGoogle(state, user) {
      console.log(user.displayName)
      console.log(user.uid)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          axios
            .post(
              'https://dozeroabeyondprojeto-yy4bt5tepq-uc.a.run.app/users',
              {
                name: user.displayName,
                email: user.email
              },
              {
                headers: {
                  Authorization: 'Bearer autenticado'
                }
              }
            )
            .then(function(response) {
              console.log(response)
              console.log('deu certo, userG foi registrado')
            })
            .catch(function(error) {
              console.log(error)
            })

          state.currentUser = { cName: user.displayName, cId: user.uid }
          console.log('user encontrado:')
          console.log(state.currentUser)
        } else {
          console.log('else')
        }
      })
    }
  }
}

const post = {
  namespaced: true,
  state: {
    messages: [
      {
        name: 'Kamila Benevides',
        text: 'Olá'
      },
      {
        name: 'Kamila Benevides',
        text: 'Traga meu café'
      }
    ]
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async sendPost({ commit }, payload) {
      try {
        if (payload.file) {
          const upload = await storage
            .ref()
            .child(`${payload.from}` + `/` + `${+new Date()}`)
            .put(payload.file)
          payload.fileUrl = await upload.ref.getDownloadURL()
          payload.file = true
        }
        payload.createAt = timestamp
        console.log(payload)
        await axios
          .post(
            'https://dozeroabeyondprojeto-yy4bt5tepq-uc.a.run.app/posts',
            {
              name: payload.name,
              to: payload.to,
              from: payload.from,
              text: payload.text,
              file: payload.file,
              createAt: payload.createAt
            },
            {
              headers: {
                Authorization: 'Bearer autenticado'
              }
            }
          )
          .then(function(response) {
            console.log(response)
            console.log('deu certo, post foi registrado')
          })
          .catch(function(error) {
            console.log(error)
          })
      } catch (error) {
        console.log('quebrou aqui ' + error)
      }
    }
  },
  mutations: {}
}

const theme = {
  namespaced: true,
  state: {
    themeBox: false,
    themeColors: [
      {
        bar: 'grey darken-4',
        list: 'cyan darken-4',
        colorText: 'blue-grey darken-4',
        bottomIcon: 'purple darken-4'
      },
      {
        bar: 'deep-purple lighten-4',
        list: 'deep-orange lighten-3',
        colorText: 'white',
        bottomIcon: 'indigo darken-4'
      }
    ]
  },
  getters: {
    themeColors(state) {
      return state.themeColors[state.themeBox ? 1 : 0]
    }
  },
  actions: {
    change({ commit }, changes) {
      commit('changeTheme', changes)
    },
    setTheme({ commit }, payload) {
      commit('setThemeBox', payload)
    }
  },
  mutations: {
    changeTheme(state, change) {
      console.log(change)
      if (change === true) {
        state.themeNew = state.themeColors[1]
      } else {
        state.themeNew = state.themeColors[0]
      }
    },
    setThemeBox(state, payload) {
      state.themeBox = payload
    }
  }
}
const store = new Vuex.Store({
  modules: {
    users: users,
    post: post,
    theme: theme
  },
  plugins: [new VuexPersistence().plugin]
})

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/users',
    component: Users
  },
  {
    path: '/feed/:id',
    component: Feed
  }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
