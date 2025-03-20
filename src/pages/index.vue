<template>
  <!-- Container utama yang menampilkan informasi tentang SpaceX -->
  <div class="container" v-if="company">
    <!-- Gambar latar belakang -->
    <img src="../bg-image.jpg" alt="SpaceX" class="background" />
    
    <!-- Konten utama -->
    <div class="content">
      <h1 class="title">All SpaceX Info In One Place</h1>
      <h2 class="subtitle">Aside From Their Website</h2>
      
      <!-- Grid informasi tentang perusahaan -->
      <div class="info-grid">
        <!-- Informasi tentang SpaceX -->
        <div>
          <h3 class="info-title">ABOUT</h3>
          <p>Founded in {{ company.founded }} by {{ company.founder }}</p>
          <p>Has {{ company.employees.toLocaleString() }} employees,</p>
          <p>{{ company.vehicles }} space vehicles,</p>
          <p>{{ company.launch_sites }} launch sites,</p>
          <p>and {{ company.test_sites }} test sites.</p>
          <p>Valued at ${{ company.valuation.toLocaleString() }}</p>
        </div>

        <!-- Informasi tentang kantor pusat -->
        <div>
          <h3 class="info-title">HEADQUARTERS</h3>
          <p>{{ company.headquarters.address }}</p>
          <p>{{ company.headquarters.city }}, {{ company.headquarters.state }}</p>
        </div>

        <!-- Link ke sosial media SpaceX -->
        <div>
          <h3 class="info-title">SOCIAL MEDIA</h3>
          <ul>
            <li>
              <a :href="company.links.website" target="_blank" class="link">Website</a>
            </li>
            <li>
              <a :href="company.links.flickr" target="_blank" class="link">Flickr</a>
            </li>
            <li>
              <a :href="company.links.twitter" target="_blank" class="link">Twitter</a>
            </li>
            <li>
              <a :href="company.links.elon_twitter" target="_blank" class="link">Elon Musk Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Ringkasan perusahaan -->
      <p class="description">{{ company.summary }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  // Definisi tipe data untuk objek perusahaan
  interface Company {
    name: string;
    founder: string;
    founded: number;
    employees: number;
    vehicles: number;
    launch_sites: number;
    test_sites: number;
    valuation: number;
    headquarters: {
      address: string;
      city: string;
      state: string;
    };
    links: {
      website: string;
      flickr: string;
      twitter: string;
      elon_twitter: string;
    };
    summary: string;
  }

  // State untuk menyimpan data perusahaan
  const company = ref<Company | null>(null);

  // Fetch data perusahaan saat komponen dimuat
  onMounted(async () => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v4/company');
      company.value = response.data;
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  });
</script>

<style lang="scss" scoped>
  /* Container utama dengan tinggi layar penuh */
  .container {
    position: relative;
    height: 100vh;
    background-color: black;
    color: white;
  }

  /* Gambar latar belakang dengan opacity */
  .background {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
  }

  /* Konten utama */
  .content {
    position: relative;
    z-index: 10;
    padding: 2rem;
    text-align: center;
  }

  /* Judul utama */
  .title {
    font-size: 2.5rem;
    font-weight: bold;
  }

  /* Subjudul */
  .subtitle {
    font-size: 1.5rem;
    font-weight: 600;
    color: gray;
  }

  /* Grid informasi dengan layout responsif */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
    text-align: left;
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
  }

  /* Judul setiap bagian informasi */
  .info-title {
    font-weight: bold;
    font-size: 1.125rem;
    border-bottom: 1px solid white;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  /* Link sosial media */
  .link {
    color: #60a5fa;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  /* Deskripsi perusahaan */
  .description {
    margin-top: 2rem;
    max-width: 48rem;
    margin-left: auto;
    margin-right: auto;
    color: gray;
  }

  /* RESPONSIVE DESIGN */

  /* Untuk layar kecil */
  @media (max-width: 768px) {
    .content {
      padding: 1.5rem;
    }

    .title {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.25rem;
    }

    .info-grid {
      grid-template-columns: 1fr; /* Menjadi satu kolom */
      gap: 1rem;
    }

    .description {
      font-size: 0.9rem;
    }
  }

  /* Untuk layar sangat kecil */
  @media (max-width: 480px) {
    .title {
      font-size: 1.75rem;
    }

    .subtitle {
      font-size: 1.125rem;
    }

    .content {
      padding: 1rem;
    }

    .description {
      font-size: 0.85rem;
    }
  }
</style>
