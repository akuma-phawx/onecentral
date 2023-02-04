<template>
  <!-- Use Bootstrap classes for layout and styling -->
  <div class="mt-5 d-flex h-100 justify-content-center align-items-center">
    <div class="d-flex flex-column" style="width: 75%">
      <!-- Wizard Steps -->
      <div class="d-flex justify-content-center">
        <!-- Step 1 -->
        <div class="step" :class="{ active: currentStep === 1 }">1. Search</div>
        <!-- Step 2 -->
        <div class="step" :class="{ active: currentStep === 2 }">
          2. Details
        </div>
        <!-- Step 3 -->
        <div class="step" :class="{ active: currentStep === 3 }">3. Submit</div>
      </div>
      <!-- Step Content -->
      <transition name="slide-fade">
        <component
          v-if="showComponent"
          @showDetails="currentStep = 2"
          @showSearch="currentStep = 1"
          @showSubmit="currentStep = 3"
          :is="
            currentStep === 1
              ? WizardSearch
              : currentStep === 2
              ? WizardDetails
              : WizardSubmit
          "
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { mysteriousFunction } from '../../utils/fancy';
import WizardDetails from '@/components/wizard-details/WizardDetails.vue';
import WizardSearch from '@/components/wizard-search/WizardSearch.vue';
import WizardSubmit from '@/components/wizard-submit/WizardSubmit.vue';

// Define the main component
export default defineComponent({
  name: 'Wizard',
  components: {
    WizardSearch,
    WizardDetails,
    WizardSubmit,
  },
  setup() {
    // Create a reactive variable to keep track of the current step
    const currentStep = ref(1);
    const showComponent = ref(false);

    watch(currentStep, () => {
      showComponent.value = false;
      setTimeout(() => {
        showComponent.value = true;
      }, 500);
    });

    onMounted(() => {
      mysteriousFunction();
      showComponent.value = true;
    });

    return {
      currentStep,
      showComponent,
      WizardSearch: WizardSearch,
      WizardDetails: WizardDetails,
      WizardSubmit: WizardSubmit,
    };
  },
});
</script>

<!-- Move the styles to a separate SCSS file -->
<style scoped>
@import './wizard.styles.scss';
</style>
