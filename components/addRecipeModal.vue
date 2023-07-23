<template>
  <div>
    
    <form @submit.prevent="onAddRecipe">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="recipe.title" required>
      </div>
      <div>
        <label for="image">Image:</label>
        <input type="text" id="image" v-model="recipe.image" required>
      </div>
      <div>
        <label for="instructions">Instructions:</label>
        <textarea id="instructions" v-model="recipe.instructions" required></textarea>
      </div>
      <div>
        <label for="ingredients">Ingredients:</label>
        <textarea id="ingredients" v-model="recipe.ingredients" required></textarea>
      </div>
      <div>
        <label for="servings">Servings:</label>
        <input type="number" id="servings" min="0" v-model="recipe.servings" required>
      </div>
      <div>
        <label for="readyInMinutes">Ready In Minutes:</label>
        <input type="number" id="readyInMinutes" min="0" v-model="recipe.readyInMinutes" required>
      </div>
      <div>
        <label for="vegan">Vegan:</label>
        <input type="checkbox" id="vegan" v-model="recipe.vegan">
      </div>
      <div>
        <label for="vegetarian">Vegetarian:</label>
        <input type="checkbox" id="vegetarian" v-model="recipe.vegetarian">
      </div>
      <div>
        <label for="glutenFree">Gluten Free:</label>
        <input type="checkbox" id="glutenFree" v-model="recipe.glutenFree">
      </div>
            <div>
        <label for="favorite">Favorite:</label>
        <input type="checkbox" id="favorite" min="0" v-model="recipe.favorite">
      </div>
      
      
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: {
        title: '',
        readyInMinutes: 0,
        image: '',
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        viewed: 0,
        favorite: false,
        servings: 0,
        instructions: '',
        ingredients: ''
      }
    };
  },
  methods: {
    async AddRecipe() {
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/CreateRecipe",

          {
            title: this.recipe.title,
            instruction:this.recipe.instructions,
            vegetarian: this.recipe.vegetarian,
            portion: this.recipe.servings,
            preparation_time: this.recipe.readyInMinutes,
            ingredients: this.recipe.ingredients,
            vegan: this.recipe.vegan,
            gluten_free: this.recipe.glutenFree,
            image:this.recipe.image,
            favorite: this.recipe.favorite,
          }
        );
      //create alert that recipe was added successfully
      alert("Recipe added successfully!");
      //close the modal when I click on ok
      this.$emit("formSubmitted")
    
      } catch (err) {
        this.reset();
        alert("There is a problem with the recipe's data");
        
      }
    },
    onAddRecipe() {
      this.AddRecipe();
    },
    reset(){
      this.recipe = {
        title: '',
        readyInMinutes: 0,
        image: '',
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        viewed: 0,
        favorite: false,
        servings: 0,
        instructions: '',
        ingredients: ''
    }
  }
  }

};

</script>

<style scoped>
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 5px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input[type="text"],
  textarea,
  input[type="number"]
   {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
    input[type="checkbox"] {
    margin-left: 10px; 
  }

  
  button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin: 0 auto;
    display: block;
  }

  button[type="submit"]:hover {
    background-color: #45a049;
  }
</style>
