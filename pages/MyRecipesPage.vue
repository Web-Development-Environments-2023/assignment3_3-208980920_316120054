<template>
    <div>
        <h1 class="title">My Recipes</h1>
        <div v-if="this.recipes.length>0">
            <RecipePreviewList :recipes="this.recipes" :isApi="false" :isMyPage="true" /> 
        </div>
        <div class="notfoundrecipes" v-else>
            <h3 >No recipes found</h3>
            <div>You are welcome to add your own recipes in the 'New Recipe' section above</div>
        </div>
    </div>

</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
export default {
    name: "MyRecipesPage",
    components: {
        RecipePreviewList
    },
    data(){
        return {
            recipes: [],
            title: "My Recipes",
        }
    },
    mounted() {
        this.updateRecipes();
    },
    methods:{
        async updateRecipes() {
            try {
              const response = await this.axios.get(
                this.$root.store.server_domain + "/users/MyRecipes",
                {
                });
              const recipes = response.data;
              this.recipes = [];
              this.recipes.push(...recipes);
            } catch (error) {
            //   console.log(error);
            }
          }
    }


}
</script>


<style>
.title {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size:5rem;
}
.notfoundrecipes{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>