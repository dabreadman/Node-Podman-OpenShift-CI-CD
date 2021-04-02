<template>
  <div class="home">
    <BarChart
      class="chart"
      :data-set="data"
      :margin-left="40"
      :margin-top="40"
      :tick-count="5"
      :bar-padding="0.5"
    />
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  .chart {
    margin: 40px auto 0;
    display: block;
  }
</style>