import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asegure-se de que este é um roteador Vue 3
import './assets/styles/global.css';

// Importe os componentes
import MyContainer from './components/ui/MyContainer.vue';
import MyCard from './components/ui/MyCard.vue';
import MyButton from './components/ui/MyButton.vue';
import MyTitle from './components/ui/MyTitle.vue';
import MyLogout from './components/ui/MyLogout.vue';
import MyArrow from './components/ui/MyArrow.vue';

// Crie a aplicação
const app = createApp(App);

// Registre componentes globais
app.component("MyButton", MyButton);
app.component("MyCard", MyCard);
app.component("MyContainer", MyContainer);
app.component("MyTitle", MyTitle);
app.component("MyArrow", MyArrow);
app.component("MyLogout", MyLogout);

// Use o router
app.use(router);

// Monte a aplicação
app.mount('#app');
