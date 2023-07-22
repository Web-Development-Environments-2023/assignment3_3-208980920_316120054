<template>
  <div class="container">
    <h3 class="title">Create an account</h3>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        
        label-for="username"
      >
        <b-form-input
          class="input"
          placeholder="Enter username"
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>
    <b-form-group
      id="input-group-firstName"
      
      label-for="firstName"
    >
    <b-form-input
    class="input"
    placeholder="Enter first name"
      id="firstName"
      v-model="$v.form.firstName.$model"
      type="text"
      :state="validateState('firstName')"
    ></b-form-input>
    <b-form-invalid-feedback v-if="!$v.form.firstName.required">
      First Name is required
    </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="input-group-lastName"
      
      label-for="lastName"
    >
    <b-form-input
    class="input"
    placeholder="Enter last name"
      id="lastName"
      v-model="$v.form.lastName.$model"
      type="text"
      :state="validateState('lastName')"
    ></b-form-input>
    <b-form-invalid-feedback v-if="!$v.form.lastName.required">
      Last Name is required
    </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="input-group-email"
      
      label-for="email"
    >
    <b-form-input
    class="input"
    placeholder="Enter email"
      id="email"
      v-model="$v.form.email.$model"
      type="text"
      :state="validateState('email')"
    ></b-form-input>
    <b-form-invalid-feedback v-if="!$v.form.email.required">
      Email is required
    </b-form-invalid-feedback>
    </b-form-group>
      <b-form-group
        id="input-group-country"
        
        label-for="country"
      >
        <b-form-select
        class="input"
        placeholder="Select a country"
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        
        label-for="password"
      >
        <b-form-input
        class="input"
          placeholder="Enter password"
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.specialCharacter">
          Have at least one special character
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.number">
          Have at least one number
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        
        label-for="confirmedPassword"
      >
        <b-form-input
        class="input"
          placeholder="Confirm password"
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        class="ml-5"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>

  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "Select a Country", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: {
        required
      },
      lastName: {
        required
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        //check if contains at least one speacial character
        specialCharacter: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
        //check if contains at least one number
        number: (value) => /\d/.test(value),
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
    }
  }
  },

  mounted() {

    this.countries.push(...countries);

  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        console.log("register method called");
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          this.$root.store.server_domain + "/Register",

          {
            username: this.form.username,
            password: this.form.password,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            country: this.form.country,
            email: this.form.email,
          }
        );
        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }

};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
.title{
  font-size: 2.5rem;
  text-align: center;

}
.input {
  border-radius: 30px; 
  padding: 8px 15px; 
  width: 70%;
  margin-right: 10rem;
  max-width: 400;
  margin-left:5rem;
  
}
.btn-primary {
  background-color: #42b983;
  border: none; 
  color: white; 
  border-radius: 3rem;
  margin-right: 0.5rem;
  width:45%
  
}
.btn-primary:hover {
  background-color: #2b7a4b; 
}
.btn-danger{
  border-radius: 3rem;
  margin-left: 5rem;
}
.custom-select{
  line-height: 1;
  width:70%;
}
.mt-2{
  text-align: center;
  margin-top: 1rem;
}
</style>
