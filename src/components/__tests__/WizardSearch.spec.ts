import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import WizardSearch from '../wizard-search/WizardSearch.vue';

const wrapper = shallowMount(WizardSearch);
describe('WizardSearch', () => {
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should start-loading when user types "res"', async () => {
    const searchInput = wrapper.find<HTMLInputElement>('input[type="text"]');

    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.find('.display-text').exists()).toBe(true);

    await searchInput.setValue('res');

    expect(searchInput.element.value).toMatch('res');
    expect(wrapper.vm.isLoading).toBe(true);
    expect(wrapper.find('.display-text').exists()).toBe(false);
  });
});
