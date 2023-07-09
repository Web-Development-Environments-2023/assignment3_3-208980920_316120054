<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        <label for="searchInput" class="sr-only">Search</label>
        <input type="text" v-model="form.query" class="form-control" id="searchInput" placeholder="Search recipes" required>
        <b-dropdown text="Filter" variant="filterButton" class="filterButton" size="sm">
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
      <button @click="Search" type="submit" class="button-20" >Search</button>
    </form>
    <div class="spancontainer">
    <span v-if="!searched" @click = "SearchLast" class="clicklastsearch" title = "Include last filters">Last search: {{ this.lastQuery.charAt(0).toUpperCase()+this.lastQuery.slice(1) }}</span> 
    </div>
    <div v-if = "searched">
      <b-dropdown  text="Sort by" variant="primary" class="filter-dropdown">
        <div class="sort-section">
          <label class="sort-label">Sort by:</label>
          <b-form-select v-model="selectedOptionsSort" :options="this.sort_by" class="filter-select"></b-form-select>
        </div>
        <button @click="sort_recipes" type="submit"> apply</button>
      </b-dropdown>
    </div>
    <RecipePreviewList v-if= "!emptyRecipes" :title="titles"  :recipes="recipes" :isApi="true"></RecipePreviewList>
    
      

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
      numberofresults: 1,
      intolerances: [],
      selectedOptionsCuisines: [],
      selectedOptionsDiets: [],
      selectedOptionsIntolerances: [],
      recipes: [],
      titles:"Founded Recipes",
      emptyRecipes: false,
      searched: false,
      sort_by: ["Popularity: low to high", "Popularity: high to low", "Preperation time: low to high", "Preperation time: high to low"],
      selectedOptionsSort: [],
    };
  },
  created(){
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
      console.log(this.recipes,this.selectedOptionsSort);
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
          console.log("search method called");
          const cuisines = this.get_string_from_list(this.selectedOptionsCuisines);
          const diets = this.get_string_from_list(this.selectedOptionsDiets);
          const intolerances = this.get_string_from_list(this.selectedOptionsIntolerances);
          console.log(cuisines,diets,intolerances,this.numberofresults)
          

          const response = await this.axios.get(
            // "https://test-for-3-2.herokuapp.com/user/Register",
            this.$root.store.server_domain + "/recipes/search",
            {
            params: {
              query: this.form.query,
              diet: diets,
              cuisine: cuisines,
              intolerances: intolerances,
              numberofresults: this.numberofresults,
              //diet: this.form.diet,
              //  cuisine: this.form.cuisine,
              //  intolerances: this.form.intolerances,
            },
          }
          );
          console.log(response);
          this.recipes = response.data;
          console.log(this.recipes);
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
          console.log(err.response);
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

.filterButton {
  appearance: button;
  background-color: #42b983;
  background-image: linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));
  border: 1px solid #42b983;
  border-radius: 1rem;
  box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0 inset,rgba(46, 54, 80, 0.075) 0 1px 1px;
  box-sizing: border-box;
  color: #b03838;
  cursor: pointer;
  display: inline-block;
  font-family: Inter,sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  margin: 0 0 0 1rem ;
  padding: .3rem .3rem;
  text-align: center;
  text-transform: none;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  ;
}

.filterButton:focus:not(:focus-visible),
.filterButton:focus {
  outline: 0;
}

.filterButton:hover {
  background-color: #1aa508;
  border-color: #1aa508;
}

.filterButton:focus {
  background-color: #1aa508;
  border-color: #1aa508;
  /* box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0 inset, rgba(46, 54, 80, 0.075) 0 1px 1px, rgba(104, 101, 235, 0.5) 0 0 0 .2rem; */
}

.filterButton:active {
  background-color: #1aa508;
  background-image: none;
  border-color: #1aa508;
  box-shadow: rgba(46, 54, 80, 0.125) 0 3px 5px inset;
}

.filterButton:active:focus {
  box-shadow: rgba(46, 54, 80, 0.125) 0 3px 5px inset, #1aa508 0 0 0 .2rem;
}

.filterButton:disabled {
  background-image: none;
  box-shadow: none;
  opacity: .65;
  pointer-events: none;
}


.filter-select {
  width: 100%;
}
.clicklastsearch:hover{
  cursor: pointer;
  text-decoration: underline;
}
.title{
  text-align: center;
  margin-top: 5vh;
  
}
.form-inline{
  display: flex;
  justify-content: center;
  margin-top: 10vh;
}
.form-control{
  width: 30vw;
  border-radius: 50px;
}
.spancontainer{
  text-align: left;
  margin-left: 19vw;
  margin-top: 1vh;

}

.button-20 {
  appearance: button;
  background-color: #42b983;
  background-image: linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));
  border: 1px solid #42b983;
  border-radius: 1rem;
  box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0 inset,rgba(46, 54, 80, 0.075) 0 1px 1px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: Inter,sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
  padding: .5rem 1rem;
  text-align: center;
  text-transform: none;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  margin-bottom: 0.3rem;
}

.button-20:focus:not(:focus-visible),
.button-20:focus {
  outline: 0;
}

.button-20:hover {
  background-color: #1aa508;
  border-color: #1aa508;
}

.button-20:focus {
  background-color: #1aa508;
  border-color: #1aa508;
  /* box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0 inset, rgba(46, 54, 80, 0.075) 0 1px 1px, rgba(104, 101, 235, 0.5) 0 0 0 .2rem; */
}

.button-20:active {
  background-color: #1aa508;
  background-image: none;
  border-color: #1aa508;
  box-shadow: rgba(46, 54, 80, 0.125) 0 3px 5px inset;
}

.button-20:active:focus {
  box-shadow: rgba(46, 54, 80, 0.125) 0 3px 5px inset, #1aa508 0 0 0 .2rem;
}

.button-20:disabled {
  background-image: none;
  box-shadow: none;
  opacity: .65;
  pointer-events: none;
}

</style>
