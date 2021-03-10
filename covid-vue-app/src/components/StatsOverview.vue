<template lang="html">
  <v-container>
    <v-row>
      <v-col align='center'>
        <h1 class='display-4'>Coronavirus total cases</h1>
        <h3 class='display-2 py-6'>Total Cases : <span class='orange--text'>{{stats.cases}}</span></h3>
        <h3 class='display-2 py-6'>Total Deaths : <span class='red--text'>{{stats.deaths}}</span></h3>
        <h3 class='display-2 py-6'>Total Recovered : <span class='green--text'>{{stats.recovered}}</span></h3>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data: () => ({
    //We use vue interpolations to pull the data from some source.
    //For now the source is hardcoded but this can also be called by an api
    //You could call the api in a method, which would be called the when the component enters the lifcycle
    //typically created()
    stats: {
      cases: '118462833',
      deaths: '2626994',
      recovered: '94084811'
    }
  }),
}
</script>

<style lang="css" scoped>
</style>
