<template>
  <div class="container">

    <FullRecipeView :recipe="this.recipe"></FullRecipeView>
  </div>
</template>

<script>
import FullRecipeView from "../components/fullRecipeView.vue";
export default {
  name: "ViewRecipePage",
  components: {
    FullRecipeView,
    
},
  data() {
    return {
      recipe: null,
      id:null
      
    };
  },
   created() {
    
    
  },
   async mounted(){
   await this.getRecipeDetails();
    
  },
  methods:{
    async getRecipeDetails(){
      try {
      console.log("created function in view recipe page");
      let response;
      // await new Promise(resolve =>setTimeout(resolve,1000));
      if(typeof this.$route.params.recipeId ==="number" ){

      
      console.log("this.$route ",this.$route);
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.server_domain + `/recipes/${this.$route.params.recipeId}`,

        );
      
      this.recipe = response.data;
      }
      else{
        console.log("my page: ", this.$route.params.recipeId);
        this.recipe = this.$route.params.recipeId;
      }
      console.log("recipe response: ",response);
    //  if (response.status !== 200) this.$router.replace("/NotFound");
      if(this.recipe == null || this.recipe == undefined){
        this.$route.replace("/NotFound");
      }
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

    }


  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

</style>
