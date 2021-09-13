<template>
  <v-app>
    <v-main>
      <v-app-bar color="green">{{ firstName }}</v-app-bar>
      <div class="messages-container">
        <div v-for="(message, index) in messages" :key="index">
          <MessageCard :messageProp="message" />
        </div>
      </div>
      <BottomBar @send-message="addMessage($event)" />
    </v-main>
  </v-app>
</template>

<script>
import MessageCard from './components/MessageCard.vue'
import BottomBar from './components/BottomBar.vue'
export default {
  components: {
    MessageCard,
    BottomBar
  },
  data() {
    return {
      nome: 'kamila Benevides',
      messages: [
        {
          name: 'Kamila Benevides',
          text: 'Olá'
        },
        {
          name: 'Kamila Benevides',
          text: 'Turu bem?'
        }
      ]
    }
  },
  computed: {
    firstName() {
      console.log('entrou na função')
      return this.nome.split(' ')[0]
    }
  },
  methods: {
    addMessage(event) {
      this.messages.push(event)
    }
  },
  mounted() {}
}
</script>

<style scoped></style>
