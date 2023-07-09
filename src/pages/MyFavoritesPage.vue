<template>
  <div>
    <h1 class="title">My Favorites</h1>
    <RecipePreviewList :recipes="recipes" :title="title" :isApi="false"></RecipePreviewList>

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
              console.log(response);
              const recipes = response.data;
              this.recipes = [];
              this.recipes.push(...recipes);
              // console.log(this.recipes);
            } catch (error) {
              console.log(error);
            }
          }
    }

}
</script>

<style>

</style>