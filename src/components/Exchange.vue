<template>
  <v-container class="fill-height" fluid>
    <v-row justify="space-around">
      <v-col cols="12" md="9">
        <apexchart
            ref="realtimeChart"
            width="100%"
            height="100%"
            type="candlestick"
            :options="chartOptions"
            :series="series">
        </apexchart>
      </v-col>
      <v-col cols="3">
        <stock-list/>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="6">
        <own-orders-list :orders="ownOrders"/>
      </v-col>
      <v-col cols="3">
        <order-list :title="`Покупка акции ${stock}`" :orders="actualWTBOrders"
                    :own-orders="ownOrders"/>
      </v-col>
      <v-col cols="3">
        <order-list :title="`Продажа акции ${stock}`" :orders="actualWTSOrders"
                    :own-orders="ownOrders"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <order-form/>
      </v-col>
      <v-col cols="12" md="6">
        <balance/>
      </v-col>
    </v-row>
    <request-force-mode :is-open="Boolean(requestedForcedMode)"/>
  </v-container>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';

  import StockList from './list/StockList';
  import OrderList from './list/OrderList';
  import OwnOrdersList from './list/OwnOrdersList';
  import OrderForm from './OrderForm';
  import Balance from './Balance';
  import RequestForceMode from './dialog/RequestForceMode';

  export default {
    name: 'Exchange',
    components: {
      RequestForceMode,
      Balance,
      OrderForm,
      OwnOrdersList,
      OrderList,
      StockList,
    },
    data() {
      return {
        series: [{
          data: [],
        }],
        chartOptions: {
          chart: {
            id: 'economy-chart',
          },
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        },
      };
    },
    computed: {
      ...mapState('game', ['ownOrders', 'stock', 'requestedForcedMode', 'graph']),
      ...mapGetters('game', ['actualWTBOrders', 'actualWTSOrders', 'actualGraph']),
    },
    watch: {
      graph: {
        deep: true,
        handler() {
          this.series[0].data = this.graph.graph[this.stock]
            .map((point) => ({
              x: new Date(point.date),
              y: [point.open, point.max, point.min, point.close]
            }));

          this.$refs.realtimeChart.updateSeries([{
            data: this.series[0].data
          }], false, true);
        },
      },
    },
  };
</script>

<style scoped>

</style>