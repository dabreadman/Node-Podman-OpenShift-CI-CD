<template lang="html">
  <v-footer dark padless>
    <v-card flat tile class="white black--text text-center my-card flex-grow-1">
      <v-row>
        <v-col>
          <p class="pl-12 ml-6 texts">Group 39 project</p>
        </v-col>
        <v-col>
          <v-btn
            v-for="link in links"
            :key="link.id"
            class="mx-4"
            icon
            :href="link.url"
          >
            <v-icon size="24px" color="#32325d">{{ link.icon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        id: 1,
        icon: "mdi-github",
        url: "https://github.com/dabreadman/Node-Podman-OpenShift-CI-CD",
      },
    ],
  }),
};
</script>

<style lang="css" scoped></style>