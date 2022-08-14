<template>
  <div>
    <Card>
      <Button type="primary">
        <template #icon><plus-outlined /></template>
        添加品牌
      </Button>
      <Table
        :dataSource="dataSource"
        :columns="columns"
        :pagenation="{
          current,
          pagesize,
          total,
          pageSizeOptions: [3, 6, 9, 12],
          showQuickJumpr: true,
          showSizeChanger: true,
          showTotal: (total) => `总共${total}条`,
        }"
      >
      </Table>
    </Card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  // 为了定义组件名称
  export default defineComponent({
    name: 'Trademark',
  });
</script>

<script lang="ts" setup>
  import { Button, Card, Table } from 'ant-design-vue';
  import { PlusOutlined } from '@ant-design/icons-vue';

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const current = ref<number>(1);
  const pagesize = ref<number>(3);
  const total = ref<number>(100);
</script>

<style lang="less" scoped></style>
