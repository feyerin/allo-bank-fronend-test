<template>
  <div class="rocket-detail">
    <!-- Menampilkan loading spinner saat data sedang dimuat -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <!-- Menampilkan pesan error jika gagal memuat data -->
    <div v-if="isError" class="error-overlay">
      <p>Failed to load data. Please try again.</p>
      <button @click="fetchRocket" class="retry-btn">Retry</button>
    </div>

    <div class="content">
      <h1>{{ rocket?.name }}</h1>
      <p class="type"><strong>Type:</strong> {{ rocket?.type }}</p>
      <p><strong>First Flight:</strong> {{ rocket?.first_flight }}</p>
      
      <!-- Menampilkan informasi detail mengenai roket -->
      <div class="info">
        <div>
          <p><strong>Cost per launch:</strong> {{ formatCurrency(rocket?.cost_per_launch) }}</p>
          <p><strong>Company:</strong> {{ rocket?.company }}</p>
          <p><strong>Success Rate:</strong> {{ rocket?.success_rate_pct }}%</p>
          <p :class="rocket?.active ? 'active' : 'inactive'">
            {{ rocket?.active ? 'Active' : 'Inactive' }}
          </p>
        </div>
        <div>
          <p><strong>Country:</strong> {{ rocket?.country }}</p>
          <p><strong>Stages:</strong> {{ rocket?.stages }}</p>
          <p><strong>Height:</strong> {{ rocket?.height.meters }} m</p>
          <p><strong>Diameter:</strong> {{ rocket?.diameter.meters }} m</p>
          <p><strong>Mass:</strong> {{ formatNumber(rocket?.mass.kg) }} kg</p>
        </div>
      </div>

      <p class="description">{{ rocket?.description }}</p>

      <!-- Tombol navigasi ke Wikipedia dan kembali ke halaman sebelumnya -->
      <div class="buttons">
        <a :href="rocket?.wikipedia" target="_blank" class="wiki-btn">Wiki</a>
        <button @click="goBack" class="back-btn">← Back</button>
      </div>
    </div>

    <!-- Menampilkan gambar roket dan daftar thumbnail gambar -->
    <div class="image-section" v-if="!isError">
      <img :src="selectedImage" alt="Rocket Image" class="main-image" />
      <div class="thumbnail-container">
        <img
          v-for="(img, index) in rocket?.flickr_images"
          :key="index"
          :src="img"
          class="thumbnail"
          :class="{ active: img === selectedImage }"
          @click="selectedImage = img"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import axios from 'axios';

  const route = useRoute();
  const router = useRouter();
  const rocket = ref<any>(null);
  const selectedImage = ref<string>("");
  const isLoading = ref(true);
  const isError = ref(false);

  // Mengambil data roket berdasarkan ID dari API
  const fetchRocket = async () => {
    try {
      isLoading.value = true;
      const response = await axios.get(`https://api.spacexdata.com/v4/rockets/${route.params.id}`);
      rocket.value = await response.data;
      selectedImage.value = rocket.value.flickr_images?.[0] || "";
    } catch (error) {
      console.error('Error fetching rockets:', error);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchRocket);
  
  // Fungsi untuk kembali ke halaman sebelumnya
  const goBack = () => {
    router.back();
  };
  
  // Fungsi untuk memformat angka ke dalam format mata uang
  const formatCurrency = (value: number | undefined) => {
    return value ? `$${value.toLocaleString()}` : "N/A";
  };
  
  // Fungsi untuk memformat angka biasa
  const formatNumber = (value: number | undefined) => {
    return value ? value.toLocaleString() : "N/A";
  };
</script>

<style lang="scss" scoped>
  .rocket-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background: #121212;
    color: white;
    text-align: center;
  }

  @media (min-width: 768px) {
    .rocket-detail {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
      padding: 2rem 10rem;
    }
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .content {
    max-width: 90%;
  }

  @media (min-width: 768px) {
    .content {
      max-width: 50%;
    }
  }

  .info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 1rem;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  @media (min-width: 768px) {
    .buttons {
      flex-direction: row;
    }
  }

  .image-section {
    text-align: center;
  }

  .main-image {
    width: 100%;
    max-width: 600px;
    border-radius: 10px;
  }

  .thumbnail-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
  }

  .thumbnail {
    width: 60px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.6;
  }

  .thumbnail.active, .thumbnail:hover {
    opacity: 1;
    border: 2px solid white;
  }
</style>
