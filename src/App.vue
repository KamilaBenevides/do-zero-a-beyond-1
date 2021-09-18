<template>
  <v-app>
    <v-main>
      <v-app-bar color="deep-purple lighten-4">
        <v-avatar class="ma-3">
          <img src="./assets/Kamila.jpeg" />
        </v-avatar>
        <h3>{{ socialMedia }}</h3>

        <v-spacer></v-spacer>
        <div>
          <v-btn
            @click.stop="dialog = true"
            class="d-flex flex-row-reverse"
            color="purple darken-4"
            fab
            small
            dark
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title>Novo Post</v-card-title>
            <v-text-field
              v-model="fieldPost"
              class="ma-3"
              color="purple darken-4"
            >
            </v-text-field>
            <v-btn color="purple darken-4" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn
              color="purple darken-4"
              text
              @click=";(dialog = false), addPost(fieldPost)"
            >
              Publicar
            </v-btn>
          </v-card>
        </v-dialog>
        <Limpar @comand-limpar="comandLimpar($event)" />
      </v-app-bar>

      <div v-show="!hidden" class="messages-container mb-15">
        <div v-for="(message, index) in messages" :key="index">
          <MessageCard :messageProp="message" />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import MessageCard from './components/MessageCard.vue'
import Limpar from './components/Limpar.vue'
export default {
  components: {
    MessageCard,
    Limpar
  },
  data() {
    return {
      socialMedia: 'MilaBook',
      dialog: false,
      fieldPost: ' ',
      hidden: false,
      messages: [
        {
          name: 'Kamila Benevides',
          text: 'Olá'
        },
        {
          name: 'Kamila Benevides',
          text: 'Me traga mais caféeee'
        }
      ]
    }
  },
  computed: {},
  methods: {
    addPost(fieldPost) {
      let post = {
        name: 'Kamila Benevides',
        text: fieldPost
      }
      this.messages.push(post)
      this.fieldPost = ' '
    },
    comandLimpar(event) {
      this.hidden = event
    }
  },

  mounted() {}
}
</script>

<style scoped></style>
