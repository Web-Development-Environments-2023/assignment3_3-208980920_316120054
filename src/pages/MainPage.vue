<template>
  <div class="container">
    <br>
    <br>
    
    <router-link v-if="!$root.store.username" to="/login">
    </router-link>
    <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h3 class="MainTitle">Explore these recipes!</h3>
            <RecipePreviewList class="RandomRecipes" :isMainPage="true" :isApi="true" :recipes="recipes" />
          <br>
            <b-button variant="primary" id="RandomRecipes" @click="RandomRecipes">New Recipes</b-button>
          </b-col>
          <b-col>
            
            <div v-if="!$root.store.username" class="login-container">
              <h1 class="logintitle">Login</h1>
              <LoginCard ></LoginCard>
            </div>
            <div v-else>
              <h3 class="MainTitle">My Last Viewed Recipes</h3>
              <RecipePreviewList :isMainPage="true" :recipes="viewed_recipes" :isApi="false"/>
            </div>
          </b-col>
          
        </b-row>
      </b-container>
    

  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginCard from "../components/LoginCard";
export default {
  components: {
    RecipePreviewList,
    LoginCard
  },
  data() {
    return {
      recipes: [],
      viewed_recipes: []
    };
  },
  mounted() {
    this.RandomRecipes();
    this.getLastViewed();
  },
  computed(){
    this.getLastViewed();
  },
  methods: {
    async RandomRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/Random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        // console.log(error);
      }
    },
    async getLastViewed(){
      try{
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/get_last_viewed",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );
        const recipes = response.data;
        this.viewed_recipes = [];
        this.viewed_recipes.push(...recipes);
      }catch(error){
        // console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin-right:  100px ;
}
.MainTitle{
  margin-left:1.2rem;
}
.blur {
  -webkit-filter: blur(5px); 
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.logintitle{
  text-align: center;
}
.login-container {
  border: 1px solid #ccc; 
  border-radius: 10px; 
  padding: 20px; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); 


}
.login-container .logintitle {
  text-align: center;
  margin-bottom: 15px;
  color: #333; 
}
.btn-primary {
  background-color: #42b983; 
  border: none; 
  color: white; 
  margin-left:2.5rem;
  width: 40%; 
  border-radius: 3rem;

}
#RandomRecipes{
  margin-bottom: 1.5rem;
}
.btn-primary:hover {
  background-color: #2b7a4b; 
}
.row{
  margin-bottom: 10px;
  margin-left:0px;
  margin-right:0px;
}
</style>
