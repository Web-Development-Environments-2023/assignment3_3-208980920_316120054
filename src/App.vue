
 <template>
  <div id="app">
   <div>
  <b-navbar toggleable="sm" class="barnav">

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav >
        <b-nav-item :to="{ name: 'main' }" class="item-nav">Home</b-nav-item>
        <b-nav-item :to="{ name: 'About' }" class="item-nav">About</b-nav-item>
        <span v-if="!$root.store.username">
        <b-nav-item :to="{ name: 'register' }" class="item-nav">Register</b-nav-item>
        </span>
        <span v-if="!$root.store.username">
        <b-nav-item :to="{ name: 'login' }" class="item-nav">Login</b-nav-item>
        </span>
        <span v-else>
          <b-nav-item-dropdown text="Info" right class="item-nav">
          <b-dropdown-item :to="{ name: 'MyFavorites' }" class="item-nav">My Favorites</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'MyRecipes' }" class="item-nav">My Recipes</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'FamilyRecipes' }" class="item-nav">Family Recipes</b-dropdown-item>
          </b-nav-item-dropdown>

        </span>
        <span v-if="$root.store.username">
          <b-nav-item @click="toggleModal" class="item-nav">New Recipe</b-nav-item>
        <b-modal v-if="showModal" v-model="showModal"  hide-footer title="Add Recipe">
          <addRecipeModal @formSubmitted="closeModal"></addRecipeModal>
        </b-modal>
        </span>
        <b-nav-item :to="{ name: 'search' }" class="item-nav">Search</b-nav-item>
      </b-navbar-nav>
      
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <span v-if="$root.store.username">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{$root.store.username}}</em>
          </template>
          <b-dropdown-item-btn @click="Logout">Sign Out</b-dropdown-item-btn>
        </b-nav-item-dropdown>
      </span>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
<router-view />
</div>
 </template>
 
 <script>
import { Modal } from 'bootstrap';
import AddRecipeModal from './components/addRecipeModal.vue';

 export default {
   components: {AddRecipeModal },
   name: "App",
   data() {
     return {
       showModal: false
     };
   },
   methods: {
     async Logout() {
       console.log(this.$root.store);
       this.$root.store.logout();
       this.$root.toast("Logout", "User logged out successfully", "success");
       try {
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Login",
          this.$root.store.server_domain + "/Logout",

        );
       this.$router.push("/").catch(() => {
         this.$forceUpdate();
       });
     }catch (err) {
       console.log(err.response);
     }
     },
     toggleModal() {
      this.showModal = !this.showModal;
    },
    closeModal() {
      this.showModal = false;
    },
   }
 };
 </script>
 
 <style lang="scss">
@import "@/scss/form-style.scss";
.title{
  
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size:5rem;
    color: #2c3e50;
    border-radius: 3rem;
    
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 200vh;
  background: #f0f4eb;
}
.barnav{
  background: #42b983;
  font-size: 1.2rem;
  height: 60px;
}
.item-nav{
  color:white;
  font-weight: bold;
  display: fixed;
}

 </style>


