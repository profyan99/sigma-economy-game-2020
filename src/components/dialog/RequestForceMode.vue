<template>
  <div class="text-center">
    <v-dialog
        v-model="isOpen"
        width="500"
    >
      <v-card outlined tile min-width="250px">
        <v-toolbar dense flat color="grey lighten-3">
          <v-toolbar-title>Внимание</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          {{ requestedForcedMode }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              depressed
              @click="onRejectForced"
          >
            Отмена
          </v-btn>
          <v-btn
              depressed
              color="error"
              @click="onConfirmForced"
          >
            Продолжить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'RequestForceMode',
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
    computed: {
      ...mapState('game', ['requestedForcedMode']),
    },
    methods: {
      ...mapActions('game', ['onConfirmForced', 'onRejectForced']),
    },
  };
</script>

<style scoped>

</style>