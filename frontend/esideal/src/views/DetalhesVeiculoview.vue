<template>
    <MyContainer>
      <MyCard class="large-card">
        <MyArrow/>
        <MyLogout/>
        <MyTitle class="welcome-title">Informações do Veículo</MyTitle>
        <div v-if="vehicle" class="details-list">
          <div class="detail"><strong>Dono:</strong> {{ dono.nome }}</div>
          <div class="detail"><strong>contacto:</strong> {{ dono.telefone }}</div>
          <div class="detail"><strong>Marca:</strong> {{ vehicle.marca }}</div>
          <div class="detail"><strong>Modelo:</strong> {{ vehicle.modelo }}</div>
          <div class="detail"><strong>ID do Veículo:</strong> {{ vehicle.id }}</div>
          <div class="detail"><strong>Tipo de Combustível:</strong> {{ vehicle["vehicle-typeId"] }}</div>
          <div class="detail"><strong>Cilindrada:</strong> {{ vehicle.cilindrada || 'N/A' }}</div>
          <div class="detail"><strong>Potência:</strong> {{ vehicle.potencia || 'N/A' }}</div>
          <div class="detail"><strong>Kilometragem:</strong> {{ vehicle.kms }}</div>
          <div class="detail"><strong>Histórico:</strong> </div>
          <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Data de serviço</th>
          <th>Tipo de serviço</th>
        </tr>
      </thead>
      <tbody>
  <tr v-if="completedServices.length === 0">
    <td>Sem Data</td>
    <td>Nenhum serviço</td>
  </tr>
  <tr v-for="service in completedServices" :key="service.id">
    <td>{{ formatDate(service.dataRealizacao) }}</td>
    <td>{{ serviceDescriptions[service['service-definitionId']] }}</td>
  </tr>
</tbody>
    </table>
  </div>
        </div>
        <div v-else>
          Carregando detalhes do veículo...
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
    name: 'DetalhesVeiculoView',
    components: {
      MyContainer,
      MyCard,
      MyArrow,
      MyTitle,
      MyLogout,
    },
    data() {
      return {
        vehicles: [], // Parece que você pretendia ter uma lista de veículos, mas a descrição original mostra um veículo individual.
        vehicle: null,
        dono: [],
        serviceDescriptions: {},
        completedServices: [],
      };
    },
    mounted() {
      this.fetchVehicleDetails();
      this.fetchVehicleServices();
    },
    methods: {
      formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }; // Definindo as opções de formatação
    return new Date(dateString).toLocaleDateString('pt-PT', options); // Formata a data
  },
      fetchDono(donoId) {
        fetch('http://localhost:3000/clients')
          .then(response => response.json())
          .then(data => { 
            this.dono = data.find(d => d.id === donoId);
          })
          .catch(error => {
            console.error("Failed to fetch owner details:", error);
          });
      },
      fetchVehicleServices() {
      fetch('http://localhost:3000/services')
        .then(response => response.json())
        .then(services => {
          // Filtra os serviços completados para este veículo
          const completed = services.filter(s => 
            s.estado === 'realizado' && s.vehicleId === this.$route.params.idv
          );
          this.completedServices = completed;
          // Busca as descrições de serviços correspondentes
          this.fetchServiceDescriptions(completed.map(s => s['service-definitionId']));
        })
        .catch(error => console.error('Failed to fetch services:', error));
    },
    fetchServiceDescriptions(ids) {
  fetch('http://localhost:3000/service-definitions')
    .then(response => response.json())
    .then(definitions => {
      definitions.forEach(def => {
        if (ids.includes(def.id)) {
          this.serviceDescriptions[def.id] = def.descr;
        }
      });
      // Depois de atualizar o objeto, se você está usando Vue 3, pode ser necessário
      // forçar a atualização para garantir que a reatividade seja capturada.
      this.serviceDescriptions = { ...this.serviceDescriptions };
    })
    .catch(error => console.error('Failed to fetch service definitions:', error));
},

      fetchVehicleDetails() {
        const id = this.$route.params.idv; // Captura o ID da URL
        fetch(`http://localhost:3000/vehicles`)
          .then(response => response.json())
          .then(data => {
            const foundVehicle = data.find(v => v.id === id);
            if (foundVehicle) {
              this.vehicle = foundVehicle;
              this.fetchDono(foundVehicle.dono); // Agora chamamos fetchDono com o ID do dono apropriado
            } else {
              console.error("Vehicle not found");
            }
          })
          .catch(error => {
            console.error("Failed to fetch vehicle details:", error);
          });
      }
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
    flex-grow: 1; /* Permite que a lista cresça dentro do card */

  }
  
  /* detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center ; 
    width: 100%;
    margin-bottom: 50px; 
  } */
  
  .detail {
    justify-content: space-between; 
    align-items: center; 
    width: 100%; 
    margin-bottom: 0.5vh; 
    flex-grow: 1; 
    font-family: "Ovo";
    font-size: clamp(1.5rem, 2vw, 2rem); 
    color: var(--color-dark); 
    margin-left: 5.5vw;
  }
  .table-container {
  width: 80vh; 
  max-height: 15vh;
  overflow-y: auto; 
  margin-left: 25vh;
  margin-top: 3vh;
  table-layout: fixed;
}


table {
  width: 100%;
}

table, th, td {
  border: 1px solid black;
}

thead {
  display: table-header-group;
  background-color: #f2f2f2;
}


thead th {
  background-color: #f2f2f2; /* Cor de fundo para o cabeçalho da tabela */
}


th, td {
  width: 50%; /* Divide igualmente a largura entre as colunas */
  font-size: 1vw;
  text-align: left;
  padding: 0.5vw; /* Espaçamento interno nas células */
  height: 5.2vh;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9; /* Cor de fundo alternada para linhas */
}
  </style>
  