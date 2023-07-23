<template>
    <div class="container">
        <h3>Ingredients</h3>
        <div v-if = "isObject" >
            <ul class="ingredient-list">
                <li class="bullet" v-for="(ingredient,index) in total_ingredients" :key="index"> <strong>{{ index.charAt(0).toUpperCase()+index.slice(1) }}</strong>: {{ ingredient }}</li>
            </ul>
        </div>
        <div v-else >
            <ul class="ingredient-list">
                <li class="bullet" v-for="(ingredient,index) in total_ingredients" :key="index"> {{ ingredient }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
        isObject:true,
        total_ingredients:[],
        }
    },
props: {
    ingredients: {
        type: Object,
        required: true
    }
},
mounted(){
    if (typeof this.ingredients === "string"){
        this.isObject = false;
        this.total_ingredients = this.ingredients.split(",");
    }
    else{
        this.total_ingredients = this.ingredients
    }
}

}
</script>

<style scoped>
.container{
    justify-content: left;
    align-content: left;
    background: #edf5e1;
    border-radius: 2rem;
    width:100%;
    font-family: 'libre franklin', sans-serif;
    padding: 1rem;
}
.bullet::marker{
    color:#42b983;
}
.bullet{
    justify-content: space-between;
}
.ingredient-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 20px; 
  padding: 0; 
  margin:1rem;

}

</style>