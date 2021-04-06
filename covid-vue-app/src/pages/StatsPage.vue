<template lang="html">
  <v-container class="py-12 height_class">
    <h1>This is the Stats page</h1>
     <BarChart
      class="chart"
      :data-set="data"
      :margin-left="40"
      :margin-top="40"
      :tick-count="5"
      :bar-padding="0.5"
    />
    <Overview></Overview>
  </v-container>
</template>


<script>
  import BarChart from "@/components/BarChart.vue";

  export default {
    name: "home",
    data() {
      return {
        data: [
          ["Ireland", 33],
          ["UK", 24],
          ["Italy", 22],
          ["Germany", 29],
          ["France", 38],
          ["Portugal", 21],
          ["Spain", 25],
          ["Norway", 30],
        ],
      };
    },
    components: {
      BarChart,
    },
  };
</script>

<style lang="scss" scoped>
  .chart {
    margin: 40px auto 0;
    display: block;
  }
</style>

