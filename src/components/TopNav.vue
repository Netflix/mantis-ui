<template>
  <el-menu
    :default-active="activeLink"
    class="top-nav"
    mode="horizontal"
    :background-color="backgroundColor"
    :text-color="textColor"
    :active-text-color="activeTextColor"
    unique-opened
    router
  >
    <el-menu-item index="/">
      <h1>Mantis</h1>
    </el-menu-item>

    <el-menu-item index="/clusters">
      <template slot="title">
        Clusters
      </template>
    </el-menu-item>

    <el-menu-item index="/jobs">
      <template slot="title">
        Jobs
      </template>
    </el-menu-item>

    <el-menu-item index="/help">
      <template slot="title">
        Help
      </template>
    </el-menu-item>

    <el-submenu :class="$style['user-controls']" index="/settings">
      <template slot="title">
        {{ userName }}
      </template>
      <el-menu-item @click="handleLogout">
        Logout
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem, Submenu } from 'element-ui';

export default {
  name: 'TopNav',

  components: {
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [Submenu.name]: Submenu,
  },

  props: {
    userName: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      faBars,
      backgroundColor: '#800000',
      textColor: 'white',
      activeTextColor: getComputedStyle(
        document.documentElement,
      ).getPropertyValue('--yellow-500'),
    };
  },

  computed: {
    activeLink: function() {
      return `/${this.$route.path.split('/')[1]}`;
    },
  },

  methods: {
    handleLogout() {
      this.$emit('on-click-logout');
    },
  },
};
</script>

<style lang="scss" module>
.user-controls {
  float: right !important;
}
</style>
