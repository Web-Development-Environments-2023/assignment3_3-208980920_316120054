import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path:"/about",
    name:"About",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path:"/MyFavorites",
    name:"MyFavorites",
    component: () => import("./pages/MyFavoritesPage"),
  },
  {
    path:"/MyRecipes",
    name:"MyRecipes",
    component: () => import("./pages/MyRecipesPage"),
  },
  {
    path:"/FamilyRecipes",
    name:"FamilyRecipes",
    component: () => import("./pages/FamilyRecipesPage"),
  },
  
];

export default routes;
