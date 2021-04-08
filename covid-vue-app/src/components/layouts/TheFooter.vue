<template>
  <!-- Footer -->
  <mdb-footer color="blue" class="font-small pt-4 mt-4">
    <mdb-container class="text-left">
      <mdb-row>
        <mdb-col sm="6">
          <h5 class="title" style="color:white;">Covid-19 Tracker</h5>
          <br />
          <p style="color:white;">Keep up to date with the latest COVID-19 information.</p>
          <p style="color:white;">Further information at <a  href="https://www2.hse.ie/coronavirus/" style="color:white;" >The Offical HSE website</a></p>
        </mdb-col>
        <mdb-col sm="6">
          <h5 class="title" style="color:white;">Information about this application</h5>
          <ul style="color:white;">
            <li style="color:white;" class="list-unstyled">This application receives COVID-19 information from a <a style="color:white;" href="https://rapidapi.com/KishCom/api/covid-19-coronavirus-statistics">COVID-19 API</a>.</li>
            <li style="color:white;" class="list-unstyled">For population information it uses a  <a style="color:white;" href="https://rapidapi.com/aldair.sr99/api/world-population">Country Population API</a>.</li>
            <li style="color:white;" class="list-unstyled">You can find statistical information on the <a style="color:white;" href="\">Home Page</a>.</li>
            <li style="color:white;" class="list-unstyled">You can find visual information on the <a style="color:white;" href="\stats">Statistics Page</a>.</li>
          </ul>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <div class="footer-copyright text-center py-3">
      <mdb-container fluid style="color:white;">
        &copy; 2021 Copyright <a style="color:white;" href="https://github.com/dabreadman/Node-Podman-OpenShift-CI-CD"> Group 39 - Software Engineering  Project </a>
      </mdb-container>
    </div>
  </mdb-footer>
  <!-- Footer -->
</template>

<script>
  import { mdbFooter, mdbContainer, mdbRow, mdbCol } from "mdbvue";
  export default {
    name: "TheFooter",
    components: {
      mdbFooter,
      mdbContainer,
      mdbRow,
      mdbCol
    }
  }
</script>

<style lang="css" scoped></style>
