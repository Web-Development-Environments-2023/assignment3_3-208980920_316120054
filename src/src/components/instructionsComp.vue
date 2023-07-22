<template>
    <div class="container">
      <h3>Instructions</h3>
      <div class="step-instruction" v-for="(item, index) in instructions_list" :key="index">
        <div v-if="item">
        <h5><strong>Step {{ index + 1 }}</strong></h5>
        <p>{{ item }}</p>
    </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data: () => ({
      instructions_list: []
    }),
    props: {
      instructions: {
        type: String,
        required: true
      }
    },
    created() {
        const cleanedInstructions = this.instructions.replace(/<[^>]+>/g, '');
        this.instructions_list = cleanedInstructions.split(". ");
    }
  };
  </script>
  
  <style scoped>
  .container {
    width: 80%;
    font-family: 'libre franklin', sans-serif;
    margin: 0 auto;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .step-instruction {
    margin-bottom: 1rem;
  }
  
  h5 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
  
  p {
    margin: 0;
  }
  </style>
  