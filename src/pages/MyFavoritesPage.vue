<template>
  <div>
    <h1 class="title">My Favorites</h1>
    <RecipePreviewList v-if="this.recipes.length>0" :recipes="this.recipes" :isApi="false"></RecipePreviewList>
    <div v-else>
      <h3>No recipes found</h3>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
export default {
  name: "MyFavoritePage",
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
                this.$root.store.server_domain + "/users/favorites"
                );
              const recipes = response.data;
              this.recipes = [];
              this.recipes.push(...recipes);
            } catch (error) {
              console.log(error);
            }
          }
    }

}
</script>

<style>

</style>