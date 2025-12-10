<template>
    <div class="default-card">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyCard',
  }
  </script>
  
  <style scoped>

.default-card {
  background: var(--color-light);
  border-radius: 2vw; 
  padding: 1.5vw; 
  box-shadow: 0 2vw 4vw 0 rgba(0,0,0,0.2); 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  </style>
  