<!-- This Vue component will act as the statistics page to show visual information to the user. -->
<template lang="html">
  <v-container class="py-12 height_class">
    <v-col align="center">
      <!-- We have a basic title here to show before the visualization. -->
        <b><h3 class="display-1 py-6" style="color:black;">Visualize the impact of COVID-19.</h3></b>
        <br />
        <!-- This multiselect allows the user to pick a country to visualize. -->
        <div style="width:50%; align:center;">
            <multiselect
            :options="options"
             v-model="selected">
            </multiselect>
       </div>
       <br />
       <!-- The button below allows the user to render the graph and see the latest information. -->
       <v-btn @click="getData(); getPopulation();">Render Latest Information</v-btn>
    </v-col>

    <!-- Now we can make the bar chart with the help of the information from the API calls. -->
    <zingchart :data=" { type: 'bar', title: { text: 'Covid-19 Visualization for '.concat(this.selected), }, scaleX: { labels: ['Deaths', 'Recovered Cases', 'Confirmed Cases'] }, plotarea: { marginLeft:'dynamic', marginRight:'dynamic' }}" :series="[{values: [this.stats.deaths,this.stats.recovered,this.stats.confirmed,]}]" ></zingchart>
    <!-- Now we can have one line to further describe the information we have at our disposal. -->
    <v-col align="center">
        <p style="align: center;">In the location of <u>{{this.selected}}</u> with a total population of <u>{{this.stats.population }}</u> there has been a reported death count of <u>{{ this.stats.deaths}}</u>, the number of recovered cases is said to be <u>{{ this.stats.recovered}}</u> and the number of confirmed cases has reached <u>{{ this.stats.confirmed}}</u>.</p>
    </v-col>
    <br />
    <!-- Now we can make the pie chart with the help of the information from the API calls. -->
    <zingchart :data="secondPlot" :series="[{ values: [this.stats.population-this.stats.recovered-this.stats.confirmed], text: 'Uninfected Population', backgroundColor: '#4CD77A', detached: true }, { values: [this.stats.confirmed] , text: 'Currently Infected Population',  backgroundColor: '#FF0000', detached: true }, { values: [this.stats.recovered], text: 'Recovered Population', backgroundColor: '#B600FF', detached: true}]"></zingchart>
  </v-container>
</template>

<script>
//We need ZingChart for the charts and Multiselect for the drop down menu.
import "zingchart";
import zingchartVue from "zingchart-vue";
import Multiselect from "vue-multiselect";
import axios from "axios";
export default {
  data() {
        return {
          //This second plot will be for the pie chart. It is here because we do not need to include any API information for the "data" but we do for the "series".
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
            //These statistics are initialized to be N/A for now. They will be updated by the API call.
            stats: {
                 recovered: "N/A",
                 deaths: "N/A",
                 confirmed: "N/A",
                 population: "N/A"
            },
            //Make the default country Brazil, but the user can change this.
            selected: "Brazil",
            //We have options for the drop down menu.
            options: ["Brazil", "France", "India", "Ireland", "Italy", "Russia", "Spain", "Turkey", "UK", "USA"],
            };
    },
    components: {
      //We have two components, the charts and the multiselect drop down menu.
        zingchart: zingchartVue,
        Multiselect
  },
  methods: {
    getData() {
      //An API call for COVID-19 information.
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
      //An API call for country population information.
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
