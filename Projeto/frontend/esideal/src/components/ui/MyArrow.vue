<template>
     <div :style="positionStyle" class="arrow-container" @click="goBack">
      <svg
        width="48" 
        height="48" 
        viewBox="0 0 48 48" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="arrow-icon"
      >
        <!-- Círculo maior -->
        <circle cx="24" cy="24" r="20" fill="var(--color-warm)" />
        <!-- Linha horizontal da seta ajustada para o círculo maior -->
        <line x1="14" y1="24" x2="34" y2="24" stroke="white" stroke-width="3" stroke-linecap="round" />
        <!-- Ponta da seta ajustada para o círculo maior -->
        <path
          d="M14 24l8-8m-8 8l8 8"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
</template>
  <script>
  export default {
    name: 'MyArrow',
    methods: {
      goBack() {
        if (this.specialAction) {
        this.performSpecialAction();
      } else {
        this.$router.go(-1); // Comportamento normal de voltar
      }
      },
      performSpecialAction() {
      const serviceId = this.$route.params.ids; // Pega o ID do serviço da URL
      fetch(`http://localhost:3000/services`)
        .then(response => response.json())
        .then(services => {
          const service = services.find(s => s.id === serviceId);
          if (service) {
            service.estado = "em curso";
            fetch(`http://localhost:3000/services/${serviceId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ estado: "em curso" })
            })
            .then(() => {
              this.$router.go(-1); // Retorna após a atualização
            })
            .catch(error => console.error('Erro ao atualizar serviço:', error));
          }
        })
        .catch(error => console.error('Erro ao buscar serviços:', error));
    }
  },
    props: {
        top: {
            type: Number,
            default: 13
        },
        left: {
            type: Number,
            default: 18
        },
        specialAction: {
      type: Boolean,
      default: false // Por padrão, não executa a ação especial
    }
      },
    computed: {
        positionStyle() {
            return {
                top: this.top + 'vh',
                left: this.left + 'vw',
            };
        }
    },
  };
  </script>
  
  <style scoped>

  

  
  .arrow-icon {
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .arrow-icon:hover {
    transform: translateX(-2px);
  }

  .arrow-container {
    position: absolute;
    cursor: pointer;
  }
  </style>

  
  