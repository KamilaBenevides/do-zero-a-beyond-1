<template>
  <v-app>
    <v-main>
      <v-app-bar :color="$store.getters['theme/themeColors'].bar">
        <h3>{{ socialMedia }}</h3>

        <v-spacer></v-spacer>
        <div>
          <v-btn
            @click.stop="dialog = true"
            class="d-flex flex-row-reverse"
            :color="$store.getters['theme/themeColors'].bottons"
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
              @click=";(dialog = false), addPost(socialMedia)"
            >
              Publicar
            </v-btn>
          </v-card>
        </v-dialog>
        <Limpar @comand-limpar="comandLimpar($event)" />
      </v-app-bar>

      <div v-show="!hidden" class="messages-container mb-15">
        <div v-for="(message, index) in reverseMessages" :key="index">
          <MessageCard
            v-if="message.name === socialMedia"
            :messageProp="message"
          />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import MessageCard from './MessageCard.vue'
import Limpar from './Limpar.vue'
export default {
  components: {
    MessageCard,
    Limpar
  },
  data() {
    return {
      dialog: false,
      fieldPost: ' ',
      hidden: false,
      currentUser: ' '
    }
  },
  computed: {
    reverseMessages() {
      const messageReverse = this.$store.state.post.messages
      return messageReverse.reverse()
    },
    socialMedia() {
      const user = this.$store.state.users.users.find(
        (u) => u.id === parseInt(this.$route.params.id)
      )
      return user.name
    }
  },
  methods: {
    addPost(nameUser) {
      let novoPost = {
        name: nameUser,
        text: this.fieldPost
      }
      console.log(novoPost)
      this.$store.dispatch('post/sendPost', novoPost)
    },
    comandLimpar(event) {
      this.hidden = event
    }
  },

  mounted() {}
}
</script>

<style scoped>
* {
  background-color: 'indigo darken-4';
}
</style>
