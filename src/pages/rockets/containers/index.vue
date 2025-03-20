<template>
  <div class="rocket-list">
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    
    <!-- Error Handling -->
    <div v-if="isError" class="error-overlay">
      <p>Failed to load rockets. Please try again.</p>
      <button @click="fetchRockets" class="retry-btn">Retry</button>
    </div>
    
    <div v-else class="content">
      <div class="controls">
        <!-- Sorting Dropdown -->
        <div class="sorting">
          <label>Sort by:</label>
          <select v-model="sortOption" @change="sortRockets" class="sorting-select">
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="first_flight-asc">First Flight (Oldest)</option>
            <option value="first_flight-desc">First Flight (Newest)</option>
          </select>
        </div>
        
        <!-- Search Input and Create Button -->
        <div class="search-create">
          <input type="text" v-model="searchQuery" placeholder="Search rockets..." @input="filterRockets" class="search-input" />
          <button @click="router.push('/rockets/create')" class="create-btn">Create</button>
        </div>
      </div>
      
      <!-- Rocket List -->
      <div class="rockets">
        <RocketCard 
          v-for="rocket in paginatedRockets" 
          :key="rocket.id" 
          :rocket="rocket" 
          :image="rocket.flickr_images?.[0] || ''" 
        />
      </div>
      
      <!-- Pagination Controls -->
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="prevPage" class="pagination-btn">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="nextPage" class="pagination-btn">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";
  import RocketCard from "../components/rocketCard.vue";

  // Reactive variables for storing rocket data
  const rockets = ref<any[]>([]);
  const filteredRockets = ref<any[]>([]);
  const searchQuery = ref("");
  const sortOption = ref("name-asc");
  const isLoading = ref(true);
  const isError = ref(false);
  const currentPage = ref(1);
  const itemsPerPage = 5;
  const router = useRouter();

  // Fetch rocket data from API
  const fetchRockets = async () => {
    try {
      isLoading.value = true;
      isError.value = false;
      const response = await axios.post("https://api.spacexdata.com/v4/rockets/query", { query: {}, options: {} });
      rockets.value = response.data.docs;
      filteredRockets.value = [...rockets.value];
    } catch (error) {
      console.error("Error fetching rockets:", error);
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchRockets);

  // Filter rocket list based on search query
  const filterRockets = () => {
    filteredRockets.value = rockets.value.filter(rocket =>
      rocket.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    currentPage.value = 1;
  };

  // Sort rockets based on selected option
  const sortRockets = () => {
    filteredRockets.value.sort((a, b) => {
      if (sortOption.value.includes("name")) {
        return sortOption.value === "name-asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else {
        return sortOption.value === "first_flight-asc"
          ? new Date(a.first_flight).getTime() - new Date(b.first_flight).getTime()
          : new Date(b.first_flight).getTime() - new Date(a.first_flight).getTime();
      }
    });
    currentPage.value = 1;
  };

  // Pagination logic
  const totalPages = computed(() => Math.ceil(filteredRockets.value.length / itemsPerPage));
  const paginatedRockets = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredRockets.value.slice(start, start + itemsPerPage);
  });

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };
</script>

<style lang="scss" scoped>
  .rocket-list {
    max-width: 1200px;
    margin: auto;
    padding: 2rem;
    background: #121212;
    color: white;
    border-radius: 10px;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    align-items: center;
  }

  .sorting {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .search-create {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .sorting-select, .search-input, .create-btn {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid white;
    background: #1e1e1e;
    color: white;
  }

  .create-btn {
    cursor: pointer;
  }

  .rockets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .pagination-btn {
    padding: 0.7rem 1.5rem;
    border: 1px solid white;
    background: transparent;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }

  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Overlay untuk loading */
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

  /* Spinner animasi */
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

  /* Overlay untuk error */
  .error-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(65, 63, 63, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    z-index: 1000;
  }

  .retry-btn {
    margin-top: 10px;
    padding: 10px 20px;
    background: white;
    color: red;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  .retry-btn:hover {
    background: #ffdddd;
  }

</style>
