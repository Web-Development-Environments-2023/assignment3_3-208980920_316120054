<template>
    <div class="containertal">
    <div class="recipe-preview">
      <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.recipeId } }"
        class="recipe-image-container" 
      >
        <img :src="recipe.image" @error="handelImageError" class="recipe-image" />
      </router-link>
      <div class="recipe-details">
        <div title="To full info" class="recipe-title">
          <router-link
            :to="{ name: 'recipe', params: { recipeId: recipe.recipeId } }"
            class="title-link" 
          >
            {{ recipe.title }}
          </router-link>
        </div>
  
        <div class="tag-container">
          <i
            v-if="recipe.vegetarian"
            class="fas fa-leaf vegetarian-tag"
            title="Vegetarian"
          ></i>
          <i
            v-else
            class="fas fa-bacon non-vegetarian-tag"
            title="Non Vegetarian"
          ></i>
          <i
            v-if="recipe.vegan"
            class="fas fa-seedling vegan-tag"
            title="Vegan"
          ></i>
          <i
            v-else
            class="fas fa-egg non-vegan-tag"
            title="Non Vegan"
          ></i>
          <i
            v-if="recipe.glutenFree"
            class="fas fa-seedling gluten-free-tag"
            title="Gluten Free"
          ></i>
          <i
            v-else
            class="fas fa-times-circle not-gluten-free-tag"
            title="Not Gluten Free"
          ></i>
        </div>
      </div>
      <div class="recipe-details">
        <ul class="recipe-overview">
          <li><i class="fa-solid fa-clock"></i> {{ recipe.readyInMinutes }} minutes</li>
          <li><i class="fa-solid fa-thumbs-up"></i> {{ recipe.popularity }}</li>
          <li v-if="isApi && recipe.favorite" title="saved as favorite"><i class="fa-solid fa-star"></i></li>
          <li v-else-if="isApi && !recipe.favorite"><i @click="addToFavorite" class="fa-regular fa-star unfavorite" title="unfavorite"></i></li> 
          <li v-if="recipe.viewed" title="viewed"><i class="fa-regular fa-eye"></i></li>
          <li v-else><i class="fa-regular fa-eye-slash" title="not viewed"></i></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLeaf, faBacon, faSeedling, faEgg } from '@fortawesome/free-solid-svg-icons';

// Register the icons
library.add(faLeaf, faBacon, faSeedling, faEgg);

export default {
  data(){
    return {
      defualtImage: "https://th.bing.com/th/id/OIP.DB6nJ3r-5ucZvWBBflZ0mQHaCr?pid=ImgDet&rs=1",
    }
  },
  methods:{
  
    handelImageError(e){
      e.target.src = this.defualtImage;
    },
    async addToFavorite(){
      this.favorite = true;
      try {
        console.log("add to favorite method called");
        console.log(this.recipe);
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
        console.log(response);
        if (response.status == 200)
          this.recipe.favorite = true;
      } catch (err) {
        console.log(err.response);
      }
    },
  },

  props: {
    recipe: {
      type: Object,
      required: true
    },
    isApi: {
      type: Boolean,
      required: true
    }

  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  color: #154658; /* Set text color to black */
}

.recipe-preview > .recipe-body {
  width: 100%;
  height: 100%;
  position: relative;
}

.recipe-preview .recipe-image-container {
  width: 100%;
  height: 50%;
  position: relative;
}

.recipe-preview .recipe-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.recipe-preview .tag-container {
  position: absolute;
  top: 10px;
  right: 10px;
}

.recipe-preview .tag-container i {
  font-size: 18px;
  margin-left: 5px;
}

.recipe-preview .vegetarian-tag {
  color: green; /* Set color to green for vegetarian */
}

.recipe-preview .non-vegetarian-tag {
  color: red; /* Set color to red for non-vegetarian */
}

.recipe-preview .vegan-tag {
  color: blue; /* Set color to blue for vegan */
}

.recipe-preview .non-vegan-tag {
  color: orange; /* Set color to orange for non-vegan */
}

.recipe-preview .gluten-free-tag {
  color: green; /* Set color to green for gluten-free */
}

.recipe-preview .not-gluten-free-tag {
  color: red; /* Set color to red for not gluten-free */
}

.recipe-preview .recipe-details {
  width: 100%;
  height: 50%;
  padding: 10px;
  box-sizing: border-box;
}
.title-link{
  font-size: 1.5rem;
  color: #154658;
  ; 
}
.recipe-title{
  transition: transform 0.3s ease-in-out
}
.recipe-title:hover{
  transform: scale(1.1);
  cursor: pointer;
}

.recipe-preview .recipe-footer .recipe-title {
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: flex;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
.recipe-preview .recipe-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out; /* Add transition effect */
}

.recipe-preview .recipe-image:hover {
  opacity: 0.7; /* Reduce opacity on hover */
}
.unfavorite{
  transition: transform 0.3s ease-in-out; 
}
.unfavorite:hover{
  transform: scale(1.5);
  cursor: pointer;
}
</style>
