<template lang="html">
  <v-card style="background: #4da6ff;">
    <v-row>
      <v-col align="center">
        <h3 style="color:white;" class="display-1 py-6"><b>Active Cases in Ireland</b></h3>
        <p style="color:white;" class="headline">Currently infected : {{ stats.infected }}</p>
        <p style="color:white;" class="headline">Last Checked : {{ stats.checked }}</p>
        <p style="color:white;" class="headline">Last Reported : {{ stats.reported }}</p>
        <v-btn @click="getData">Get Data</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    stats: {
      infected: "N/A",
      checked: "N/A",
      reported: "N/A"
    },
    object: null,
  }),
  methods: {
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
