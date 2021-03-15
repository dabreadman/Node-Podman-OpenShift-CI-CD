<template lang="html">
  <v-container>
    <v-row>
      <v-col align='center'>
        <h1 class='display-4'>Coronavirus total cases</h1>
        <h3 class='display-2 py-6'>Total Cases : <span class='orange--text'>{{stats.cases}}</span></h3>
        <h3 class='display-2 py-6'>Total Deaths : <span class='red--text'>{{stats.deaths}}</span></h3>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    //We use vue interpolations to pull the data from some source.
    //For now the source is hardcoded but this can also be called by an api
    //You could call the api in a method, which would be called the when the component enters the lifcycle
    //typically created()
    stats: {
      cases: null,
      deaths: null,
    },
    object: null,
  }),
  methods: {
    getData: function() {
      axios.get(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total`, {
        headers: {
          'x-rapidapi-key': 'XXXX',
          'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com'
        }
      })
      .then(response =>{
        //console.log(response)
        this.stats.cases = response.data.data.confirmed;
        this.stats.deaths = response.data.data.deaths;
        this.stats.recovered = response.data.data.recovered;
      })
      // .catch(e =>{
      //   console.log(e)
      // })
    }
  },
  created(){
    this.getData();
  }

}
</script>

<style lang="css" scoped>
</style>
