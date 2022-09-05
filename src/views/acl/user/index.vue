<template>
  <div>
    <Card>
      <Row :gutter="24">
        <Col span="6">
          <input-search
            v-model:value="userParams.query"
            :placeholder="t('routes.acl.header.placeholder')"
            enter-button
            @search="handleSearch"
            @change="handleSearch"
          />
        </Col>
        <Col span="6">
          <Button type="primary" @click="handleOpenAddOrEdit()">
            <template #icon><plus-outlined /></template>
            {{ t('routes.acl.header.addBtn') }}
          </Button></Col
        >
      </Row>
      <Table
        :row-key="(record) => record.id"
        :dataSource="usersList"
        :columns="columns"
        bordered
        :loading="loading"
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
        :pagination="{
          current,
          pageSize,
          total,
          pageSizeOptions: ['3', '5', '10', '20'],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `${t('routes.acl.th.total')} ${total} ${t('routes.acl.th.total1')}`,
          onChange: handleChangePage,
          onShowSizeChange: handSizeChange,
        }"
      >
        <template #index="{ index, column }">
          <template v-if="column.dataIndex === 'index'">
            {{ index + 1 }}
          </template>
        </template>
        <template #mgState="{ record, column }">
          <template v-if="column.dataIndex === 'mg_state'">
            <Switch v-model:checked="record.mg_state" @change="handleUserState(record)"></Switch>
          </template>
        </template>
        <template #createTime="{ text }">
          {{ dateFormat(text) }}
        </template>
        <template #operation="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <HindButton
              :title="t('routes.acl.tip.updateUser')"
              :opt="editOpt"
              @click="handleOpenAddOrEdit(record.id)"
            >
              <template v-slot:icon>
                <EditOutlined />
              </template>
            </HindButton>
            <popconfirm
              :title="t('routes.acl.tip.isDel')"
              :ok-text="t('routes.acl.yes')"
              :cancel-text="t('routes.acl.no')"
              @confirm="confirmDelete(record.id)"
              @cancel="cancelDelete"
            >
              <HindButton :opt="deleteOpt" :title="t('routes.acl.tip.delUser')" :danger="true">
                <template v-slot:icon>
                  <DeleteOutlined />
                </template>
              </HindButton>
            </popconfirm>
            <HindButton :title="t('routes.acl.tip.assignRoles')" :opt="setOpt" @click="handleClick">
              <template v-slot:icon>
                <SettingOutlined />
              </template>
            </HindButton>
          </template>
        </template>
      </Table>
    </Card>

    <Modal v-model:visible="addOrEditUserDialog" :title="dialogTitle" @cancel="closeDialog">
      <template #footer>
        <a-button key="back" @click="handleCancel">{{ t('routes.acl.backBtn') }}</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleAddOrEditOk">{{
          t('routes.acl.okBtn')
        }}</a-button>
      </template>
      <Form
        class="!mt-30px !ml-20px"
        ref="addOrEditFormRef"
        :model="userInfo"
        :rules="rules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
      >
        <FormItem :label="t('routes.acl.form.userName')" name="username">
          <Input v-model:value="userInfo.username" :disabled="userInfo.id ? true : false" />
        </FormItem>
        <FormItem v-if="!userInfo.id" :label="t('routes.acl.form.userpass')" name="password">
          <Input v-model:value="userInfo.password" />
        </FormItem>
        <FormItem :label="t('routes.acl.form.useremail')" name="email">
          <Input v-model:value="userInfo.email" />
        </FormItem>
        <FormItem :label="t('routes.acl.form.userephone')" name="mobile">
          <Input v-model:value="userInfo.mobile" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  // 为了定义组件名称
  export default defineComponent({
    name: 'User',
  });
