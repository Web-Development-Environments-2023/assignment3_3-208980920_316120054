<template>
  <div class="container-page"> 

    <h1 class="title">{{ this.recipe.title }}</h1>

    <div class="container">
        <div class="allIcons">
            <div class="icon" title="popularity"><i class="fa-solid fa-thumbs-up"></i> {{ recipe.popularity }}</div>
            <div class="icon"  v-if="recipe.favorite" title="saved as favorite"> <i class="fa-solid fa-star"></i></div>
            <div class="icon" v-else-if="!recipe.favorite"><i @click="addToFavorite" class="fa-regular fa-star unfavorite" title="unfavorite"></i></div>
            <div class="icon"><i class="fa-solid fa-bowl-rice" title="servings"></i> {{ recipe.servings }}</div>
            <div class="icon"><i class="fa-regular fa-clock" title="ready in minutes"></i> {{ recipe.readyInMinutes }} min.</div>
            <div v-if="recipe.vegetarian" class="icon" ><i class="fas fa-leaf vegetarian-tag" title="Vegetarian"></i></div>
            <div v-else class="icon"><i class="fa-solid fa-cow" title="Non Vegetarian"></i></div>
            <div v-if="!recipe.vegan" class="icon"><i class="fas fa-egg non-vegan-tag" title="Non Vegan"></i></div>
            <div v-else class="icon"><i class="fas fa-seedling vegan-tag" title="Vegan"></i></div>
            <div v-if="recipe.glutenFree" class="icon"><i class="fa solid fa-wheat-awn gluten-free-tag" title="Gluten Free"></i></div>
            <div v-else class="icon"><i class="fa solid fa-wheat-awn-circle-exclamation" title="Not Gluten Free"></i></div>
        </div>
        <div v-if="this.recipe.owner">
          <p>Recipe by <strong>{{ this.recipe.owner}}</strong></p>
        </div>
        <img :src="recipe.image" @error="handelImageError" class="recipe-image" />
        <div class="timeRecommended" v-if="this.recipe.owner">
            <p><strong>The recommendation for preparing the recipe is at the following events - {{ this.recipe.appointed_time }}</strong></p>
        </div>
        <ingredientsComp :ingredients="recipe.ingredients"></ingredientsComp>
        <instructionsComp class="insructionsClass" :instructions="recipe.instructions"></instructionsComp>

    </div>
  </div>
           
</template>

<script>
import ingredientsComp from './ingredientsComp.vue';
import instructionsComp from './instructionsComp.vue';

export default {
  components: { ingredientsComp,instructionsComp },
    props: {
        recipe: {
            type: Object,
            required: true
        }
    },
    methods: {
        handelImageError(e) {
            e.target.src = "https://th.bing.com/th/id/OIP.DB6nJ3r-5ucZvWBBflZ0mQHaCr?pid=ImgDet&rs=1";
        },
        async addToFavorite(){
            this.favorite = true;
            try {
                if(this.recipe.id == undefined){
                this.recipe.id = this.recipe.recipeId;
                }

                const response = await this.axios.post(
                // "https://test-for-3-2.herokuapp.com/user/Register",
                this.$root.store.server_domain + "/users/favorites",
                {
                    recipeId: this.recipe.id,
                }
                );
                if (response.status == 200)
                this.recipe.favorite = true;
            } catch (err) {
                // console.log(err.response);
            }
    },
    }
}
</script>

<style scoped>

.container-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.title {
  font-size: 4rem;
  color: #154658;
  margin-bottom: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  max-width: 800px;
}


.allIcons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  background: #edf5e1;
  border-radius: 1.5rem;
  padding: 10px;
}

.icon {
  font-size: 1.5rem;
  color: #154658;
}

.recipe-image {
  width: 100%;
  max-width: 30rem;
  height: auto;
  object-fit: cover;
  margin-bottom: 20px;
}
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.insructionsClass {
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    width: 100%;
    max-width: 800px;
  }
  .timeRecommended{
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    width: 100%;
    max-width: 800px;
  }



</style>