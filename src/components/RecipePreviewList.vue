<template>
  <b-container>
    <b-row v-if="!isMainPage">
      <b-col cols="4" v-for="(r, index) in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" :isApi="isApi" :isMyPage="isMyPage" />
        <!-- Add a conditional line break after every 3 recipes -->
        <br v-if="index % 3 === 2 && index !== recipes.length - 1" />
      </b-col>
    </b-row>
    <b-col v-else>
      <b-row v-for="recipe in recipes" :key="recipe.id">
        <RecipePreview class="recipePreview" :recipe="recipe" :isApi="isApi" :isMyPage="isMyPage"/>
        <br>
      </b-row>
      </b-col>
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
    recipes: {
      type: Array,
      required: true
    },
    isApi: {
      type: Boolean,
      required: true,
      default: false
    },
    isMainPage: {
      type: Boolean,
      required: false,
      default: false
    },
    isMyPage:{
      type:Boolean,
      reqiured:false,
      defaule:false
    }
  },
  mounted(){
  }

  
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

</style>
