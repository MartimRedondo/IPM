<template>
  <MyContainer>
    <MyCard class="large-card">
      <MyArrow/>
      <MyLogout/>
      <MyTitle class="welcome-title">Histórico de Serviços</MyTitle>
      <div class = "scroll">
      <ul class = "services-list" v-if="services.length > 0">
        <li v-for="service in services" :key="service.id" class="service-item">
          <div class = "service-info" > <strong>Matrícula:</strong>  {{ service.vehicleId }} - {{ service.descr }} </div>
          <MySecButton class="detail-button" :id="service.id" @detailsClick="verDetalhes(service.id, service.vehicleId)">Detalhes</MySecButton>
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
import MySecButton from '@/components/ui/MySecButton.vue';

export default {
name: 'ServiceHistory',
components: {
  MyContainer,
  MyCard,
  MyArrow,
  MyTitle,
  MyLogout,
  MySecButton
},
data() {
  return {
    services: [],
    serviceDefinitions: {}
  };
},
created() {
  this.fetchServiceDefinitions();
},
methods: {
  verDetalhes(serviceId, vehicleId) {
    this.$router.push(`/detalhess/${serviceId}/${vehicleId}`);
  },
  fetchServices() {
    fetch('http://localhost:3000/services')
      .then(response => response.json())
      .then(data => {
        const completedServices = data.filter(service => service.estado === 'realizado');
        this.services = completedServices.map(service => ({
          ...service,
          descr: this.serviceDefinitions[service['service-definitionId']]?.descr || 'Descrição não disponível',
        }));
      })
      .catch(error => {
        console.error("There was an error fetching the services data:", error);
      });
  },
  fetchServiceDefinitions() {
    fetch('http://localhost:3000/service-definitions')
      .then(response => response.json())
      .then(data => {
        this.serviceDefinitions = data.reduce((acc, definition) => {
          acc[definition.id] = definition;
          return acc;
        }, {});
        this.fetchServices(); // Moved inside the fetchServiceDefinitions to ensure it runs after definitions are fetched.
      })
      .catch(error => {
        console.error("There was an error fetching the service definitions data:", error);
      });
  },
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

.services-list {
  flex-grow: 1;
  overflow-y: auto; 
  margin-top: 2vh; 
}

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; 
  margin-bottom: 5vh; 
}

.service-info {
  flex-grow: 1;
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
  