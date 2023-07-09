<template>
    <div>
        <h1 class="title">My Recipes</h1>
        <RecipePreviewList :recipes="recipes" :title="title" :isApi="false"></RecipePreviewList>
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
.title {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size:5rem;
}
</style>