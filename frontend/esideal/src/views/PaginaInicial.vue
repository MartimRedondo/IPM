<template>
    <MyContainer>
      <MyCard class="large-card">
        <MyLogout/>
        <MyTitle class="welcome-title">Bem Vindo!</MyTitle>
        <div class="buttons-grid">
          <MyButton @click = "servicosAtribuidos">Serviços atribuídos</MyButton>
          <MyButton @click = "servicosemCurso">Serviços em curso</MyButton>
          <MyButton @click = "historicoServicos">Histórico de serviços</MyButton>
          <MyButton @click = "servicoSuspensos">Servicos Suspensos</MyButton>
          <MyButton @click = "listadeVeiculos">Lista de veículos</MyButton>
        </div>
      </MyCard>
    </MyContainer>
  </template>
  
  <script>
  import MyContainer from '@/components/ui/MyContainer.vue';
  import MyCard from '@/components/ui/MyCard.vue';
  import MyButton from '@/components/ui/MyButton.vue';
  import MyTitle from '@/components/ui/MyTitle.vue';
  import MyLogout from '@/components/ui/MyLogout.vue';
  
  export default {
    name: 'PaginaInicial',
    components: {
      MyContainer,
      MyCard,
      MyButton,
      MyTitle,
      MyLogout
    },
    methods: {
      servicosAtribuidos() {
        this.$router.push('/ServicosAtribuidos');
      },
      servicosemCurso() {
        this.$router.push('/ServicosCurso');
      },
      historicoServicos() {
        this.$router.push('/HistoricoServicos');
      },
      listadeVeiculos() {
        this.$router.push('/ListaVeiculos');
      },
      servicoSuspensos() {
        this.$router.push('/ServicosSuspensos');
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
  margin-top: 5vh; 
  margin-left: 4vw; 
}

  
.buttons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 1vw; 
  width: 59vw;
  margin-left: 3vw; 
  margin-bottom: 30vh; 
}
  
  
  </style>
  