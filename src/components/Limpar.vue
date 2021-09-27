<template>
  <v-btn
    @click="limpar()"
    class="mx-2"
    :dark="!$store.state.theme.themeBox"
    small
    fab
    :color="$store.getters['theme/themeColors'].bottons"
  >
    <v-icon>mdi-delete</v-icon>
  </v-btn>
</template>
<script>
export default {
  data() {
    return {
      bool: false
    }
  },
  methods: {
    limpar() {
      this.bool = true
      this.$emit('comand-limpar', this.bool)
    }
  }
}
</script>
