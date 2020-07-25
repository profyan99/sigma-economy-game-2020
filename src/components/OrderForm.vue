<template>
  <v-card class="mx-auto" tile>
    <v-card-text>
      <v-row justify="space-around">
        <v-card outlined tile min-width="250px">
          <v-toolbar dense flat color="grey lighten-3">
            <v-toolbar-title>Купить акции {{ stock }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <base-order-form @submit="buy">
              <template #button>
                Купить
              </template>
            </base-order-form>
          </v-card-text>
        </v-card>
        <v-card outlined tile min-width="250px">
          <v-toolbar dense flat color="grey lighten-3">
            <v-toolbar-title>Продать акции {{ stock }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <base-order-form @submit="sell">
              <template #button>
                Продать
              </template>
            </base-order-form>
          </v-card-text>
        </v-card>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import BaseOrderForm from './BaseOrderForm';

  export default {
    name: 'OrderForm',
    components: {
      BaseOrderForm,
    },
    computed: {
      ...mapState('game', ['stock']),
    },
    methods: {
      ...mapActions('game', ['buyOrder', 'sellOrder']),
      async buy({ amount, price }) {
        await this.buyOrder({
          amount: parseInt(amount),
          price: parseFloat(price),
          WTS: false,
          type: this.stock,
          forced: false,
        });
      },
      async sell({ amount, price }) {
        await this.sellOrder({
          amount,
          price,
          WTS: true,
          type: this.stock,
          forced: false,
        });
      },
    },
  };
</script>

<style scoped>

</style>