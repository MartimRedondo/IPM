<template>
  <MyContainer>
    <MyCard class="small-card">
      <MyTitle class="login-title">Bem-vindo à E.S.Ideal!</MyTitle>
      <form @submit.prevent="loginButtonText === 'CLEAR' ? clearForm() : login()" class="login-form">
        <div>
          <label for="employee-number" class="form-label">Número de funcionário:</label>
          <input class="input-field" id="employee-number" type="text" required placeholder="Digite seu número de funcionário" v-model="employeeNumber"/>
        </div>
        <div>
          <label for="password" class="form-label">Password:</label>
          <input class="input-field" id="password" type="password" required placeholder="Digite sua senha" v-model="password"/>
        </div>
        <MyButton type="submit" class="login-button">
          {{ loginButtonText }}
        </MyButton>
        <p v-bind:style="{ visibility: loginError ? 'visible' : 'hidden', opacity: loginError ? 1 : 0 }" class="error-message">
  Número de funcionário ou Password incorretos, tente novamente
</p>
      </form>
    </MyCard>
  </MyContainer>
</template>

<script>
import MyContainer from '@/components/ui/MyContainer.vue';
import MyCard from '@/components/ui/MyCard.vue';
import MyButton from '@/components/ui/MyButton.vue';
import MyTitle from '@/components/ui/MyTitle.vue';

export default {
  name: 'LoginView',
  components: {
    MyContainer,
    MyCard,
    MyButton,
    MyTitle,
  },
  data() {
    return {
      employeeNumber: '',
      password: '',
      loginError: false,
      loginButtonText: 'LOGIN'
    };
  },
  methods: {
    login() {
      if (this.loginButtonText === 'LOGIN') {
        this.loginError = false;
        fetch(`http://localhost:3000/employes?id=${this.employeeNumber}`)
          .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar dados');
            return response.json();
          })
          .then(data => {
            const validUser = data.find(user => user.id === this.employeeNumber && user.pw === this.password);
            if (validUser) {
              this.$router.push('/PaginaInicial');
            } else {
              this.loginError = true;
              this.loginButtonText = 'CLEAR';
            }
          })
          .catch(error => {
            console.error("Erro ao tentar logar", error);
            this.loginError = true;
            this.loginButtonText = 'CLEAR';
          });
      }
    },
    clearForm() {
      this.loginError = false;
      this.loginButtonText = 'LOGIN';
      this.employeeNumber = '';
      this.password = '';
    }
  }
}
</script>
<style scoped>
.small-card{
  width: 30vw; 
  height: 35vw;

}
.login-title {
  text-align: center;
  margin-top: 3vh; 
  margin-bottom: 10vh; 
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1vh;
  position: relative; 
}

.form-label {
  font-family: "Ovo"; 
  font-size: 1.8vw;
  display: block;
}

.login-button {
  width: 30%; 
  margin-top: 2vh; 
}

.error-message {
  color: var(--color-warm);
  font-family: "Ovo";
  position: absolute;
  bottom: 90px; 
  left: 0;
  right: 0;
  text-align: center; 
  visibility: hidden; 
  opacity: 0; 
  transition: visibility 0s linear 0.3s, opacity 0.3s linear; 
  font-size: 24px;
}

.input-field {
  width: 27vw; 
  height: 3vh; 
  padding: 1vw;
  background: var(--color-dark);
  border: 1px solid rgba(255, 255, 255, 0.4); 
  border-radius: 0.2vw;
  font-size: clamp(0.8rem, 1vw, 1.2rem);
  color: #ffffff; 
  margin-bottom: 4vh; 
}


</style>
