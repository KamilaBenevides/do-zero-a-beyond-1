<template>
  <v-app>
    <v-card>
      <v-app-bar :color="$store.getters['theme/themeColors'].bar">
        <h3>
          MilaBook
        </h3>
        <v-spacer></v-spacer>
        <v-checkbox
          class="ma-3 my-3"
          :color="$store.getters['theme/themeColors'].bottons"
          v-model="themeBox"
          label="Alterar tema"
        ></v-checkbox>
      </v-app-bar>
      <v-list :color="$store.getters['theme/themeColors'].list">
        <v-list-item
          v-for="user of $store.state.users.users"
          :key="user.id"
          @click="goToUser(user)"
        >
          <v-list-item-title>
            {{ user.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    themeBox: {
      get() {
        return this.$store.state.theme.themeBox
      },
      set(nv) {
        this.$store.dispatch('theme/setTheme', nv)
      }
    }
  },
  methods: {
    goToUser(user) {
      this.$router.push('/feed/' + user.id)
    },
    changeTheme() {
      return this.$store.dispatch('theme/change', true)
    }
  }
}
</script>
