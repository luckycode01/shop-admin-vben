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
          pageSizeOptions: ['3', '6', ' 9', '12'],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共${total}条`,
          onChange: handleChangePage,
        }"
      >
        <template #index="{ index, column }">
          <template v-if="column.dataIndex === 'index'">
            {{ index + 1 }}
          </template>
        </template>
        <template #operation="{ column }">
          <template v-if="column.dataIndex === 'operation'">
            <Button type="primary" :size="size">修改</Button>
            <Button danger :size="size" class="ml-20px">删除</Button>
          </template>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { SizeType } from 'ant-design-vue/lib/config-provider';
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
      slots: { customRender: 'index' },
    },
    {
      title: '品牌',
      dataIndex: 'name',
      className: '!text-center w-200px',
      width: 'width',
    },
    {
      title: 'logo图标',
      className: '!text-center ',
      dataIndex: 'age',
      width: 'width',
    },
    {
      title: '操作',
      className: '!text-center w-80px',
      width: 200,
      dataIndex: 'operation',
      fixed: 'right',
      slots: { customRender: 'operation' },
    },
  ];

  const dataSource = [];

  const current = ref<number>(1);
  const pageSize = ref<number>(3);
  const total = ref<number>(100);
  const size = ref<SizeType>('small');

  const handleChangePage = (current, pageSize) => {
    console.log(current, pageSize);
  };
</script>

<style lang="less" scoped></style>
