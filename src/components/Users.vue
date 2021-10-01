<template>
  <v-app :class="colorBack(themeBox)">
    <v-card class="overflow-hidden">
      <v-app-bar
        :dark="!$store.state.theme.themeBox"
        prominent
        :color="$store.getters['theme/themeColors'].bar"
      >
        <v-app-bar-title>
          <h5>Olá, {{ currentUser }}</h5>
          <br />
          <h3>Bem-vindo ao MilaBook</h3>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <div class="d-flex align-end flex-column">
          <v-checkbox
            class="ma-3"
            :color="$store.getters['theme/themeColors'].bottons"
            v-model="themeBox"
            label="Alterar tema"
          ></v-checkbox>
          <BtnLogout />
        </div>
      </v-app-bar>
    </v-card>
    <v-sheet>
      <v-list :color="$store.getters['theme/themeColors'].list">
        <v-list-item
          :dark="!$store.state.theme.themeBox"
          v-for="user of usuarios"
          :key="user.id"
          @click="goToUser(user.id)"
        >
          <v-list-item-title>
            {{ user.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-app>
</template>

<script>
import BtnLogout from './BtnLogout.vue'
const axios = require('axios').default

export default {
  components: {
    BtnLogout
  },
  data() {
    return {
      usuarios: []
    }
  },
  computed: {
    themeBox: {
      get() {
        return this.$store.state.theme.themeBox
      },
      set(nv) {
        this.$store.dispatch('theme/setTheme', nv)
      }
    },
    currentUser() {
      return this.$store.state.users.currentUser.cName
    }
  },
  methods: {
    colorBack(t) {
      return t ? 'backL' : 'backD'
    },
    goToUser(user) {
      this.$router.push('/feed/' + user)
    },
    changeTheme() {
      return this.$store.dispatch('theme/change', true)
    }
  },
  async mounted() {
    const usersReq = await axios.get(
      'https://dozeroabeyondprojeto-yy4bt5tepq-uc.a.run.app/users',
      {
        headers: {
          Authorization: 'Bearer autenticado'
        }
      }
    )
    this.usuarios = usersReq.data
  }
}
</script>
<style scoped>
.backL {
  --colorBack: #ffab91;
  background-color: var(--colorBack);
}
.backD {
  --colorBack: #006064;
  background-color: var(--colorBack);
}
</style>
