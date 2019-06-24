import { createLocalVue, mount } from '@vue/test-utils'
import TopNav from '@/components/TopNav';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter();

describe('TopNav.vue', () => {
  it('sets the correct default data', () => {
    expect(typeof TopNav.data).toBe('function');
    const defaultData = TopNav.data();
    expect(defaultData.backgroundColor).toBe('#800000');
    expect(defaultData.textColor).toBe('white');
    expect(defaultData.activeTextColor).toBe(getComputedStyle(
      document.documentElement,
    ).getPropertyValue('--yellow-500'));
  });

  it('displays the header title and username', () => {
    const userName = 'Mantis User';
    const wrapper = mount(TopNav, {
      router,
      localVue,
      propsData: {
        userName,
      }
    });
    expect(wrapper.find('h1').text()).toBe('Mantis');
    expect(wrapper.find('.user-controls > div.el-submenu__title').text()).toBe(userName);
  });

  it('renders the option to logout and emits on-click-logout event on click of logout', () => {
    const userName = 'Mantis User';
    const wrapper = mount(TopNav, {
      router,
      localVue,
      propsData: {
        userName,
      }
    });
    const logoutOption = wrapper.find('.user-controls li.el-menu-item');
    logoutOption.trigger('click');
    expect(wrapper.emitted()['on-click-logout'].length).toBe(1);
  });
});
