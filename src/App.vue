<template>
  <div :id="$style.app">
    <el-container direction="vertical">
      <TopNav v-if="loggedIn" class="stretch-x" :user-name="userName" @on-click-logout="logout" />
      <el-main>
        <el-alert
          v-for="message in errorMessages"
          :key="message"
          :class="$style['error-alert']"
          :title="message"
          type="error"
        />
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  Alert,
  Container,
  Main,
} from 'element-ui';
import Vue from 'vue';
import store from '@/store';
import TopNav from '@/components/TopNav.vue';
import { ActionTypes } from '@/store/actions';
import { mapGetters, mapState } from 'vuex';

export default Vue.extend({
  name: 'App',

  components: {
    [Container.name]: Container,
    [Main.name]: Main,
    [Alert.name]: Alert,
    TopNav,
  },

  computed: {
    ...mapState({
      userName: state => state.user.name,
      errorMessages: state => {
        return new Set(
          state.metadata.globalErrors.map(
            error => error.message || error.error || error,
          ),
        );
      },
    }),
    ...mapGetters(['loggedIn']),
  },

  methods: {
    logout() {
      store.dispatch(ActionTypes.LogoutUser);
      store.dispatch(ActionTypes.SetMantisMasters, []);
      this.$router.push('/login');
    },
  },
});
</script>

<style lang="scss" module>
#app {
  display: flex;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: var(--text-base);
  font-weight: var(--text-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-stroke: .33px rgba(0,0,0,.33);
  text-align: center;
}

.error-alert {
  margin: 0.25em;
}
</style>
