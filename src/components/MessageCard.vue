<template>
  <v-card v-show="!hidden" outlined class="ma-2" color="deep-orange lighten-3">
    <v-card-subtitle class="font-weight-bold d-flex">
      {{ messageProp.name }}

      <v-spacer></v-spacer>
      <v-icon @click.stop="dialog = true">mdi-pencil</v-icon>
      <v-icon @click="hidden = !hidden">mdi-delete</v-icon>
    </v-card-subtitle>

    <v-card-text>
      {{ messageProp.text }}
    </v-card-text>
    <h6 class="d-flex align-end justify-end ma-1">{{ getData }}</h6>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-text-field
          @keyup.enter="edit(), (dialog = false)"
          color="purple darken-4"
          v-model="fieldEdit"
          class="ma-3"
        >
        </v-text-field>
        <v-card-actions>
          <v-btn color="purple darken-4" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn
            color="purple darken-4"
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
export default {
  data() {
    return {
      dialog: false,
      fieldEdit: ' ',
      hidden: false,
      dataHora: {}
    }
  },
  props: {
    messageProp: {
      type: Object,
      required: true
    }
  },
  methods: {
    edit() {
      let edited = this.fieldEdit
      this.messageProp.text = edited
    }
  },
  computed: {
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
