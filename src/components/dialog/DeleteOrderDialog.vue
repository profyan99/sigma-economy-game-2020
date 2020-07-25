<template>
  <div class="text-center">
    <v-dialog
        v-model="isOpen"
        width="500"
    >
      <v-card outlined tile min-width="250px">
        <v-toolbar dense flat color="grey lighten-3">
          <v-toolbar-title>Удаление заказа #{{ orderId }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          Вы действительно хотите удалить заказ #{{ orderId }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              depressed
              @click="$emit('end')"
          >
            Нет
          </v-btn>
          <v-btn
              depressed
              color="error"
              @click="confirmRemoving"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: 'DeleteOrderDialog',
    props: {
      orderId: {
        required: true,
      },
    },
    methods: {
      ...mapActions('game', ['removeOrder']),
      confirmRemoving() {
        this.removeOrder({
          orderId: this.orderId,
        });
        this.$emit('end');
      },
    },
    computed: {
      isOpen: {
        set() {
          this.$emit('end');
        },
        get() {
          return this.orderId !== -1;
        },
      },
    },
  };
</script>

<style scoped>

</style>