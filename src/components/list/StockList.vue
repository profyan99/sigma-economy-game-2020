<template>
  <v-card class="mx-auto" tile>
    <v-toolbar dense flat color="grey lighten-3">
      <v-toolbar-title>Тип акции</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list dense>
      <v-list-item-group v-model="stock" color="deep-purple">
        <v-list-item
            v-for="(stock, i) in stocks"
            :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="stock.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: 'StockList',
    data() {
      return {
        stock: 0,
        stocks: [
          { name: 'ЧГК' },
          { name: 'Полигон' },
          { name: 'Интеллектуальное казино' },
          { name: 'КаНоБу' },
        ],
      };
    },
    watch: {
      stock() {
        this.$emit('stock', this.stocks[this.stock].name);
      },
    },
  };
</script>

<style scoped>

</style>