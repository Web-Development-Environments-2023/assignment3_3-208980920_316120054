<!-- <template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'About' }">About</router-link>|
      <span v-if="!$root.store.username">
        Hello Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        <b-dropdown text="info" class="m-2" variant="success" size="sm">
          <b-dropdown-item id="options" to="{ name: 'option1' }">My favoriteis</b-dropdown-item>
          <b-dropdown-item id="options" to="{ name: 'option2' }">My recipes</b-dropdown-item>
          <b-dropdown-item id="options" to="{ name: 'option3' }">My family recipes</b-dropdown-item>
        </b-dropdown>
       <div id="user-name"> hello {{ $root.store.username }}  <button class="logoutButton" @click="Logout">Logout</button></div> 
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {  },
  name: "App",
  methods: {
    Logout() {
      console.log(this.$root.store);
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
  background-color: #42b983;
  font-size: 1.2em;
  text-align: center;
  display: flex;
  justify-content: center;

}

#nav a {
  font-weight: bold;
  color: white;
  
}


#nav a.router-link-exact-active {
  color:white;
 
}
#user-name{
  margin-left: auto;
  margin-right: 0;
  display: inline-block;
  align-items: left;
}
.logoutButton{
  background-color: #42b983;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    background-color: #2c3e50;
  }
}
span{
  font-size: 1.2em;
  color:white;
  font-weight: bold;

}
#options{
  color:black
}
</style>
 -->
 
 <template>
  <div id="app">
   <div>
  <b-navbar toggleable="lg" class="barnav">

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
     Logout() {
       console.log(this.$root.store);
       this.$root.store.logout();
       this.$root.toast("Logout", "User logged out successfully", "success");
 
       this.$router.push("/").catch(() => {
         this.$forceUpdate();
       });
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

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
.barnav{
  background: #42b983;
  font-size: 1.2em;
}
.item-nav{
  color:white;
  font-weight: bold;
}

 </style>


