<template>
  <!-- Display a text input for user to search -->
  <div
    class="d-flex flex-column align-items-center justify-content-center mt-4"
  >
    <input
      type="text"
      class="form-control rounded-0"
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      v-model="query"
      @input="search"
      autocomplete="off"
      placeholder="Search..."
    />
    <!-- Display the search results if there are any -->
    <h3 class="bg-white p-2 text-primary border border-primary mt-5">
      Results
    </h3>
    <div
      class="results-container box-shadow d-flex flex-wrap overflow-auto justify-content-center"
    >
      <div
        class="d-flex justify-content-center align-items-center"
        v-if="results.length === 0"
      >
        <div v-if="isLoading" class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
        <div v-else class="display-text">
          {{ displayText }}
        </div>
      </div>
      <div
        class="card card-hover shadow-md text-center mb-3 mx-3 w-75 w-md-33 rounded-0"
        v-for="(result, index) in results"
        :key="index"
      >
        <div
          class="card-body d-flex flex-column shadow justify-content-between"
          @click="showDetails(result)"
        >
          <h5 class="card-title font-weight-bold">{{ result.API }}</h5>
          <small class="text-muted"> ({{ result.Category }}) </small>
          <p class="card-text mt-3">{{ result.Description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue';
import store from '../../stores/store';

// Define the interface for a search result
interface Result {
  API: string;
  Auth: string;
  Description: string;
  Category: string;
  Link: string;
}

export default defineComponent({
  name: 'WizardSearch',

  setup(props, context: SetupContext) {
    // Create a reactive variable to store the search query
    const query = ref('');
    // Create a reactive array to store the search results
    const results = ref<Result[]>([]);
    // Create a reactive variable to store the selected result
    const selectedResult = ref<Result | null>(null);
    const displayText = ref('No Results.');
    // Create a reactive variable to indicate if the search is in progress
    const isLoading = ref(false);

    // Show the details of a selected result
    const showDetails = (payload: Result) => {
      // Dispatch an action to update the selected result in the store
      store.dispatch('updateResult', payload);
      // Emit an event to show the details component
      context.emit('showDetails');
    };

    // Search for results based on the query
    const search = async (): Promise<void> => {
      // Don't search if query is less than 3 characters
      if (query.value.length < 3) {
        displayText.value = 'No Results.';
        results.value = [];
        return;
      }
      try {
        isLoading.value = true;
        // Fetch the search results from the API
        const response = await fetch(
          `https://api.publicapis.org/entries?description=${query.value}`
        );
        const data = await response.json();
        isLoading.value = false;
        results.value = data.entries ?? [];
        displayText.value = 'No Results.';
      } catch (e) {
        isLoading.value = false;
        displayText.value = 'Whoops an error occured.';
      }
    };

    return {
      query,
      results,
      selectedResult,
      search,
      showDetails,
      displayText,
      isLoading,
    };
  },
});
</script>
<style lang="scss" scoped>
@import './wizards-search.styles.scss';
</style>
