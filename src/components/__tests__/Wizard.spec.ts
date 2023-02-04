import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Wizard from '../wizard/Wizard.vue';

const wrapper = shallowMount(Wizard);
describe('Wizard', () => {
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
