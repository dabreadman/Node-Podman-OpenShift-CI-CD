<template lang="html">
  <v-container class="py-12 height_class">
    <Overview></Overview>
    <v-row>
      <v-col><Active></Active></v-col>
      <v-col><Closed></Closed></v-col>
    </v-row>
    <v-row class="pt-12">
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
  },
  data: () => ({
    //here is where we can keep some data
  }),
};
</script>

<style lang="css" scoped>
.height_class {
  min-height: 100vh;
}
</style>
