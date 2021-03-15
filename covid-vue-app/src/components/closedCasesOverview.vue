<template lang="html">
  <v-card>
    <v-card-title>Closed Cases</v-card-title>
    <v-row>
      <v-col align="center">
        <p class="headline">Closed cases : {{ stats.closedCases }}</p>
        <p class="headline">Of which recovered : {{ stats.recovered }}</p>
        <p class="headline">Deaths : {{ stats.deaths }}</p>
        <v-btn @click="getData">Get Data</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    //We use vue interpolations to pull the data from some source.
    //For now the source is hardcoded but this can also be called by an api
    //You could call the api in a method, which would be called the when the component enters the lifcycle
    //typically created()
    stats: {
      closedCases: "96,724,188",
      recovered: "94,097,090",
      deaths: "2,627,098",
    },
  }),
  methods: {
    getData: function () {
      axios.get(
        `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total`,
        {
          params: {
            country: "Canada",
          },
          headers: {
            "x-rapidapi-key": "XXXXXX",
            "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          },
        }
      );
      // .then(response =>{
      //   console.log(response.data)
      // }).catch(e =>{
      //   console.log(e)
      // })
    },
  },
};
</script>

<style lang="css" scoped></style>
