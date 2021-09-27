<template>
  <v-app>
    <v-main :class="colorBack(!themeBox)">
      <v-app-bar
        :dark="!$store.state.theme.themeBox"
        prominent
        :color="$store.getters['theme/themeColors'].bar"
      >
        <v-app-bar-title>
          <h5>Olá, {{ currentUser }}</h5>
          <br />
          <h3>{{ socialMedia }}</h3>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <div class="d-flex align-end">
          <v-btn
            @click.stop="dialog = true"
            class="d-flex flex-row-reverse"
            :color="$store.getters['theme/themeColors'].bottons"
            fab
            small
            :dark="!$store.state.theme.themeBox"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>

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
        </div>
        <div class="d-flex align-end justify-end ma-1">
          <BtnLogout />
        </div>
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
import BtnLogout from './BtnLogout.vue'

export default {
  components: {
    MessageCard,
    Limpar,
    BtnLogout
  },
  data() {
    return {
      dialog: false,
      fieldPost: ' ',
      hidden: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.users.currentUser
    },
    reverseMessages() {
      const messageReverse = this.$store.state.post.messages
      return messageReverse.reverse()
    },
    socialMedia() {
      const user = this.$store.state.users.users.find(
        (u) => u.id === parseInt(this.$route.params.id)
      )
      if (user === undefined) {
        const user2 = this.$store.state.users.users.find(
          (u) => u.id === this.$route.params.id
        )
        return user2.name
      }
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
    },
    colorBack(t) {
      return t ? 'backL' : 'backD'
    }
  },

  mounted() {}
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
