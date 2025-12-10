<template>
  <MyContainer>
    <MyCard class="large-card">
      <MyArrow />
      <MyLogout/>
      <MyTitle class="welcome-title">Serviços Atribuídos</MyTitle>
      <MySecButton class="time-org" @click="ordenarPorDuracao">por duração</MySecButton>
      <MySecButton class="finish-org" @click="ordenarPorTermino">por término</MySecButton>
      <div class="scroll">
        <ul class="services-list">
          <li v-for="service in services" :key="service.id" class="service-item">
            <div class = "service-info" ><strong>Matrícula:</strong> {{ service.vehicleId }} - {{ service.descr }}</div>
            <MySecButton class="service-button" :id="service.id" @detailsClick="iniciarServico(service.id)">Iniciar</MySecButton>
            <MySecButton class="detail-button" :id="service.id" @detailsClick="verDetalhes(service.id, service.vehicleId)">Detalhes</MySecButton>
          </li>
        </ul>
      </div>
    </MyCard>
  </MyContainer>
</template>

<script>
import MySecButton from '@/components/ui/MySecButton.vue';
import MyContainer from '@/components/ui/MyContainer.vue';
import MyCard from '@/components/ui/MyCard.vue';
import MyArrow from '@/components/ui/MyArrow.vue';
import MyTitle from '@/components/ui/MyTitle.vue';
import MyLogout from '@/components/ui/MyLogout.vue';

export default {
name: 'AssignedServices',
components: {
  MySecButton,
  MyContainer,
  MyCard,
  MyArrow,
  MyTitle,
  MyLogout
},
data() {
  return {
    services: [],
    serviceDefinitions: {}
  };
},
created() {
  this.fetchServiceDefinitions();
  this.fetchServices();
},
methods: {
  ordenarPorDuracao() {
  if (Object.keys(this.serviceDefinitions).length === 0) {
    console.log("Definições de serviço não estão completamente carregadas.");
    return; // Interrompe a execução se os dados necessários não estiverem carregados.
  }

  console.log('Ordenando por duração', JSON.stringify(this.serviceDefinitions, null, 2));

  this.services.sort((a, b) => {
    let duracaoA = this.serviceDefinitions[a['service-definitionId']]?.duracao || Number.MAX_SAFE_INTEGER;
    let duracaoB = this.serviceDefinitions[b['service-definitionId']]?.duracao || Number.MAX_SAFE_INTEGER;
    return duracaoA - duracaoB; // Assegura que serviços sem duração definida vão para o fim da lista
  });

  this.services = [...this.services]; // Atualiza a reatividade da lista após a ordenação

  console.log('Serviços ordenados', JSON.stringify(this.services, null, 2));
},
  ordenarPorTermino() {
  this.services.sort((a, b) => {
    // Função auxiliar para validar e converter dados de data em objeto Date
    function getDate(data) {
      if (data && data.ano && data.mes && data.dia && data.hora && data.minutos) {
        return new Date(data.ano, data.mes - 1, data.dia, data.hora, data.minutos);
      }
      return null; // Retorna nulo se a data for inválida ou incompleta
    }

    let dateA = getDate(a.data);
    let dateB = getDate(b.data);

    // Ordenar primeiro por validade da data e depois pela comparação das datas
    if (!dateA && !dateB) return 0; // Ambos não têm data válida, considerados iguais
    if (!dateA) return 1; // A não tem data válida, B tem, A vai para o fim
    if (!dateB) return -1; // B não tem data válida, A tem, B vai para o fim

    // Se ambos têm datas válidas, compara as datas
    return dateA - dateB;
  });

  this.services = [...this.services]; // Atualizar a reatividade da lista
},

  iniciarServico(serviceId) {
    fetch(`http://localhost:3000/services/${serviceId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        estado: 'em curso'
      })
    })
    .then(() => {
      this.fetchServices();
    })
    .catch(error => {
      console.error("There was an error starting the service:", error);
    });
  },
  verDetalhes(serviceId, vehicleId) {
    this.$router.push(`/detalhess/${serviceId}/${vehicleId}`);
  },
  fetchServices() {
      fetch('http://localhost:3000/services')
        .then(response => response.json())
        .then(data => {
          const filteredServices = data.filter(service => service.estado == 'programado' || service.estado == 'na fila');
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
        acc[definition.id] = {
          descr: definition.descr,
          duracao: definition.duração  // Assegure que 'duracao' está sendo armazenada.
        };
        return acc;
      }, {});
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
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  width: 39.2vw; 
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

.service-button {
  border: 1px solid #ffffff;
  color: #ffffff;
  background-color: var(--color-dark);
  position: absolute;
  margin-left: 43.2vw;
}


.time-org {
  border: 1px solid var(--color-warm);
  color: var(--color-warm);
  background-color: var(--color-light);
  position: absolute;
  margin-left: 15vw;
  margin-bottom: 23vw;
}

.finish-org{
  border: 1px solid var(--color-warm);
  color: var(--color-warm);
  background-color: var(--color-light);
  position: absolute;
  margin-left: 5vw;
  margin-bottom: 23vw;
}
</style>
