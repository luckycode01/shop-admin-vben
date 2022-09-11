<template>
  <div>
    <Card>
      <Row :gutter="24">
        <Col span="8">
          <input-search
            v-model:value="productKey"
            :placeholder="'请输入商品信息'"
            enter-button
            clear
            allow-clear
            @search="handleSearch"
            @change="handleSearch"
            @pressEnter="handleSearch"
          />
        </Col>
        <Col span="6">
          <Button type="primary" @click="toAddOrEditProd">
            <template #icon><plus-outlined /></template>
            添加商品
          </Button>
        </Col>
      </Row>

      <Table
        :dataSource="productList"
        :row-key="(record) => record.id"
        :columns="columns"
        bordered
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
        :pagination="{
          current,
          pageSize,
          total,
          pageSizeOptions: ['10', '20', '50', '100'],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共${total}条`,
          onChange: handleChangePage,
          onShowSizeChange: handSizeChange,
        }"
      >
        <template #index="{ index, column }">
          <template v-if="column.dataIndex === 'index'">
            {{ index + 1 }}
          </template>
        </template>
        <template #create_time="{ text, column }">
          <template v-if="column.dataIndex === 'createTime'">
            {{ dateFormat(text) }}
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
  import { defineComponent, ref, onMounted } from 'vue';
  import { SizeType } from 'ant-design-vue/lib/config-provider';
  // 为了定义组件名称
  export default defineComponent({
    name: 'Trademark',
  });
</script>

<script lang="ts" setup>
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { productParamsInfo, UsersListListModel } from '/@/api/product/model/productModel';
  import { getProductListApi } from '/@/api/product/product';
  import { dateFormat } from '/@/utils/dateFormat';
  import { useRouter } from 'vue-router';
  import _ from 'lodash';

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      className: '!text-center w-80px',
      slots: { customRender: 'index' },
    },
    {
      title: '商品名称',
      dataIndex: 'goods_name',
      className: '!text-center w-200px',
      width: 'width',
      ellipsis: false,
    },
    {
      title: '商品价格（元）',
      className: '!text-center ',
      dataIndex: 'goods_price',
      width: '150px',
    },
    {
      title: '商品重量（kg）',
      className: '!text-center ',
      dataIndex: 'goods_weight',
      width: '150px',
    },
    {
      title: '创建时间',
      className: '!text-center ',
      dataIndex: 'add_time',
      width: '150px',
      slots: { customRender: 'create_time' },
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
  const router = useRouter();
  const current = ref<number>(1);
  const pageSize = ref<number>(10);
  const total = ref<number>(100);
  const size = ref<SizeType>('small');
  const loading = ref<boolean>(false);
  const productKey = ref<string>('');
  const productList = ref<UsersListListModel>();

  const handleSearch = _.debounce(() => {
    getUserList();
  }, 600);
  const getUserList = async () => {
    let params: productParamsInfo = {
      query: productKey.value,
      pagenum: current.value,
      pagesize: pageSize.value,
    };
    loading.value = true;
    const res = await getProductListApi(params);
    if (res.meta.status == 200) {
      productList.value = res.data && res.data.goods;
      total.value = res.data.total;
    }
    loading.value = false;
  };
  const toAddOrEditProd = () => {
    router.push({
      name: 'addOrEditProd',
      query: {},
    });
  };
  const handSizeChange = (currentPage, size) => {
    if (currentPage == 1) current.value = currentPage;
    else current.value = 1;
    pageSize.value = size;
    getUserList();
  };

  const handleChangePage = (currentPage, size) => {
    current.value = currentPage;
    pageSize.value = size;
    getUserList();
  };
  onMounted(() => {
    getUserList();
  });
</script>

<style lang="less">
  .ant-table-wrapper {
    margin-bottom: 24px;
  }
</style>
