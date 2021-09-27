import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import { auth, firestore, timestamp, storage } from './config/firebase'
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth'

import Feed from '../src/components/Feed.vue'
import Users from '../src/components/Users.vue'
import Login from '../src/components/Login.vue'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Vuelidate)

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
    currentUser: ' '
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    create({ commit }, payload) {
      const { email, password, name } = payload
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res)
          commit('NewUser', name)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // eslint-disable-next-line no-unused-vars
    authenticate({ commit }, payload) {
      const { email, password } = payload
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res.user)
          commit('setUser', res.user)

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
    setUser(state, user) {
      state.loggedUser = user
      state.users.forEach((element) => {
        console.log(element.id + ' === ' + user.uid)
        if (element.id === user.uid) {
          state.currentUser = element.name
        }
      })

      console.log('ver oq é isso: ' + user.uid)
    },
    NewUser(state, name) {
      console.log('chegou aqui pra criar')
      let addUser = {
        name: name,
        id: state.countId
      }
      state.countId += 1
      state.users.push(addUser)
      state.currentUser = name
      console.log('chegou aqui oia' + state.currentUser)
    },
    loginGoogle(state, user) {
      console.log(user.displayName)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          state.currentUser = user.displayName
          console.log('user encontrado:')
          console.log(state.currentUser)
          let flag = 0 //sorry o pog
          for (let u = 0; u < state.users.length; u++) {
            flag += 1
            if (state.users[u].name === user.displayName) {
              console.log('achou igual')
            }
            if (flag == u) {
              let addUser = {
                name: user.displayName,
                id: user.uid
              }
              console.log('criou e entrou')
              state.users.push(addUser)
              break
            }
          }
        } else {
          console.log('erro')
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
        await firestore.collection('posts').add(payload)
        console.log('deu cert, post foi')
      } catch (error) {
        console.log('quebrou aqui ' + error)
      }
      //commit('addPost', payload)
    }
  },
  mutations: {
    addPost(state, messages) {
      state.messages.push(messages)
    }
  }
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
