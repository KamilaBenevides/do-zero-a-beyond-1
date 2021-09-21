import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Feed from '../src/components/Feed.vue'
import Users from '../src/components/Users.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

const users = {
  namespaced: true,
  state: {
    users: [
      {
        avatar: '../assets/Kamila.jpeg', //avatar a gente tenta na prox
        name: 'Kamila Benevides',
        id: 0
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        name: 'Isaac Benevides',
        id: 1
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        name: 'Miguel Almeida',
        id: 2
      }
    ]
  },
  actions: {},
  mutations: {}
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
    sendPost({ commit }, payload) {
      commit('addPost', payload)
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
        bar: 'deep-purple darken-4',
        list: 'blue darken-1',
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
