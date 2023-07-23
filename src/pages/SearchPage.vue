<template>
  <div class="container">
    <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        <label for="searchInput" class="sr-only">Search</label>
        <input type="text" v-model="form.query" class="form-control" id="searchInput" placeholder="Search recipes" required>
        <b-dropdown id="filter" text="Filter" variant="filterButton" class="button-20" size="sm">
          <div class="filter-section">
            <label for="numResults" class="filter-label">Number of Results:</label>
            <select v-model="numberofresults" id="numResults" class="filter-select">
              <option disabled value="choose">Choose</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div class="filter-section">
            <label class="filter-label">Select Cuisines:</label>
            <b-form-select v-model="selectedOptionsCuisines" :options="cuisines" multiple class="filter-select"></b-form-select>
          </div>
          <div class="filter-section">
            <label class="filter-label">Select Diets:</label>
            <b-form-select v-model="selectedOptionsDiets" :options="diets" multiple class="filter-select"></b-form-select>
          </div>
          <div class="filter-section">
            <label class="filter-label">Select Intolerances:</label>
                        RecipePreviewList
            <b-form-select v-model="selectedOptionsIntolerances" :options="intolerances" multiple class="filter-select"></b-form-select>
          </div>
        </b-dropdown>
      </div>
      <button id="search" @click="Search" type="submit" class="button-20" >Search</button>
    </form>
    <div class="spancontainer">
    <span v-if="!searched && this.lastQuery && $root.store.username" @click = "SearchLast" class="clicklastsearch" title = "Include last filters">Last search: {{ this.lastQuery.charAt(0).toUpperCase()+this.lastQuery.slice(1) }}</span> 
    </div>
    <div v-if = "searched">
      <b-dropdown  text="Sort by" variant="success" class="filter-dropdown">
        <div class="sort-section">
          <label class="sort-label">Sort by:</label>
          <b-form-select v-model="selectedOptionsSort" :options="this.sort_by" class="filter-select"></b-form-select>
        </div>
        <button @click="sort_recipes" type="submit"> apply</button>
      </b-dropdown>
    </div>
    <RecipePreviewList v-if= "!emptyRecipes" :recipes="recipes" :isApi="true"></RecipePreviewList>
    
      

    <div v-else>
      <h1 class="title">No Recipes Founded :( </h1>
    </div>
  </div>
</template>

<script>
import diets from "../assets/diets.js";
import cuisines from "../assets/cuisines.js";
import intolerances from "../assets/intolerances.js";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { get } from "http";
import Cookies from "js-cookie";

export default({
  components: {
    RecipePreviewList
  },
  name: "Login",
  data() {
    return {
      form: {
        query: "",
        diet: [],
        cuisine: [],
        intolerance:[],
        filter: false,
        submitError: undefined
      },
      lastQuery: "",
      diets: [],
      cuisines: [],
      numberofresults: 5,
      intolerances: [],
      selectedOptionsCuisines: [],
      selectedOptionsDiets: [],
      selectedOptionsIntolerances: [],
      recipes: [],
      emptyRecipes: false,
      searched: false,
      sort_by: ["Popularity: low to high", "Popularity: high to low", "Preperation time: low to high", "Preperation time: high to low"],
      selectedOptionsSort: [],
    };
  },
  created(){
    if (Cookies.get("lastSearch") != undefined)
      this.lastQuery = Cookies.get("lastSearch").substring(2,Cookies.get("lastSearch").length-2);
  },
  mounted() {
   
    this.diets.push(...diets);
    this.cuisines.push(...cuisines);
    this.intolerances.push(...intolerances);
  },
  methods:{
    SearchLast(){
      this.form.query = this.lastQuery;
      this.selectedOptionsCuisines = Cookies.get("cuisine").substring(2,Cookies.get("cuisine").length-2).split(",");
      this.selectedOptionsDiets = Cookies.get("diet").substring(2,Cookies.get("diet").length-2).split(",");
      this.selectedOptionsIntolerances = Cookies.get("intolerances").substring(2,Cookies.get("intolerances").length-2).split(",");
      this.numberofresults = Cookies.get("numberofrecipes").substring(2,Cookies.get("numberofrecipes").length-2);
      this.Search();
    },
    closeDropdown() {
      const dropdown = this.$refs.dropdown;
      dropdown.hide();
    },
    sort_recipes(){
      if (this.selectedOptionsSort=="Popularity: low to high"){
        this.recipes.sort(function(a,b){
          return a.popularity-b.popularity;
        });
        
      }
      else if (this.selectedOptionsSort=="Popularity: high to low"){
        this.recipes.sort(function(a,b){
          return b.popularity-a.popularity;
        });
      }
      else if (this.selectedOptionsSort=="Preperation time: low to high"){
        this.recipes.sort(function(a,b){
          return a.readyInMinutes-b.readyInMinutes;
        });
      }
      else if (this.selectedOptionsSort=="Preperation time: high to low"){
        this.recipes.sort(function(a,b){
          return b.readyInMinutes-a.readyInMinutes;
        });
      }

    },
    get_string_from_list(list){
      let string="";
      if (list.length==1){
        string=list[0];
      }
      else{
      for (var i = 0; i < list.length-1; i++) {
        string+=list[i]+",";
      }
        string+=list[list.length-1];
      }
      return string;
    },
    async Search() {
        try {
          const cuisines = this.get_string_from_list(this.selectedOptionsCuisines);
          const diets = this.get_string_from_list(this.selectedOptionsDiets);
          const intolerances = this.get_string_from_list(this.selectedOptionsIntolerances);
          

          const response = await this.axios.get(
            this.$root.store.server_domain + "/recipes/search",
            {
            params: {
              query: this.form.query,
              diet: diets,
              cuisine: cuisines,
              intolerances: intolerances,
              numberofresults: this.numberofresults,

            },
          }
          );
          this.recipes = response.data;
          if (this.recipes.length == 0){
            this.emptyRecipes = true;
            this.searched = false;
          }
          else{
            this.emptyRecipes = false;
            this.searched = true;
          }
          this.lastQuery = this.form.query;

          
        } catch (err) {
          // console.log(err.response);
          this.form.submitError = err.response.data.message;
        }
      }
    }
})
</script>
<style scoped>
.filter-dropdown {
  width: 100px;
  margin-left: 10px;
  
}

.filter-section {
  margin-bottom: 10px;
}

.filter-label {
  display: block;
  margin-bottom: 5px;
}
.button-20 {
  background-color: #42b983;
  border: none; 
  color: white; 
  width: 10vw; 
  border-radius: 3rem;
}
.button-20:hover {
  background-color: #2b7a4b; 
}
#filter{
  margin-left: 2vw;
  color: white;
}
#search{
  padding:0.5vh;
  margin-bottom:1vh;
}
.btn{
  color: white;
}
</style>
