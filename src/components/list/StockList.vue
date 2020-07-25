<template>
  <v-card class="mx-auto" tile>
    <v-toolbar dense flat color="grey lighten-3">
      <v-toolbar-title>Тип акции</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list dense>
      <v-list-item-group v-model="currentStock" color="deep-purple">
        <v-list-item
            v-for="(stock, i) in stockList"
            :key="i"
            @click="setStock(stock)"
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
    methods: {
      ...mapActions('game', ['setStock']),
    },
    computed: {
      ...mapState('game', ['stockList', 'stock']),
      currentStock: {
        get() {
          return this.stockList.indexOf(this.stock);
        },
        async set(val) {
          await this.setStock(this.stockList[val]);
        },
      }
    },
  };
</script>

<style scoped>

</style>