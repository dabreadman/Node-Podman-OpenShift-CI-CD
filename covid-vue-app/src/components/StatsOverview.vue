<template lang="html">
  <v-container>
    <v-row>
      <v-col align="center">
        <h3 id="theTitle" class="display-1 py-6">
          Around the world, COVID-19 has infected <span class="orange--text">{{ stats.cases }}</span> people 
          and it has taken <span class="red--text">{{ stats.deaths }}</span> lives.
        </h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    stats: {
      cases: "...",
      deaths: "...",
    },
    object: null,
  }),
  methods: {
    getData() {
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
          {
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          // console.log(response);
          this.stats.cases = response.data.data.confirmed;
          this.stats.deaths = response.data.data.deaths;
          this.stats.recovered = response.data.data.recovered;
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
