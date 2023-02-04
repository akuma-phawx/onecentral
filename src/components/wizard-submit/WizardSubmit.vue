<template>
  <div
    class="wizard-submit-container card border-0 w-100 mt-2 shadow-lg rounded-0 p-4"
  >
    <form @submit.prevent="submitHandler">
      <div class="mb-3">
        <label for="firstName" class="form-label">First Name</label>
        <input
          type="text"
          class="custom-fcontrol rounded-0 col-12 col-md-8 col-lg-6"
          id="firstName"
          v-model="formData.firstName"
          autocomplete="nope"
        />
        <span v-if="v$.firstName.$error">Value First Name is Required</span>
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input
          type="text"
          class="custom-fcontrol rounded-0 col-12 col-md-8 col-lg-6"
          id="lastName"
          v-model="formData.lastName"
          autocomplete="nope"
        />
        <span v-if="v$.lastName.$error">Value Last Name is Required</span>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="custom-fcontrol rounded-0 col-12 col-md-8 col-lg-6"
          id="email"
          aria-describedby="emailHelp"
          v-model="formData.email"
        />
        <span v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>

        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="submit-buttons-container d-flex justify-content-evenly">
        <button
          @click="$emit('showDetails')"
          type="button"
          class="btn btn-outline-primary rounded-0 btn-lg"
        >
          Back
        </button>
        <button type="submit" class="btn btn-success rounded-0 btn-lg">
          Submit
        </button>
      </div>
    </form>
    <!-- Modal -->
    <div class="modal" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn close" @click="showModal = false">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>Well done {{ formData.firstName }} {{ formData.lastName }},</h5>
            <hr />
            <div class="lead">
              a confirmation email will be sent at
              <span class=""> {{ formData.email }} </span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="showModal = false"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- backdrop -->
    <div class="backdrop" v-if="showModal"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { required, email } from '@vuelidate/validators';
import useVuelidate, { ValidationArgs } from '@vuelidate/core';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

export default defineComponent({
  name: 'WizardSubmit',

  setup() {
    const showModal = ref(false);

    // create a reactive object for form data
    const formData = reactive<FormData>({
      firstName: '',
      lastName: '',
      email: '',
    });

    // define the validation rules for form data
    const rules: ValidationArgs<FormData> = {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        required,
        email,
      },
    };

    // create a Vuelidate instance with the rules and form data
    const v$ = useVuelidate<FormData>(rules, formData);

    // submit handler for form
    const submitHandler = async (): Promise<void> => {
      // validate form data
      const isValidated = await v$.value.$validate();

      // if form data is valid, show the modal and log success message
      if (isValidated) {
        showModal.value = true;
        console.log('Form Submitted Successfully');
      }
    };

    return {
      showModal,
      formData,
      v$,
      submitHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './wizard-submit-styles.scss';
</style>
