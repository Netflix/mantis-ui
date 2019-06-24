<template>
  <div :class="$style['resource-bar-container']">
    <div
      :class="$style['resource-bar-container-innerbar']"
      :style="{ width }"
    />

    <div :class="$style['info-bar']">
      <strong><a href="">RavenConnectorJob</a></strong>
      Job Count: <strong><a href="blah">443</a></strong> Total CPUs:
      <strong>2640</strong> Total Memory: <strong>8.24 TB</strong>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ResourceBar',

  props: {
    width: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" module>
.resource-bar-container {
  position: relative;
  background-color: var(--primary-050);
  height: 32px;
  border-radius: var(--large-border-radius);
  width: 100%;

  &-innerbar {
    @extend .resource-bar-container;
    height: 100%;
    background-color: var(--neutral-300);
  }

  .info-bar {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    margin: 0 0.5em;
    padding: 0 0.5em;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: var(--large-border-radius);
    border: 1px solid white;
    font-size: var(--text-2);
  }
}
</style>
