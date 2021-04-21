<!-- This Vue component will act as a overview box which shows information about the closed cases in Ireland. -->
<template lang="html">
  <v-card style="background: #4da6ff;">
    <v-row>
      <!-- We can now simply show information from the COVID-API after the API call. -->
      <v-col align="center">
        <h3 style="color:white;" class="display-1 py-6"><b>Closed Cases in Ireland</b></h3>
        <p style="color:white;" class="headline">Closed cases : {{ stats.closedCases }}</p>
        <p style="color:white;" class="headline">Recovered : {{ stats.recovered }}</p>
        <p style="color:white;" class="headline">Deaths : {{ stats.deaths }}</p>
        <!-- After pressing the "Get Data" button, we want to update the data shown. -->
        <v-btn @click="getData">Get Data</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  //Initially the data is not available.
  data: () => ({
    stats: {
      recovered: "N/A",
      deaths: "N/A",
      closedCases: "N/A"
    },
    object: null,
  }),
  methods: {
    //These values are dummy values to show before the API call is made.
    //If this shows for a long time, it means the API key is probably incorrect.
    getData() {
      this.stats.recovered = "Loading...";
      this.stats.deaths = "Loading...";
      this.stats.closedCases = "Loading...";
      axios
        .get(
          `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total`,
          {
            params: {
              country: "Ireland",
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          //We can do some simple string operations to give us the desired output.
          this.stats.recovered = response.data.data.recovered;
          this.stats.deaths = response.data.data.deaths;
          this.stats.closedCases = parseInt(this.stats.recovered) + parseInt(this.stats.deaths);
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="css" scoped>

</style>
