<template>
  <div class="text-center">
    <v-dialog
        v-model="isOpen"
        width="500"
    >
      <v-card outlined tile min-width="250px">
        <v-toolbar dense flat color="grey lighten-3">
          <v-toolbar-title>Изменение заказа #{{ orderId }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <base-order-form @submit="confirmEditing">
            <template #button>
              Изменить
            </template>
          </base-order-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import BaseOrderForm from '../BaseOrderForm';

  export default {
    name: 'EditOrderDialog',
    components: {
      BaseOrderForm,
    },
    props: {
      orderId: {
        required: true,
      },
    },
    methods: {
      ...mapActions('game', ['editOrder']),
      confirmEditing(form) {
        this.editOrder({
          ...form,
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
          return Boolean(this.orderId);
        },
      },
    },
  };
</script>

<style scoped>

</style>