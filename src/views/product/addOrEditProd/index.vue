<template>
  <steps :current="1">
    <step>
      <span slot="title">Finished</span>
      <template #title>Finished</template>
      <template #description>
        <span>This is a description.</span>
      </template>
    </step>
    <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
    <a-step title="Waiting" description="This is a description." />
  </steps>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: ' CateParams',
  });
</script>
<script lang="ts" setup></script>
<style lang="less" scoped></style>
