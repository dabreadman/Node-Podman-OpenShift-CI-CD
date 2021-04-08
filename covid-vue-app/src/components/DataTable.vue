<template lang="html">
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.name }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: ["Name", "Recovered", "Deaths", "Confirmed"],
      items: [
        {
          name: "USA",
          deaths: null,
          recovered: null,
          confirmed: null,
        },
        {
          name: "India",
          deaths: null,
          recovered: null,
          confirmed: null,
        },
        {
          name: "Brazil",
          deaths: null,
          recovered: null,
          confirmed: null,
        },
        {
          name: "Russia",
          deaths: null,
          recovered: null,
          confirmed: null,
        },
        {
          name: "UK",
          deaths: null,
          recovered: null,
          confirmed: null,
        },
        {
          name: "France",
          deaths: null,
          recovered: null,
          confirmed: null,
        },
        {
          name: "Spain",
          deaths: null,
          recovered: null,
          confirmed: null,
        },
        {
          name: "Italy",
          deaths: null,
          recovered: null,
          confirmed: null,
        },
        {
          name: "Turkey",
          deaths: null,
          recovered: null,
          confirmed: null,
        },
        {
          name: "Ireland",
          deaths: null,
          recovered: null,
          confirmed: null,
        },
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    getDataforUSA() {
      this.items[0].deaths = "Loading...";
      this.items[0].recovered = "Loading...";
      this.items[0].confirmed = "Loading...";
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
          {
            params: {
              country: "US",
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          if(response.data.data.deaths == null){
            this.items[0].deaths = "N/A";
          }
          else{
            this.items[0].deaths = response.data.data.deaths;
          }

          if(response.data.data.recovered == null){
            this.items[0].recovered = "N/A";
          }
          else{
            this.items[0].recovered = response.data.data.recovered;
          }

          if(response.data.data.confirmed == null){
            this.items[0].confirmed = "N/A";
          }
          else{
            this.items[0].confirmed = response.data.data.confirmed;
          }
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        })
    },
    getDataforIndia() {
      this.items[1].deaths = "Loading...";
      this.items[1].recovered = "Loading...";
      this.items[1].confirmed = "Loading...";
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
          {
            params: {
              country: "India",
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          if(response.data.data.deaths == null){
            this.items[1].deaths = "N/A";
          }
          else{
            this.items[1].deaths = response.data.data.deaths;
          }

          if(response.data.data.recovered == null){
            this.items[1].recovered = "N/A";
          }
          else{
            this.items[1].recovered = response.data.data.recovered;
          }

          if(response.data.data.confirmed == null){
            this.items[1].confirmed = "N/A";
          }
          else{
            this.items[1].confirmed = response.data.data.confirmed;
          }
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        })
    },
    getDataforBrazil() {
      this.items[2].deaths = "Loading...";
      this.items[2].recovered = "Loading...";
      this.items[2].confirmed = "Loading..."; 
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
          {
            params: {
              country: "Brazil",
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          if(response.data.data.deaths == null){
            this.items[2].deaths = "N/A";
          }
          else{
            this.items[2].deaths = response.data.data.deaths;
          }

          if(response.data.data.recovered == null){
            this.items[2].recovered = "N/A";
          }
          else{
            this.items[2].recovered = response.data.data.recovered;
          }

          if(response.data.data.confirmed == null){
            this.items[2].confirmed = "N/A";
          }
          else{
            this.items[2].confirmed = response.data.data.confirmed;
          }
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        })
    },
    getDataforRussia() {
      this.items[3].deaths = "Loading...";
      this.items[3].recovered = "Loading...";
      this.items[3].confirmed = "Loading...";
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
          {
            params: {
              country: "Russia",
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          if(response.data.data.deaths == null){
            this.items[3].deaths = "N/A";
          }
          else{
            this.items[3].deaths = response.data.data.deaths;
          }

          if(response.data.data.recovered == null){
            this.items[3].recovered = "N/A";
          }
          else{
            this.items[3].recovered = response.data.data.recovered;
          }

          if(response.data.data.confirmed == null){
            this.items[3].confirmed = "N/A";
          }
          else{
            this.items[3].confirmed = response.data.data.confirmed;
          }
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        })
    },
    getDataforUK() {
      this.items[4].deaths = "Loading...";
      this.items[4].recovered = "Loading...";
      this.items[4].confirmed = "Loading...";
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
          {
            params: {
              country: "UK",
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          if(response.data.data.deaths == null){
            this.items[4].deaths = "N/A";
          }
          else{
            this.items[4].deaths = response.data.data.deaths;
          }

          if(response.data.data.recovered == null){
            this.items[4].recovered = "N/A";
          }
          else{
            this.items[4].recovered = response.data.data.recovered;
          }

          if(response.data.data.confirmed == null){
            this.items[4].confirmed = "N/A";
          }
          else{
            this.items[4].confirmed = response.data.data.confirmed;
          }
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        })
    },
    getDataforFrance() {
      this.items[5].deaths = "Loading...";
      this.items[5].recovered = "Loading...";
      this.items[5].confirmed = "Loading...";
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
          {
            params: {
              country: "France",
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          if(response.data.data.deaths == null){
            this.items[5].deaths = "N/A";
          }
          else{
            this.items[5].deaths = response.data.data.deaths;
          }

          if(response.data.data.recovered == null){
            this.items[5].recovered = "N/A";
          }
          else{
            this.items[5].recovered = response.data.data.recovered;
          }

          if(response.data.data.confirmed == null){
            this.items[5].confirmed = "N/A";
          }
          else{
            this.items[5].confirmed = response.data.data.confirmed;
          }
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        })
    },
    getDataforSpain() {
      this.items[6].deaths = "Loading...";
      this.items[6].recovered = "Loading...";
      this.items[6].confirmed = "Loading...";
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
          {
            params: {
              country: "Spain",
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          if(response.data.data.deaths == null){
            this.items[6].deaths = "N/A";
          }
          else{
            this.items[6].deaths = response.data.data.deaths;
          }

          if(response.data.data.recovered == null){
            this.items[6].recovered = "N/A";
          }
          else{
            this.items[6].recovered = response.data.data.recovered;
          }

          if(response.data.data.confirmed == null){
            this.items[6].confirmed = "N/A";
          }
          else{
            this.items[6].confirmed = response.data.data.confirmed;
          }
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        })
    },
    getDataforItaly() {
      this.items[7].deaths = "Loading...";
      this.items[7].recovered = "Loading...;"
      this.items[7].confirmed = "Loading...";
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
          {
            params: {
              country: "Italy",
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          if(response.data.data.deaths == null){
            this.items[7].deaths = "N/A";
          }
          else{
            this.items[7].deaths = response.data.data.deaths;
          }

          if(response.data.data.recovered == null){
            this.items[7].recovered = "N/A";
          }
          else{
            this.items[7].recovered = response.data.data.recovered;
          }

          if(response.data.data.confirmed == null){
            this.items[7].confirmed = "N/A";
          }
          else{
            this.items[7].confirmed = response.data.data.confirmed;
          }
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        })
    },
    getDataforTurkey() {
      this.items[8].deaths = "Loading...";
      this.items[8].recovered = "Loading...";
      this.items[8].confirmed = "Loading...";
      axios
        .get(
          "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
          {
            params: {
              country: "Turkey",
            },
            headers: {
              "x-rapidapi-key": process.env.VUE_APP_COVIDAPIKEY,
              "x-rapidapi-host":
                "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
          }
        )
        .then((response) => {
          if(response.data.data.deaths == null){
            this.items[8].deaths = "N/A";
          }
          else{
            this.items[8].deaths = response.data.data.deaths;
          }

          if(response.data.data.recovered == null){
            this.items[8].recovered = "N/A";
          }
          else{
            this.items[8].recovered = response.data.data.recovered;
          }

          if(response.data.data.confirmed == null){
            this.items[8].confirmed = "N/A";
          }
          else{
            this.items[8].confirmed = response.data.data.confirmed;
          }
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        })
    },
    getDataforIreland() {
      this.items[9].deaths = "Loading...";
      this.items[9].recovered = "Loading...";
      this.items[9].confirmed = "Loading...";
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
          if(response.data.data.deaths == null){
            this.items[9].deaths = "N/A";
          }
          else{
            this.items[9].deaths = response.data.data.deaths;
          }

          if(response.data.data.recovered == null){
            this.items[9].recovered = "N/A";
          }
          else{
            this.items[9].recovered = response.data.data.recovered;
          }

          if(response.data.data.confirmed == null){
            this.items[9].confirmed = "N/A";
          }
          else{
            this.items[9].confirmed = response.data.data.confirmed;
          }
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        })
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) {
        this.page += 1;
      }
    },
    formerPage() {
      if (this.page - 1 >= 1) {
        this.page -= 1;
      }
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
    created() {
    this.getDataforUSA();
    this.getDataforIndia();
    this.getDataforBrazil();
    this.getDataforRussia();
    this.getDataforUK();
    this.getDataforFrance();
    this.getDataforSpain();
    this.getDataforItaly();
    this.getDataforTurkey();
    this.getDataforIreland();
  },
};
</script>

<style lang="css" scoped></style>
