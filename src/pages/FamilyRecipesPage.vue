<template>
    <div>
        <h1 class="title">My Family Recipes</h1>
        <RecipePreviewList v-if="this.recipes.length>0" :recipes="this.recipes" :isApi="false" :isMyPage="true"></RecipePreviewList>
        <div class="notfoundrecipes" v-else>
        <h3 >No recipes found</h3>
        <div>no family recipes found. Ask you grandma and send as an email ;)</div>
      </div>

    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
export default {
  name: "FamilyRecipes",
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
                this.$root.store.server_domain + "/users/get_family_recipes"
                );
              const recipes = response.data;
              this.recipes = [];
              this.recipes.push(...recipes);
            } catch (error) {
              // console.log(error);
            }
          }
    }

}
</script>

<style>

.notfoundrecipes{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>