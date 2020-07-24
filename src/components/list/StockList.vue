<template>
  <v-card class="mx-auto" tile>
    <v-toolbar dense flat color="grey lighten-3">
      <v-toolbar-title>Тип акции</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list dense>
      <v-list-item-group v-model="stock" color="deep-purple">
        <v-list-item
            v-for="(stock, i) in stockList"
            :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="stock"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'StockList',
    data() {
      return {
        stock: 0,
      };
    },
    methods: {
      ...mapActions('game', ['setStock']),
    },
    computed: {
      ...mapState('game', ['stockList']),
    },
    watch: {
      stock() {
        this.setStock(this.stockList[this.stock]);
      },
    },
  };
</script>

<style scoped>

</style>