<template>
  <v-app-bar color="#424242" bottom fixed>
    <v-text-field
      @keyup.enter="send()"
      v-model="field"
      solo
      hide-details
      label="Enviar mensagem..."
    ></v-text-field>
    <v-btn @click="send()" x-large icon color="blue">
      <v-icon>mdi-send</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      field: ' '
    }
  },
  methods: {
    send() {
      let message = {
        name: 'Eu',
        text: this.field
      }
      this.$emit('send-message', message)
      this.field = ' '
    }
  }
}
</script>
<style scoped>
.message-card {
  border: 3px solid red;
}
</style>
