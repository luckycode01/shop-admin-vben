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
        bordered
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
        :pagination="{
          current,
          pageSize,
          total,
          pageSizeOptions: [3, 6, 9, 12],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共${total}条`,
          onChange: handleChangePage,
        }"
      >
        <template #bodyCell="{ record, index, column, text }">
          <template v-if="column.dataIndex === 'age'"
            >{{ record }}---------{{ index }}++++ {{ column }}-------{{ text }}
          </template>
        </template>
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
      dataIndex: 'index',
      className: '!text-center w-80px',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
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
  const pageSize = ref<number>(3);
  const total = ref<number>(100);

  const handleChangePage = (current, pageSize) => {
    console.log(current, pageSize);
  };
</script>

<style lang="less" scoped></style>
