<template>
  <v-app>
    <v-main class="backL">
      <v-app-bar
        :dark="!$store.state.theme.themeBox"
        prominent
        :color="$store.getters['theme/themeColors'].bar"
      >
        <v-app-bar-title>
          <h5>Olá, {{ this.$store.state.users.currentUser.cName }}</h5>
          <br />
          <h3>{{ usuario.name }}</h3>
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
              <v-file-input v-model="file" truncate-length="15"></v-file-input>
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
                @click=";(dialog = false), addPost()"
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
        <div v-for="(message, index) in posts" :key="index">
          <MessageCard :messageProp="message" />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import MessageCard from './MessageCard.vue'
import Limpar from './Limpar.vue'
import BtnLogout from './BtnLogout.vue'
const axios = require('axios').default
export default {
  components: {
    MessageCard,
    Limpar,
    BtnLogout
  },
  data() {
    return {
      dialog: false,
      fieldPost: '',
      hidden: false,
      posts: [],
      usuario: ' ',
      file: null,
      socialMedia: ' ',
      componentKey: 0
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.users.currentUser.cName
    }
  },
  methods: {
    addPost() {
      let novoPost = {
        name: this.$store.state.users.currentUser.cName,
        to: this.$route.params.id,
        from: this.$store.state.users.currentUser.cId,
        text: this.fieldPost,
        file: this.file
      }
      console.log(novoPost)
      this.$store.dispatch('post/sendPost', novoPost)
      this.componentKey += 1
    },
    comandLimpar(event) {
      this.hidden = event
    },
    colorBack(t) {
      return t ? 'backL' : 'backD'
    }
  },
  async created() {
    const PostReq = await axios.get(
      `http://localhost:8081/users/${this.$route.params.id}`,
      {
        headers: {
          Authorization: 'Bearer autenticado'
        }
      }
    )
    this.usuario = PostReq.data
    console.log('testando = ', this.usuario)
  },
  async mounted() {
    const PostReq = await axios.get(
      `http://localhost:8081/posts/${this.$route.params.id}`,
      {
        headers: {
          Authorization: 'Bearer autenticado'
        }
      }
    )
    this.posts = PostReq.data
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
