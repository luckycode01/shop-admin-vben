<template>
  <Tooltip placement="top">
    <template #title>
      <span>{{ title }}</span>
    </template>
    <Button v-bind="$attrs.opt"
      >{{ btnText }}
      <slot name="icon"> </slot>
    </Button>
  </Tooltip>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'HintButton',
  });
</script>
<script lang="ts" setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
  });
</script>
<style lang="less" scoped>
  .ant-btn {
    margin-right: 10px;
  }
</style>
