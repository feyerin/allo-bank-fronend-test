<template>
  <v-app>
    <v-main>
      <Navbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Navbar from "./components/navbar.vue"; // Sesuaikan path sesuai struktur proyek

export default {
  components: {
    Navbar,
  },
};
</script>
