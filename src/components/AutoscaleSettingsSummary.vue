<template>
  <div>
    Autoscale settings:
    <strong>{{ scalingPolicy.min }}</strong> min,
    <strong>{{ scalingPolicy.max }}</strong> max,
    <strong>{{ scalingPolicy.increment }}</strong>
    increment,
    <strong>{{ scalingPolicy.decrement }}</strong>
    decrement,
    <strong>{{ scalingPolicy.coolDownSecs }}s</strong>
    cooldown
  </div>
</template>

<script>
export default {
  name: 'AutoscaleSettingsSummary',

  props: {
    scalingPolicy: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" module></style>
