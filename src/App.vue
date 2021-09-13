<template>
  <v-app>
    <v-main>
      <v-app-bar color="green">{{ nome }}</v-app-bar>
      <div class="messages-container">
        <div v-for="(message, index) in messages" :key="index">
          <v-card
            outlined
            class="ma-3"
            :class="message.name == 'Eu' ? 'purple lighten-2' : 'teal accent-4'"
          >
            <v-card-subtitle class="font-weight-bold">{{
              message.name
            }}</v-card-subtitle>
            <v-card-text>{{ message.text }}</v-card-text>
          </v-card>
        </div>
      </div>
      <v-app-bar color="#424242" fixed bottom>
        <v-text-field
          @keyup.enter="sendMessage()"
          v-model="campo_text"
          solo
          hide-details
          label="Enviar mensagem..."
        ></v-text-field>
        <v-btn @click="sendMessage()" x-large icon color="blue">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-app-bar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      nome: 'kamila',
      messages: [
        {
          name: 'Kamila Benevides',
          text: 'Olá'
        },
        {
          name: 'Kamila Benevides',
          text: 'Turu bem?'
        }
      ],
      campo_text: ''
    }
  },
  methods: {
    sendMessage() {
      let message = {
        name: 'Eu',
        text: this.campo_text
      }
      this.messages.push(message)
      this.campo_text = ''
    }
  },
  mounted() {}
}
</script>

<style scoped></style>
