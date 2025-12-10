<template>
    <MyContainer>
      <MyCard class="large-card">
        <MyArrow/>
        <MyLogout/>
        <MyTitle class="welcome-title">Serviços em Curso</MyTitle>
        <div class="scroll">
        <ul class="services-list">
          <li v-for="service in services" :key="service.id" class="service-item">
            <div class = "service-info" ><strong>Matrícula:</strong> {{ service.vehicleId }} - {{ service.descr }}</div>
            <MySecButton class="detail-button" :id="service.id" @detailsClick="verDetalhes(service.id, service.vehicleId)">Detalhes</MySecButton>
            <MySecButton class="end-button" :id="service.id" @detailsClick="terminarServico(service.id, service.vehicleId)" >Terminar</MySecButton>
            <MySecButton class="suspend-button" :id="service.id" @detailsClick="suspenderServico(service.id, service.vehicleId)">Suspender</MySecButton>
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
    name: 'PaginaInicial',
    components: {
      MyContainer,
      MyCard,
      MyArrow,
      MyTitle,
      MyLogout,
      MySecButton
    },
    created() {
  this.fetchServiceDefinitions();
  this.fetchServices();
},
data() {
    return {
        services: [],
        serviceDefinitions: {}
    };
},
    methods: {
      terminarServico(serviceId, vehicleId) {
  const dataAtual = new Date().toISOString(); // Data e hora atuais em formato ISO
  fetch(`http://localhost:3000/services/${serviceId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      estado: 'realizado',
      dataRealizacao: dataAtual // Adiciona a data e hora atuais ao serviço
    })
  })
  .then(() => {
    this.fetchServices(); // Atualiza a lista de serviços
  })
  .catch(error => {
    console.error("There was an error completing the service:", error);
  });
  this.$router.push(`/notas/${serviceId}/${vehicleId}/Terminar`);
},
      suspenderServico(serviceId, vehicleId,) {
        fetch(`http://localhost:3000/services/${serviceId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            estado: 'parado'
          })
        })
        .then(() => {
          this.fetchServices();
        })
        .catch(error => {
          console.error("There was an error starting the service:", error);
        });
        this.$router.push(`/notas/${serviceId}/${vehicleId}/Suspender`);
      },
      verDetalhes(serviceId, vehicleId) {
        this.$router.push(`/detalhess/${serviceId}/${vehicleId}`);
      },
      fetchServices() {
      fetch('http://localhost:3000/services')
        .then(response => response.json())
        .then(data => {
          const filteredServices = data.filter(service => service.estado == 'em curso');
          this.services = filteredServices.map(service => ({
            ...service,
            descr: this.serviceDefinitions[service['service-definitionId']]?.descr || 'Descrição não disponível',
            // A matrícula já está presente como vehicleId, não é necessário buscar de outro endpoint.
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
      })
      .catch(error => {
        console.error("There was an error fetching the service definitions data:", error);
      });
  },
},
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
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
  width: 34vw;
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
.end-button {
  border: 1px solid #ffffff;
  color: #ffffff;
  background-color: var(--color-warm);
  position: absolute;
  margin-left: 46vw;
}
.suspend-button {
  border: 1px solid #ffffff;
  color: #ffffff;
  background-color: var(--color-dark);
  position: absolute;
  margin-left: 38vw;
}
  </style>
  