</script>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
  } from '@ant-design/icons-vue';
  import { RuleObject } from 'ant-design-vue/es/form/interface';
  import { ref, onMounted, reactive, UnwrapRef } from 'vue';
  import { UserParamsInfo, UsersListListModel, UserInfoModel } from '/@/api/acl/model/userModel';
  import {
    getUsersListApi,
    changeUsersStateApi,
    addUserApi,
    searchUserInfoApi,
    editUserInfoApi,
    deleteUserInfoApi,
  } from '/@/api/acl/user';
  import { columns } from './userIndex';
  import { dateFormat } from '/@/utils/dateFormat';
  import _ from 'lodash';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();

  let current = ref<number>(1);
  let pageSize = ref<number>(3);
  let total = ref<number>(100);
  let loading = ref<boolean>(false);
  const usersList = ref<UsersListListModel>([]);
  let addOrEditUserDialog = ref<Boolean>(false);
  let addOrEditFormRef = ref();
  let dialogTitle = ref<string>('');
  const userParams = reactive<UserParamsInfo>({
    query: '',
    pagenum: 1,
    pagesize: 3,
  });
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
  const setOpt = reactive({
    size: 'small',
    shape: 'circle',
    type: 'primary',
    btnText: '',
  });
  const handleClick = () => {
    console.log(1);
  };
  let checkUserName = async (_rule: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject(`${t('routes.acl.header.placeholder')}`);
    }
    if (value.length > 15 || value.length < 3) {
      return Promise.reject(`${t('routes.acl.tip.userLen')}`);
    } else {
      return Promise.resolve();
    }
  };
  let checkUserPass = async (_rule: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject(`${t('routes.acl.tip.inputPass')}`);
    }
    if (value.length > 15 || value.length < 6) {
      return Promise.reject(`${t('routes.acl.tip.passLen')}`);
    } else {
      return Promise.resolve();
    }
  };
  let checkEmail = async (_rule: RuleObject, value: string) => {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!value) return Promise.resolve();
    if (!reg.test(value)) {
      return Promise.reject(`${t('routes.acl.tip.emailErr')}`);
    } else {
      return Promise.resolve();
    }
  };
  let checkMobile = async (_rule: RuleObject, value: string) => {
    const reg = /^1[34578]\d{9}/;
    if (!value) return Promise.resolve();
    if (!reg.test(value)) {
      return Promise.reject(`${t('routes.acl.tip.phoneErr')}`);
    } else {
      return Promise.resolve();
    }
  };
  const rules = {
    // 规则名称必须和表单数据的名称一致
    username: [{ required: true, validator: checkUserName, trigger: 'blur' }],
    password: [{ required: true, validator: checkUserPass, trigger: 'blur' }],
    email: [{ required: false, validator: checkEmail, trigger: 'blur' }],
    mobile: [{ required: false, validator: checkMobile, trigger: 'blur' }],
  };
  // 添加或修改用户表单
  let userInfo: UnwrapRef<UserInfoModel> = reactive({
    username: '',
    password: '',
    email: '',
    mobile: '',
  });
  // 打开添加修改对话框
  const handleOpenAddOrEdit = async (id?: number) => {
    if (id) {
      dialogTitle.value = t('routes.acl.tip.editUser');
      userInfo.id = id;
      try {
        const res = await searchUserInfoApi(id);
        if (res.meta.status == 200) {
          userInfo.username = res.data.username;
          userInfo.email = res.data.email;
          userInfo.mobile = res.data.mobile;
        } else {
          message.error(res.meta.msg);
        }
      } catch (error) {
        message.error(`${t('routes.acl.tip.serchErr')}`);
      }
    } else {
      dialogTitle.value = t('routes.acl.header.addBtn');
    }
    addOrEditUserDialog.value = true;
  };
  //保存 添加、修改用户
  const handleAddOrEditOk = async () => {
    // addOrEditUserDialog.value = true;
    try {
      await addOrEditFormRef.value.validateFields();
      let params = userInfo;
      // addUserApi
      if (!userInfo.id) {
        const res = await addUserApi(params);
        if (res.meta.status == 201) {
          message.success(res.meta.msg);
        } else {
          message.error(res.meta.msg);
        }
        addOrEditUserDialog.value = false;
        addOrEditFormRef.value.resetFields();
        // addOrEditFormRef.resetFields();
        loading.value = false;
      } else if (userInfo.id) {
        delete params.username;
        delete params.password;
        const res = await editUserInfoApi(userInfo.id, params);
        if (res.meta.status == 200) {
          message.success(res.meta.msg);
        } else {
          message.error(res.meta.msg);
        }
        addOrEditUserDialog.value = false;
        addOrEditFormRef.value.resetFields();
        // addOrEditFormRef.resetFields();
        loading.value = false;
      }
      getUserList();
    } catch (errorInfo) {
      message.error(`${t('routes.acl.tip.userInfoErr')}`);
    }
  };
  const handleCancel = () => {
    addOrEditUserDialog.value = false;
    addOrEditFormRef.value.resetFields();
    reset();
  };
  const closeDialog = () => {
    addOrEditFormRef.value.resetFields();
    reset();
  };
  const reset = () => {
    userInfo.username = '';
    userInfo.password = '';
    userInfo.email = '';
    userInfo.mobile = '';
    delete userInfo.id;
  };

  // 分页器
  const handleChangePage = (currentPage, size) => {
    current.value = currentPage;
    pageSize.value = size;
    getUserList();
  };
  const handSizeChange = (currentPage, size) => {
    if (currentPage == 1) current.value = currentPage;
    else current.value = 1;
    pageSize.value = size;
    getUserList();
  };
  // 删除
  const confirmDelete = async (userId) => {
    const res = await deleteUserInfoApi(userId);
    if (res.meta.status == 200) {
      message.success(res.meta.msg);
      if (usersList.value.length == 1 && current.value != 1) {
        current.value--;
      }
      getUserList();
    } else {
      message.error(res.meta.msg);
    }
  };
  const cancelDelete = () => {};

  //搜索，节流防抖的使用
  const handleSearch = _.debounce(() => {
    getUserList();
  }, 600);
  // 获取用户列表
  const getUserList = async () => {
    let params: UserParamsInfo = {
      query: '',
      pagenum: 1,
      pagesize: 3,
    };
    params.pagesize = pageSize.value;
    params.pagenum = current.value;
    params.query = userParams.query;
    loading.value = true;
    const res = await getUsersListApi(params);
    if (res.meta.status == 200) {
      usersList.value = res.data && res.data.users;
      total.value = res.data.total;
    }
    loading.value = false;
  };
  // 修改用户状态
  const handleUserState = async (record) => {
    const res = await changeUsersStateApi(record.id, record.mg_state);
    if (res.meta.status == 200) {
      message.success(res.meta.msg);
    } else {
      message.error(res.meta.msg);
    }
    getUserList();
  };

  onMounted(() => {
    getUserList();
  });
</script>

<style lang="less">
  .ant-modal-header {
    text-align: center;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-footer {
    padding: 10px 100px;
  }
</style>
