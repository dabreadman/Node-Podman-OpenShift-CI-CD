<template lang="html">
  <v-container fluid>
    <v-app-bar color="#fafaff" absolute flat>
      <v-row class="nav-padding-primary" v-if="$vuetify.breakpoint.mdAndUp">
        <v-col class="col-3">
          <h1>Group 39 Project</h1>
        </v-col>
        <v-col align="center" class="col-6">
          <v-btn text to="/stats" class="mx-12">Stats</v-btn>
          <v-btn text to="/" class="mx-12">Home</v-btn>
        </v-col>
      </v-row>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="$vuetify.breakpoint.smAndDown"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      :temporary="$vuetify.breakpoint.mdAndDown"
    >
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

<style lang="css" scoped></style>
