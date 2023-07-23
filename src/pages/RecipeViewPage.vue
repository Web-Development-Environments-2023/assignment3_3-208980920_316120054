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
      let response;
      if(typeof this.$route.params.recipeId ==="number" ){
        response = await this.axios.get(
          this.$root.store.server_domain + `/recipes/${this.$route.params.recipeId}`,

        );
      
      this.recipe = response.data;
      }
      else{
        this.recipe = this.$route.params.recipeId;
      }
      if(this.recipe == null || this.recipe == undefined){
        this.$route.replace("/NotFound");
      }
      } catch (error) {
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
