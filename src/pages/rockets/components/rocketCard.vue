<template>
  <!-- Kartu roket yang dapat diklik untuk melihat detail -->
  <div class="rocket-card" @click="redirectToDetail">
    <!-- Gambar roket -->
    <img :src="image" alt="Rocket Image" class="rocket-image" />
    
    <div class="rocket-info">
      <!-- Nama Roket -->
      <h3>{{ rocket.name }}</h3>
      
      <!-- Tanggal penerbangan pertama -->
      <p><strong>First Flight:</strong> {{ rocket.first_flight }}</p>
      
      <!-- Deskripsi Roket -->
      <p class="description">{{ rocket.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from "vue";
  import { useRouter } from "vue-router";

  // Interface untuk tipe data Rocket
  interface Rocket {
    id: string;
    name: string;
    first_flight: string;
    description: string;
  }

  // Mendefinisikan props yang diterima dari parent component
  const props = defineProps<{ 
    rocket: Rocket; // Data roket (id, nama, first flight, deskripsi)
    image: string; // URL gambar roket
  }>();

  // Router untuk navigasi ke halaman detail roket
  const router = useRouter();

  // Fungsi untuk mengarahkan pengguna ke halaman detail roket saat kartu diklik
  const redirectToDetail = () => {
    router.push(`/rockets/${props.rocket.id}`);
  };
</script>

<style lang="scss" scoped>
  /* Kartu roket dengan efek hover */
  .rocket-card {
    background: #1e1e1e;
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    transition: transform 0.2s;
    border: 1px solid white;
    cursor: pointer;
  }

  /* Efek zoom saat hover */
  .rocket-card:hover {
    transform: scale(1.05);
  }

  /* Gambar roket */
  .rocket-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
  }

  /* Informasi roket */
  .rocket-info {
    margin-top: 10px;
  }

  /* Nama roket */
  h3 {
    font-size: 1.2rem;
  }

  /* Deskripsi roket */
  .description {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #ccc;
  }
</style>
