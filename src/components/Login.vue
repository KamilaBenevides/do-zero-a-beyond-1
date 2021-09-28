<template>
  <v-app>
    <v-card elevation="0">
      <v-toolbar dense>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Faça LogIn</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <form class="pa-10">
        <v-text-field v-model="email" label="E-mail" required></v-text-field>
        <v-text-field v-model="password" label="senha" required></v-text-field>
        <v-btn class="mr-4" @click="login">
          Login
        </v-btn>
        <v-btn @click="loginGoogle" class="mr-4" color="red"
          >Login com Google</v-btn
        >
        <v-btn color="deep-purple lighten-4" @click.stop="dialog = true">
          Criar nova conta
        </v-btn>
      </form>
      <v-dialog v-model="dialog" max-width="500">
        <v-card class="pa-2">
          <v-card-title>
            Criar nova conta
          </v-card-title>
          <v-text-field v-model="nome" label="Seu nome" required></v-text-field>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="confEmail"
            label="confirme seu E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Senha"
            required
          ></v-text-field>
          <v-card-actions>
            <v-btn color="purple darken-4" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn
              color="purple darken-4"
              text
              @click=";(dialog = false), createAcc()"
            >
              Criar nova conta
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-app>
</template>
<script>
// import { validationMixin } from 'vuelidate'
// import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    password: '',
    email: '',
    confEmail: '',
    nome: '',
    select: null,
    dialog: false
  }),

  computed: {},

  methods: {
    async login() {
      let authUser = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('users/authenticate', authUser)
    },
    async loginGoogle() {
      this.$store.dispatch('users/authenticateGoogle', {})
    },
    async createAcc() {
      console.log('criando conta')
      if (this.email === this.confEmail) {
        this.$store.dispatch('users/create', {
          email: this.email,
          password: this.password,
          name: this.nome
        })
      }
    }
  }
}
</script>
