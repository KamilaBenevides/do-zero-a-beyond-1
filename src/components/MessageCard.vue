<template>
  <v-card
    v-show="!hidden"
    outlined
    elevation="3"
    :dark="!$store.state.theme.themeBox"
    class="ma-2"
    :color="$store.getters['theme/themeColors'].list"
  >
    <v-card-subtitle class="font-weight-bold d-flex">
      {{ messageProp.name }}

      <v-spacer></v-spacer>
      <v-icon :dark="!$store.state.theme.themeBox" @click.stop="dialog = true"
        >mdi-pencil</v-icon
      >
      <v-icon :dark="!$store.state.theme.themeBox" @click="deletePost()"
        >mdi-delete</v-icon
      >
    </v-card-subtitle>

    <v-card-text>
      {{ messageProp.text }}
      <v-img v-if="messageProp.file" :src="src" />
    </v-card-text>
    <h6 class="d-flex align-end justify-end ma-1">
      {{ getData }}
    </h6>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-text-field
          @keyup.enter="edit(), (dialog = false)"
          :color="$store.getters['theme/themeColors'].bottomIcon"
          v-model="fieldEdit"
          class="ma-3"
        >
        </v-text-field>
        <v-card-actions>
          <v-btn
            :color="$store.getters['theme/themeColors'].bottomIcon"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            :color="$store.getters['theme/themeColors'].bottomIcon"
            text
            @click=";(dialog = false), edit()"
          >
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
const axios = require('axios').default
export default {
  data() {
    return {
      dialog: false,
      fieldEdit: ' ',
      hidden: false,
      dataHora: {},
      src: this.messageProp.fileUrl
    }
  },
  props: {
    messageProp: {
      type: Object,
      required: true
    }
  },
  methods: {
    async edit() {
      console.log(this.messageProp)
      await axios
        .put(
          `https://dozeroabeyondprojeto-yy4bt5tepq-uc.a.run.app/posts/${this.messageProp.id}`,
          {
            text: this.fieldEdit
          },
          {
            headers: {
              Authorization: 'Bearer autenticado'
            }
          }
        )
        .then(function(response) {
          console.log(response)
          console.log('deu certo, post foi registrado')
        })
        .catch(function(error) {
          console.log(error)
        })
      this.fieldEdit = ' '
    },
    async deletePost() {
      await axios
        .delete(
          `https://dozeroabeyondprojeto-yy4bt5tepq-uc.a.run.app/posts/${this.messageProp.id}`,
          {
            headers: {
              Authorization: 'Bearer autenticado'
            }
          }
        )
        .then(function(response) {
          console.log(response)
          console.log('deu certo, post foi registrado')
        })
        .catch(function(error) {
          console.log(error)
        })
      this.fieldEdit = ' '
    }
  },
  computed: {
    themeBox: {
      get() {
        return this.$store.state.theme.themeBox
      },
      set(nv) {
        this.$store.dispatch('theme/setTheme', nv)
      }
    },
    getData: function() {
      let hoje = new Date(),
        dataHora = {
          dia: hoje.getDate(),
          mes: hoje.getMonth(),
          ano: hoje.getFullYear(),
          hora: hoje.getHours(),
          min: hoje.getMinutes()
        }
      return (
        dataHora.dia +
        '/' +
        (dataHora.mes + 1) +
        '/' +
        dataHora.ano +
        ' - ' +
        dataHora.hora +
        ':' +
        dataHora.min
      )
    }
  }
}
</script>
