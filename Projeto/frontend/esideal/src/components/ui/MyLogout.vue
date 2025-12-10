<template>
  <button :style="positionStyle" @click="logout" class="logout-button">Logout</button>
</template>

<script>
export default {
  name: 'LogoutButton',
  methods: {
    logout() {
      // Aqui você irá implementar a lógica de logout, como apagar tokens e redirecionar
      console.log('Logging out');
      this.$router.push('/login');
      // this.$router.push('/login'); // Por exemplo, redirecionando para a página de login
    }
  },
  props: {
        top: {
            type: Number,
            default: 13
        },
        right: {
            type: Number,
            default: 18
        },
      },
    computed: {
        positionStyle() {
            return {
                top: this.top + 'vh',
                right: this.right + 'vw',
            };
        }
    },
};
</script>

<style scoped>
.logout-button {
  position: absolute;
  height: 3.25rem; 
  width: 9.75rem; 
  font-size: 1.625rem;
  font-weight: bold;
  font-family: "Judson";
  padding: 0.5em 1em;
  background-color: var(--color-warm);
  border: none;
  border-radius: 3px;
  color: var(--color-light);
  cursor: pointer;
}
</style>
