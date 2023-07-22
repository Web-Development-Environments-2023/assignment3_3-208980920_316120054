<template>
    <div class="container">
        <h3>Ingredients</h3>
        <div>
            <ul class="ingredient-list">
                <li class="bullet" v-for="(ingredient,index) in ingredients" :key="index"> <strong>{{ index.charAt(0).toUpperCase()+index.slice(1) }}</strong>: {{ ingredient }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
props: {
    ingredients: {
        type: Object,
        required: true
    }
},

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
.ingredient-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 10px; 
  padding: 0; 
  margin:1rem;

}

</style>