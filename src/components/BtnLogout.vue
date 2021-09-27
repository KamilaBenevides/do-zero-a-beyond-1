<template>
  <v-btn :dark="!$store.state.theme.themeBox" rounded small @click="logout()"
    >Sair</v-btn
  >
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('users/logout')
    }
  }
}
</script>
