<!-- This Vue component will act as the home page, and will import other components to keep this component easy to understand. -->
<template lang="html">
  <v-container class="py-12 height_class">
    <!-- We want our general stats overview component first. -->
    <Overview></Overview>
    <v-row>
      <!-- Now we can show the active and closed cases for Ireland. -->
      <v-col><Active></Active></v-col>
      <v-col><Closed></Closed></v-col>
    </v-row>
    <v-row class="pt-12">
      <!-- Finally we can show the data table containing information for many countries. -->
      <Table></Table>
    </v-row>
  </v-container>
</template>

<script>
// We import the components like this
import Overview from "../components/StatsOverview";
import Active from "../components/activeCasesOverview";
import Closed from "../components/closedCasesOverview";
import Table from "../components/DataTable";
export default {
  components: {
    Overview,
    Closed,
    Table,
    Active,
  }
};
</script>

<style lang="css" scoped>
.height_class {
  min-height: 100vh;
}
</style>
