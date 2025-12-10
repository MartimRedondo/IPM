<template>
  <MyContainer>
    <MyCard class="small-card">
      <MyArrow :top="30" :left="25.5" :specialAction="shouldPerformSpecialAction"/>
      <div v-if="serviceDetails">
        <MyTitle class="welcome-title">{{ serviceDetails.descr }}</MyTitle>
        <h1 class="plain-text">Insira em baixo notas pertinentes:</h1>
        <textarea class="input-field"  v-model="editedDescription"/>
        <MySecButton class="suspend-button" @click="updateServiceDescription">{{this.$route.params.action}}</MySecButton>
        <MySecButton class="clear-button" @click="clearForm">Clear</MySecButton>
      </div>
    </MyCard>
  </MyContainer>
</template>


<script>
import MyContainer from '@/components/ui/MyContainer.vue';
import MyCard from '@/components/ui/MyCard.vue';
import MySecButton from '@/components/ui/MySecButton.vue';
import MyTitle from '@/components/ui/MyTitle.vue';
import MyArrow from '@/components/ui/MyArrow.vue';

export default {
  name: 'EditNotasView',
  data() {
    return {
      serviceDetails: null, // Aqui vamos armazenar os detalhes do serviço
      editedDescription: '', // Aqui vamos armazenar a descrição editada
    };
  },
  components: {
    MyContainer,
    MyCard,
    MySecButton,
    MyTitle,
    MyArrow,
  },
  methods: {
    shouldPerformSpecialAction() {
    // Substitua esta condição pela sua lógica específica
    return this.serviceDetails && this.serviceDetails.needSpecialAction;
  },
    fetchServiceDetails() {
      const serviceId = this.$route.params.ids;
      fetch(`http://localhost:3000/services`)
        .then(response => response.json())
        .then(services => {
          const service = services.find(s => s.id === serviceId);
          this.editedDescription = service.descrição;
          this.fetchServiceDescription(service['service-definitionId']);
        })
        .catch(error => console.error('Erro ao buscar serviços:', error));
    },

    fetchServiceDescription(serviceDefId) {
      fetch('http://localhost:3000/service-definitions')
        .then(response => response.json())
        .then(serviceDefs => {
          const serviceDef = serviceDefs.find(sd => sd.id === serviceDefId);
          if (serviceDef) {
            this.serviceDetails = { descr: serviceDef.descr };
          } else {
            this.serviceDetails = { descr: 'Descrição não disponível' };
          }
        })
        .catch(error => console.error('Erro ao buscar definições de serviço:', error));
    },
    clearForm() {
      this.editedDescription = '';
    },
    updateServiceDescription() {
      const serviceId = this.$route.params.ids;
      const updatedService = {
        // ... outros campos do serviço que possam ser necessários ...
        descrição: this.editedDescription,
      };
      fetch(`http://localhost:3000/services/${serviceId}`, {
        method: 'PATCH', // ou 'PUT', dependendo do seu backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao atualizar o serviço');
        }
        return response.json();
      })
      .then(data => {
        console.log('Serviço atualizado com sucesso:', data);
      })
      .catch(error => {
        console.error('Erro ao atualizar serviço:', error);
      });
      this.$router.push('/PaginaInicial');
    },
  },
  created() {
    this.fetchServiceDetails();
  }
}
</script>

  
<style scoped>
.small-card {
  width: 46.875vw; 
  height: 39.17vh; 
  padding: 2vw;
  flex-direction: column;
  align-items: flex-start;
}

.welcome-title {
  height: 10vh; 
  margin-top: 8vh; 
  margin-left: 3vw; 
}

.plain-text {
  position: relative;
  margin-top: 8vh; 
  margin-left: 1.5vw; 
  bottom: 9vh; 
  left: 10vw; 
  font-size: 1.5vw; 
}

.input-field {
  width: 41.67vw; 
  height: 13.89vh; 
  padding: 0.5em; 
  background: var(--color-dark); 
  border: 1px solid rgba(255, 255, 255, 0.4); 
  border-radius: 0.5vw; 
  font-size: clamp(1rem, 1.1vw, 1.5rem); 
  color: #ffffff; 
  position: relative;
  bottom: 8vh; 
  left: 2vw; 
}

.suspend-button {
  border: 1px solid #ffffff; 
  color: #ffffff; 
  background-color: var(--color-dark); 
  position: relative;
  left: 15.36vw;
  bottom: 6vh; 
}

.clear-button {
  border: 1px solid #000000; 
  color: #000000; 
  background-color: var(--color-light); 
  position: relative;
  left: 18.23vw; 
  bottom: 6vh; 
}

</style>
