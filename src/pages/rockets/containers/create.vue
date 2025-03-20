<template>
  <div class="container">
    <h1 class="title">Create New Rocket</h1>

    <!-- Form untuk membuat roket -->
    <form @submit.prevent="createRocket">
      <div class="input-group">
        <label>Name</label>
        <input v-model="rocket.name" type="text" required />
      </div>

      <div class="input-group">
        <label>Type</label>
        <input v-model="rocket.type" type="text" required />
      </div>

      <div class="input-group">
        <label>First Flight (YYYY-MM-DD)</label>
        <input v-model="rocket.first_flight" type="date" required />
      </div>

      <div class="input-group">
        <label>Cost per Launch (USD)</label>
        <input v-model.number="rocket.cost_per_launch" type="number" required />
      </div>

      <div class="input-group">
        <label>Company</label>
        <input v-model="rocket.company" type="text" required />
      </div>

      <div class="input-group">
        <label>Success Rate (%)</label>
        <input v-model.number="rocket.success_rate_pct" type="number" required />
      </div>

      <div class="input-group">
        <label>Country</label>
        <input v-model="rocket.country" type="text" required />
      </div>

      <div class="input-group">
        <label>Stages</label>
        <input v-model.number="rocket.stages" type="number" required />
      </div>

      <div class="input-group">
        <label>Height (meters)</label>
        <input v-model.number="rocket.height" type="number" required />
      </div>

      <div class="input-group">
        <label>Diameter (meters)</label>
        <input v-model.number="rocket.diameter" type="number" required />
      </div>

      <div class="input-group">
        <label>Mass (kg)</label>
        <input v-model.number="rocket.mass" type="number" required />
      </div>

      <div class="input-group">
        <label>Wikipedia URL</label>
        <input v-model="rocket.wikipedia" type="url" required />
      </div>

      <div class="input-group">
        <label>Image URL</label>
        <input v-model="rocket.image" type="url" required />
      </div>

      <!-- Tombol submit dengan loading -->
      <button type="submit" class="submit-btn" :disabled="isLoading">
        <span v-if="isLoading" class="spinner"></span>
        <span v-else>Create Rocket</span>
      </button>
    </form>

    <!-- Menampilkan pesan sukses atau error -->
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  // Objek untuk menyimpan data roket yang akan dibuat
  const rocket = ref({
    name: "",
    type: "",
    first_flight: "",
    cost_per_launch: 0,
    company: "",
    success_rate_pct: 0,
    country: "",
    stages: 0,
    height: 0,
    diameter: 0,
    mass: 0,
    wikipedia: "",
    image: "",
  });

  // State untuk menyimpan pesan respon API
  const message = ref("");

  // State untuk menandai apakah sedang loading
  const isLoading = ref(false);

  // Fungsi untuk membuat roket (simulasi)
  const createRocket = async () => {
    isLoading.value = true; // Aktifkan loading

    try {
      // Simulasi delay untuk efek loading
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // API SpaceX tidak memberikan dokumentasi POST request yang jelas untuk roket, ini hanya contoh
      const response = await fetch("https://api.spacexdata.com/v4/rockets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Key": "spacex-key"
        },        
      body: JSON.stringify(rocket.value),
      });
  
      if (response.ok) {
        message.value = "Rocket created successfully!";
      } else {
        message.value = "Failed to create rocket.";
      }
    } catch (error) {
      console.error("Error:", error);
      message.value = "An error occurred.";
    } finally {
      isLoading.value = false; // Matikan loading setelah selesai
    }
  };
</script>

<style scoped>
  /* Container utama */
  .container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #121212;
    color: white;
    border-radius: 10px;
  }

  /* Judul */
  .title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 10px;
  }

  /* Grup input */
  .input-group {
    margin-bottom: 10px;
  }

  label {
    display: block;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid gray;
    background: #1e1e1e;
    color: white;
  }

  /* Tombol submit */
  .submit-btn {
    width: 100%;
    padding: 10px;
    border: none;
    background: #007bff;
    color: white;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .submit-btn:disabled {
    background: gray;
    cursor: not-allowed;
  }

  /* Animasi spinner untuk loading */
  .spinner {
    width: 20px;
    height: 20px;
    border: 3px solid white;
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Animasi loading */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Pesan sukses atau error */
  .message {
    margin-top: 10px;
    text-align: center;
    font-weight: bold;
  }
</style>