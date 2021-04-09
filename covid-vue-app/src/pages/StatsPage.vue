<template lang="html">
  <v-container class="py-12 height_class">
    <v-col align="center">
        <b><h3 class="display-1 py-6" style="color:black;">Visualize the impact of COVID-19.</h3></b>
        <br />
        <div style="width:50%; align:center;">
            <multiselect
            :options="options"
             v-model="selected">
            </multiselect>
       </div>
       <br />
       <v-btn @click="getData(); getPopulation();">Render Latest Information</v-btn>
    </v-col>
    <zingchart :data=" { type: 'bar', title: { text: 'Covid-19 Visualization for '.concat(this.selected), }, scaleX: { labels: ['Deaths', 'Recovered Cases', 'Confirmed Cases'] }, plotarea: { marginLeft:'dynamic', marginRight:'dynamic' }}" :series="[{values: [this.stats.deaths,this.stats.recovered,this.stats.confirmed,]}]" ></zingchart>
    <v-col align="center">
        <p style="align: center;">In the location of <u>{{this.selected}}</u> with a total population of <u>{{this.stats.population }}</u> there has been a reported death count of <u>{{ this.stats.deaths}}</u>, the number of recovered cases is said to be <u>{{ this.stats.recovered}}</u> and the number of confirmed cases has reached <u>{{ this.stats.confirmed}}</u>.</p>
    </v-col>
    <br />
    <zingchart :data="secondPlot" :series="[{ values: [this.stats.population-this.stats.recovered-this.stats.confirmed], text: 'Uninfected Population', backgroundColor: '#4CD77A', detached: true }, { values: [this.stats.confirmed] , text: 'Currently Infected Population',  backgroundColor: '#FF0000', detached: true }, { values: [this.stats.recovered], text: 'Recovered Population', backgroundColor: '#B600FF', detached: true}]"></zingchart>
  </v-container>
 
</template>

<script>
import "zingchart";
import zingchartVue from "zingchart-vue";
import Multiselect from "vue-multiselect";
import axios from "axios";
export default {
  data() {
        return {
            secondPlot: {
                type: "pie3d",
                legend: {
                  align: "right",
                },
                title: {
                  text: "Population statistics",
                },
                scaleX: {
                  labels: ["Deaths", "Recovered Cases", "Confirmed Cases"]
                },
                plotarea: {
                  marginTop:"dynamic",
                  marginLeft:"dynamic",
                  marginRight:"dynamic"
                }
            },
            stats: {
                 recovered: "N/A",
                 deaths: "N/A",
                 confirmed: "N/A",
                 population: "N/A"
            },
            selected: "Brazil",
            options: ["Brazil", "France", "India", "Ireland", "Italy", "Russia", "Spain", "Turkey", "UK", "USA"],
            };
    },
    components: {
        zingchart: zingchartVue,
        Multiselect
  },
  methods: {
    getData() {
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
          {
            params: {
              country: this.selected,
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          this.stats.recovered = response.data.data.recovered;
          this.stats.deaths = response.data.data.deaths;
          this.stats.confirmed = response.data.data.confirmed;
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        });
    },
    getPopulation() {
      axios
        .get(
          "https://world-population.p.rapidapi.com/population",
          {
            params: {
              /* eslint-disable */
              country_name : this.selected,
              /* eslint-enable  */
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_POPULATIONAPIKEY,
              "x-rapidapi-host": "world-population.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          this.stats.population = response.data.body.population;
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
    this.getPopulation();
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style style="css" scoped>
.height_class {
  min-height: 100vh;
}
</style>
