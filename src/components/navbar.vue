<template>
  <nav class="navbar">
    <router-link to="/" class="logo">
      <img src="../logo.png" alt="SpaceX Logo" />
    </router-link>
    <ul class="nav-links">
      <li><router-link to="/rockets">Rockets</router-link></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: black;
  padding: 10px 20px;
  color: white;
}

.logo img {
  height: 20px;
}

.nav-links {
  display: flex;
  gap: 15px;
  list-style: none;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 0.7;
}
</style>
