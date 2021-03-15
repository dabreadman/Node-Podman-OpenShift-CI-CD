<template>
  <v-app>
    <NavBar></NavBar>
    <router-view></router-view>
    <Footer></Footer>
  </v-app>
</template>

<script>
// import Home from './pages/TheHomePage'
import Footer from "./components/layouts/TheFooter";
import NavBar from "./components/layouts/TheNavBar";
export default {
  name: "App",

  components: {
    NavBar,
    Footer,
    // Home,
  },

  data: () => ({}),
};
</script>
