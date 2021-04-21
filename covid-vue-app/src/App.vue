<!-- This Vue component will act as a high level component which represents the covid-vue-app. -->
<template>
  <v-app>
    <!-- We want to show our Navigation bar at the top of the page. -->
    <NavBar></NavBar>
    <router-view></router-view>
    <!-- We want to show our Footer at the bottom of the page. -->
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from "./components/layouts/TheFooter";
import NavBar from "./components/layouts/TheNavBar";
export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  }
};
</script>
