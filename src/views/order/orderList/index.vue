<template>
  <div>
    <Card>
      <Row :gutter="24">
        <Col span="6">
          <input-search
            v-model:value="orderKey"
            :placeholder="'请输入商品信息'"
            enter-button
            clear
            allow-clear
            @search="handleSearch"
            @change="handleSearch"
            @pressEnter="handleSearch"
          />
        </Col>
      </Row>

      <Table
        :dataSource="orderList"
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
          <template v-if="column.dataIndex === 'create_time'">
            {{ dateFormat(text) }}
          </template>
        </template>
        <template #pay_status="{ text, column }">
          <template v-if="column.dataIndex === 'pay_status'">
            {{ text == 0 ? '未付款' : '已支付' }}
          </template>
        </template>
        <template #operation="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <HindButton :title="'修改订单信息'" :opt="editOpt" @click="handleEditOrder()">
              <template v-slot:icon>
                <EditOutlined />
              </template>
            </HindButton>

            <popconfirm
              :title="'是否删除该订单'"
              :ok-text="'是'"
              :cancel-text="'否'"
              @confirm="confirmDelete()"
              @cancel="cancelDelete"
            >
              <HindButton :opt="deleteOpt" :title="'删除订单'" :danger="true">
                <template v-slot:icon>
                  <DeleteOutlined />
                </template>
              </HindButton>
            </popconfirm>
          </template>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, reactive } from 'vue';
  // 为了定义组件名称
  export default defineComponent({
    name: 'Trademark',
  });
</script>

<script lang="ts" setup>
  import { orderParamsInfo, orderListModel } from '/@/api/order/model/index';
  import { reqOrderListApi } from '/@/api/order/index';
  import { dateFormat } from '/@/utils/dateFormat';
  import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import _ from 'lodash';

  interface searchQuery {
    user_id?: number | string;
    pay_status?: string;
    is_send?: string;
    order_fapiao_title?: string;
    order_fapiao_company?: string;
    order_fapiao_content?: string;
    consignee_addr?: string;
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      className: '!text-center w-80px',
      slots: { customRender: 'index' },
    },
    {
      title: '订单编号',
      dataIndex: 'order_number',
      className: '!text-center w-200px',
      width: 'width',
      ellipsis: false,
    },
    {
      title: '发票分类',
      className: '!text-center ',
      dataIndex: 'order_fapiao_title',
      width: '150px',
    },
    {
      title: '订单价格',
      className: '!text-center ',
      dataIndex: 'order_price',
      width: '150px',
    },
    {
      title: '是否付款',
      className: '!text-center ',
      dataIndex: 'pay_status',
      width: '150px',
      slots: { customRender: 'pay_status' },
    },
    {
      title: '是否发货',
      className: '!text-center ',
      dataIndex: 'is_send',
      width: '100px',
    },
    {
      title: '下单时间',
      className: '!text-center ',
      dataIndex: 'create_time',
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
  const current = ref<number>(1);
  const pageSize = ref<number>(10);
  const total = ref<number>(100);
  const loading = ref<boolean>(false);
  const orderKey = ref<string>('');
  const orderList = ref<orderListModel>();
  const editOpt = reactive({
    size: 'small',
    shape: 'circle',
    type: 'primary',
    btnText: '',
  });
  const deleteOpt = reactive({
    size: 'small',
    shape: 'circle',
    type: 'primary',
    btnText: '',
    danger: true,
  });
  let searchQuery = reactive<searchQuery>({
    user_id: '',
    pay_status: '',
    is_send: '',
    order_fapiao_title: '',
    order_fapiao_company: '',
    order_fapiao_content: '',
    consignee_addr: '',
  });
  const handleEditOrder = () => {
    message.error(`功能开发中`);
  };
  const confirmDelete = () => {
    message.error(`功能开发中`);
  };
  const cancelDelete = () => {
    message.error(`功能开发中`);
  };

  const handleSearch = _.debounce(() => {
    getDataList();
  }, 600);
  const getDataList = async () => {
    let params: orderParamsInfo = {
      query: orderKey.value,
      pagenum: current.value,
      pagesize: pageSize.value,
      ...searchQuery,
    };
    loading.value = true;
    const res = await reqOrderListApi(params);
    if (res.meta.status == 200) {
      orderList.value = res.data && res.data.goods;
      total.value = res.data.total;
    }
    loading.value = false;
  };
  const handSizeChange = (currentPage, size) => {
    if (currentPage == 1) current.value = currentPage;
    else current.value = 1;
    pageSize.value = size;
    getDataList();
  };

  const handleChangePage = (currentPage, size) => {
    current.value = currentPage;
    pageSize.value = size;
    getDataList();
  };
  onMounted(() => {
    getDataList();
  });
</script>

<style lang="less">
  .ant-table-wrapper {
    margin-bottom: 24px;
  }
</style>
