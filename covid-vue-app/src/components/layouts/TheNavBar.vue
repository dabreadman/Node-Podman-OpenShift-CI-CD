<!-- This Vue component will act as the navigation bar at the top of the every page in the application. -->
<template lang="html">
  <v-container fluid>
    <v-app-bar color="blue" absolute flat>
      <v-row class="nav-padding-primary" v-if="$vuetify.breakpoint.mdAndUp">
        <v-col class="col-3">
          <!-- We can show a main application text logo at the top left with a small shadow for aesthetic purposes. -->
          <a href="/"><h1 style="color:white; text-decoration: none; text-shadow: 3px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;" >COVID-19 Tracker</h1></a>
        </v-col>
        <!-- Now we can make two buttons for the user to switch between the pages in the application. -->
        <v-col align="center" class="col-6">
          <v-btn text to="/" class="mx-12" style="color:white; margin-top: 5px;">Home</v-btn>
          <v-btn text to="/stats" class="mx-12" style="color:white; margin-top: 5px;">Statistics</v-btn>
        </v-col>
      </v-row>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="$vuetify.breakpoint.smAndDown"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute :temporary="$vuetify.breakpoint.mdAndDown">
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class=" text--accent-4">
          <v-list-item>
            <v-btn>Home</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn>Stats</v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  //Information here can be used for the buttons in the navigation bar.
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="css" scoped>
a { text-decoration: none; }
</style>
