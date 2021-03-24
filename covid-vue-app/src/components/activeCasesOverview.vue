<template lang="html">
  <v-card>
    <v-card-title>Active Cases</v-card-title>
    <v-row>
      <v-col align="center">
        <p class="headline">Currently infected : {{ stats.cases }}</p>
        <p class="headline">Mild condition : {{ stats.mild }}</p>
        <p class="headline">Serious or Critical : {{ stats.critical }}</p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    //We use vue interpolations to pull the data from some source.
    //For now the source is hardcoded but this can also be called by an api
    //You could call the api in a method, which would be called the when the component enters the lifcycle
    //typically created()
    stats: {
      cases: "21,746,252",
      mild: "21,656,329",
      critical: "89,923",
    },
  }),
};
</script>

<style lang="css" scoped></style>
