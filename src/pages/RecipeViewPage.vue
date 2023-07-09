<template>
  <div class="container">
    <RecipePreview :recipe="recipe" :isApi="false"></RecipePreview>

  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "ViewRecipePage",
  components: {
    RecipePreview
  },
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      console.log("created function in view recipe page")
      let response;
      // response = this.$route.params.response;
      // if(this.recipe.id == undefined){
      //     this.recipe.id = this.recipe.recipeId;
      //   }
      console.log("hi tal and roi" + this.$route.params.recipeId)
      const res = await this.axios.post(
        this.$root.store.server_domain + "/users/add_to_viewed",
        {
           id: this.$route.params.recipeId
        }
      );
      try {
        response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          this.$root.store.server_domain + `/recipes/${this.$route.params.recipeId}`,
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      console.log("response.data", response.data);
      // let {
      //   analyzedInstructions,
      //   instructions,
      //   extendedIngredients,
      //   aggregateLikes,
      //   readyInMinutes,
      //   image,
      //   title
      // } = response.data.recipe;

      // let _instructions = analyzedInstructions
      //   .map((fstep) => {
      //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
      //     return fstep.steps;
      //   })
      //   .reduce((a, b) => [...a, ...b], []);

      // let _recipe = {
      //   instructions,
      //   _instructions,
      //   analyzedInstructions,
      //   extendedIngredients,
      //   aggregateLikes,
      //   readyInMinutes,
      //   image,
      //   title
      // };

      // this.recipe = _recipe;
    } catch (error) {
      console.log(error);
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
/* .recipe-header{

} */
</style>
