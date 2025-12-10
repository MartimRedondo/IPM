<template>
    <h1 class="title">
      <slot></slot>
    </h1>
  </template>
  
  <script>
  export default {
    name: 'MyTitle',
  }
  </script>
  
  <style scoped>
.title {
  font-weight: bold; 
  font-family: "Judson"; 
  font-size: clamp(1.5rem, 2.5vw, 3rem); 
  color: var(--color-dark); 
}
  </style>
  