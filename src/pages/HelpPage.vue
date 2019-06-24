<template>
  <div class="help">
    <h2>Help</h2>

    <el-card :class="$style['help-card']" shadow="hover">
      <div slot="header" class="clearfix text-center">
        <span>Help using Mantis</span>
      </div>
      <div>
        <p>
          Check out the
          <a
            href="https://github.com/Netflix/mantis"
            target="_blank"
          >Mantis Github page</a>
          for more information!
        </p>
      </div>
    </el-card>

    <el-card :class="$style['help-card']" shadow="hover">
      <div slot="header" class="clearfix text-center">
        <span>Help using Mantis UI</span>
      </div>
      <div>
        <p>
          For bugs, issues, and new feature requests for the User Interface, open
          a new
          <a href="https://github.com/Netflix/mantis-ui/issues/new">Github issue</a>.
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Card } from 'element-ui';

export default {
  name: 'HelpPage',

  components: {
    [Card.name]: Card,
  },

  created() {
    document.title = 'Mantis - Help';
  },
};
</script>

<style lang="scss" module>
.help-card {
  margin: 1em 1em 2em 1em;
}

a {
  margin: 0;
}
</style>
