<template>
  <MyContainer>
    <MyCard class="large-card">
      <MyArrow/>
      <MyLogout/>
      <MyTitle class="welcome-title">Lista de Veículos</MyTitle>
      <div class = "scroll"> 
      <ul class="vehicle-list">
        <li v-for="vehicle in vehicles" :key="vehicle.id" class="vehicle-item">
          <div class="vehicle-info"><strong> Matrícula:</strong> {{ vehicle.id }}</div>
          <MySecButton class="detail-button" :id="vehicle.id" @detailsClick="verDetalhes(vehicle.id)">Detalhes</MySecButton>
        </li>
      </ul>
      </div>
    </MyCard>
  </MyContainer>
</template>

<script>
import MyContainer from '@/components/ui/MyContainer.vue';
import MyCard from '@/components/ui/MyCard.vue';
import MyArrow from '@/components/ui/MyArrow.vue';
import MyTitle from '@/components/ui/MyTitle.vue';
import MyLogout from '@/components/ui/MyLogout.vue';
import MySecButton from '@/components/ui/MySecButton.vue'; // Importar o componente MyDetails

export default {
  name: 'VehicleList',
  components: {
    MyContainer,
    MyCard,
    MyArrow,
    MyTitle,
    MyLogout,
    MySecButton // Registrar o componente MyDetails
  },
  data() {
    return {
      vehicles: []
    };
  },
  created() {
  this.fetchVehicles();
  },
  methods: {
    verDetalhes(vehicleId) {
    this.$router.push(`/detalhesv/${vehicleId}`);
  },
      fetchVehicles() {
        fetch('http://localhost:3000/vehicles')
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch vehicles');
            }
          })
          .then(data => {
            this.vehicles = data;
          })
          .catch(error => {
            console.error("There was an error fetching the vehicle data:", error);
          });
      }
  }
};
  </script>
  
  <style scoped>
  .scroll {
  position: relative; 
  margin-bottom: 0vh;
  width: 65vw; 
  flex-grow: 1;
  overflow-y: auto; 
  overflow-x: hidden;
  top: 0; 
  }
  .large-card {
    
    width: 65vw; 
    height: 75vh;
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
  }
  
  .welcome-title {
  height: 10vh; 
  margin-top: 6vh;
  margin-left: 4vw;
}

.vehicle-list {
  flex-grow: 1;
  overflow-y: auto; 
  margin-top: 2vh;
}

.vehicle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; 
  margin-bottom: 5vh; 
}

.vehicle-info {
  font-family: "Ovo";
  font-size: clamp(1.5rem, 2vw, 2rem); 
  color: var(--color-dark);
  margin-left: 3.1vw; 
}

.detail-button {
  border: 1px solid #000000;
  color: #000000;
  background-color: var(--color-light);
  position: absolute;
  margin-left: 54vw;
}

  </style>


  