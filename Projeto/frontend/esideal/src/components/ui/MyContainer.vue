<template>
    <div class="container">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyContainer',
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    background-color: var(--color-dark); 
  }
  </style>
  