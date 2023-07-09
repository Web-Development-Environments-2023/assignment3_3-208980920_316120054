<template>
  <b-container>
    <b-row>
      <b-col cols="4" v-for="(r, index) in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" :isApi="isApi" />
        <!-- Add a conditional line break after every 3 recipes -->
        <br v-if="index % 3 === 2 && index !== recipes.length - 1" />
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    },
    isApi: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  mounted() {
    // this.updateRecipes();
    console.log(this.recipes);
  },
  
  // mounted() {
  //   this.recipes
  //   this.updateRecipes();
  // },
  // methods: {
  //   async updateRecipes() {
  //     try {
  //       const response = await this.axios.get(
  //         this.$root.store.server_domain + "/recipes/random",
  //         // "https://test-for-3-2.herokuapp.com/recipes/random"
  //       );

  //       // console.log(response);
  //       const recipes = response.data.recipes;
  //       this.recipes = [];
  //       this.recipes.push(...recipes);
  //       // console.log(this.recipes);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
