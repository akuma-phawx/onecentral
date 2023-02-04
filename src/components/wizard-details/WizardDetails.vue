<template>
  <div
    class="wizard-details-container card border-0 w-100 mt-2 shadow-lg rounded-0 p-4"
  >
    <h1>API:</h1>
    <p>{{ selectedResult?.API }}</p>
    <h2>Description</h2>
    <p>{{ selectedResult?.Description }}</p>

    <a class="result-link" :href="selectedResult?.Link"> <h4>Link</h4></a>
    <div class="details-button-container d-flex justify-content-evenly mt-5">
      <button
        @click="$emit('showSearch')"
        type="button"
        class="btn btn-outline-primary rounded-0 btn-lg"
      >
        Back
      </button>
      <button
        @click="$emit('showSubmit')"
        type="button"
        class="btn btn-secondary rounded-0 btn-lg"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'WizardDetails',

  setup() {
    const store = useStore();

    return {
      selectedResult: store.state.selectedResult,
    };
  },
});
</script>
<style scoped>
@import './wizard-details.styles.scss';
</style>
