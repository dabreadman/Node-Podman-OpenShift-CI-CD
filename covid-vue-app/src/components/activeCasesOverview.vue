<!-- This Vue component will act as a overview box which shows information about the active cases in Ireland. -->
<template lang="html">
  <v-card style="background: #4da6ff;">
    <v-row>
      <!-- We can now simply show information from the COVID-API after the API call. -->
      <v-col align="center">
        <h3 style="color:white;" class="display-1 py-6"><b>Active Cases in Ireland</b></h3>
        <p style="color:white;" class="headline">Currently infected : {{ stats.infected }}</p>
        <p style="color:white;" class="headline">Last Checked : {{ stats.checked }}</p>
        <p style="color:white;" class="headline">Last Reported : {{ stats.reported }}</p>
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
      infected: "N/A",
      checked: "N/A",
      reported: "N/A"
    },
    object: null,
  }),
  methods: {
    //These values are dummy values to show before the API call is made.
    //If this shows for a long time, it means the API key is probably incorrect.
    getData() {
      this.stats.infected = "Loading...";
      this.stats.checked = "Loading...";
      this.stats.reported = "Loading...";
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
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
          //We can do some simple string concatenation to give us the desired output.
          this.stats.infected = response.data.data.confirmed;
          this.stats.checked = response.data.data.lastChecked.substring(0,10) + " at " + response.data.data.lastChecked.substring(11,16);
          this.stats.reported = response.data.data.lastReported.substring(0,10) + " at " + response.data.data.lastReported.substring(11,16);
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
