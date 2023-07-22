<template>
  <div class="container">
    
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
      >
        <b-form-input
          class="input"
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          placeholder="Enter username"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
      >
        <b-form-input
          id="Password"
          class="input"
          type="password"
          placeholder="Enter password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register">Register here</router-link>
      </div>
      <b-button
        type="submit"
        variant="primary"
        class="mt-3"
      >Login</b-button>

    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "LoginCard",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async login() {
      try {
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          this.$root.store.server_domain + "/Login",
          // "http://localhost:3000" +"/Login",
          // "http://132.72.65.211:80/Login",
          // "http://132.73.84.100:80/Login",

          {
            username: this.form.username,
            password: this.form.password,
          }
        );
        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.login();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 400px;
  margin: 0 auto;


  @media (max-width: 600px) {
    max-width: 90%;
  }

  @media (max-width: 400px) {
    max-width: 100%;
  }
}

.title {
  text-align: center; 
  margin-bottom: 1.5rem; 
}

.b-form-group {
  justify-content: center;
  text-align: center;
  margin-bottom: 1.5rem; 
}

.b-button {
  border-radius: 30px; 
  padding: 10px 15px;
  font-weight: bold; 
  width: 100%;
  margin: 0 auto; 
  margin-left:10000rem;
  display: flex;
}
.btn-primary {
  background-color: #42b983;
  border: none; 
  color: white; 
  margin-left:5rem;
  width: 50%; 
  border-radius: 3rem;
}
.btn-primary:hover {
  background-color: #2b7a4b; 
}
.mt-2 {
  margin-top: 1.5rem; 
  margin-left:0.5rem
}


.input {
  border-radius: 30px; 
  padding: 10px 15px; 
  width: 100%; 
  margin-right: 100rem;
  
}


.b-form-invalid-feedback {
  color: #dc3545; 
  font-size: 0.9rem;
}
</style>
