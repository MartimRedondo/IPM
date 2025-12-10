<template>
  <button :type="type" @click="onClick" :class="['button', buttonType]">
    <slot></slot>
  </button>
</template>

<script>
export default {
name: 'MyButton',
props: {
  buttonType: {
    type: String,
    default: 'primary' // Assume 'primary' como o tipo padrão
  },
  type: {
    type: String,
    default: 'button' // Define 'button' como o tipo padrão, permitindo que seja alterado para 'submit', etc.
  }
},
methods: {
  onClick(event) {
    // Emitir um evento personalizado com o evento de clique nativo
    this.$emit('click', event);
  }
}
}
</script>

<style scoped>
.button {
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
border: none;
font-family: 'Judson', serif;
}

.primary {
  background-color: var(--color-dark);
  border: none;
  color: var(--color-light);
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 1rem;
  margin: 10px auto; 
  margin-bottom: 40px;
  border-radius: 5px;
  cursor: pointer;
  height: 62px;
  width: 287px;
  font-size: 26px;
  font-family: "Judson"; 
  font-weight: bold; 
}

</style>
