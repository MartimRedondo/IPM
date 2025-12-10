<template>
  <button class="details-button" @click="$emit('detailsClick', id)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['id'] // Modificado de 'vehicleId' para 'id'
}
</script>
  
  <style scoped>
.details-button {
  height: 3.5vh; 
  width: 7.3vw; 
  padding: 0.5vh 0.5vw; 
  font-size: 1vw; 
  font-weight: bold;
  border-radius: 0.5vw; 
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s, color 0.2s;
}

  </style>
  