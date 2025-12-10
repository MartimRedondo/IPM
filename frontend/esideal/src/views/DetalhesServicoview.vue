<template>
  <MyContainer>
    <MyCard class="large-card">
      <MyArrow/>
      <MyLogout/>
      <MyTitle class="welcome-title">Detalhes do Serviço</MyTitle>
      <div v-if="serviceDetails" class="details-list">
        <div class="detail"><strong>Nome do Cliente:</strong> {{ serviceDetails.clientName }}</div>
        <div class="detail"><strong>Telefone:</strong> {{ serviceDetails.clientPhone }}</div>
        <div class="detail"><strong>Serviço:</strong> {{ serviceDetails.descr }}</div>
        <div class="detail"><strong>Matrícula:</strong> {{ serviceDetails.vehicleId }}</div>
        <div class="detail"><strong>Hora de Término Prevista:</strong> {{ serviceDetails.endTime || 'N/A' }}</div>
        <div class="detail"><strong>Tempo de Realização do Serviço:</strong> {{ serviceDetails.serviceDuration }} minutos</div>
        <div class="detail"><strong>Notas:</strong> {{ serviceDetails.recommendations }}</div>
      </div>
      <div v-else>
        Carregando detalhes do serviço...
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
  
  export default {
    name: 'DetalhesServicos',
    components: {
      MyContainer,
      MyCard,
      MyArrow,
      MyTitle,
      MyLogout,
    },
    data() {
    return {
      // Inicializa as propriedades necessárias
      serviceDetails: null
    };
  },

  methods: {
    fetchServiceDetails() {
    const serviceId = this.$route.params.ids; // Captura o ID da URL
    const vehicleId = this.$route.params.idv; // Captura o ID da URL

    // Primeiro, busque service e vehicle
    Promise.all([
      this.fetchService(serviceId),
      this.fetchVehicle(vehicleId)
    ]).then(([service, vehicle]) => {
      // Após receber service e vehicle, busque client e servicedefinition
      Promise.all([
        this.fetchClient(vehicle.dono),
        this.fetchServiceDefenition(service['service-definitionId'])
      ]).then(([client, servicedefenition]) => {
        // Agora você pode configurar serviceDetails
        this.serviceDetails = {
          clientName: client.nome,
          clientPhone: client.telefone,
          descr: servicedefenition.descr,
          vehicleId: vehicle.id,
          endTime: service.data ? `${service.data.dia}/${service.data.mes}/${service.data.ano} às ${service.data.hora}:${service.data.minutos}` : 'N/A',
          serviceDuration: servicedefenition.duração,
          recommendations: service.descrição
        };
      }).catch(error => console.error("Error processing service details:", error));
    }).catch(error => console.error("Error fetching initial data:", error));
  },

    fetchService(serviceId) {
      return fetch(`http://localhost:3000/services/${serviceId}`)
        .then(response => response.json())
        .catch(error => console.error("Error fetching service:", error));
    },

    fetchServiceDefenition(servicedefinitionId) {
      return fetch(`http://localhost:3000/service-definitions/${servicedefinitionId}`)
        .then(response => response.json())
        .catch(error => console.error("Error fetching service definition:", error));
      
    },

    fetchVehicle(vehicleId) {
      return fetch(`http://localhost:3000/vehicles/${vehicleId}`)
        .then(response => response.json())
        .catch(error => console.error("Error fetching vehicle:", error));
    },

    fetchClient(clientId) {
      return fetch(`http://localhost:3000/clients/${clientId}`)
        .then(response => response.json())
        .catch(error => console.error("Error fetching client:", error));
    }
  },

  created() {
    this.fetchServiceDetails();
  }
};
</script>
  
  <style scoped>
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
  
.details-list {
  flex-grow: 1;
  margin-top: 2vh;
}
  
.detail {
  justify-content: space-between;
  align-items: center;
  width: 100%; 
  margin-bottom: 3vh; 
  flex-grow: 1; 
  font-family: "Ovo"; 
  font-size: clamp(1.5rem, 2vw, 2rem); 
  color: var(--color-dark); 
  margin-left: 5.5vw; 
}
  </style>
  