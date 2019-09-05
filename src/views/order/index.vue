<template>
  <el-card class="box-card">
    <el-form ref="form" :model="form" label-width="100px" label-position="left" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="用户信息">
            <el-input v-model="form.search" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="sortParam" label="回收员">
            <el-select v-model="form.workerId" placeholder="请选择排序方式">
              <el-option label="全部" value="" />
              <el-option v-for="(item, index) in workerList" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="sortParam" label="排序方式">
            <el-select v-model="form.sortParam" placeholder="请选择排序方式">
              <el-option label="按金额排序" value="1" />
              <el-option label="按订单数排序" value="2" />
              <el-option label="按创建时间排序" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="sort" label="正序或者降序">
            <el-select v-model="form.sort" placeholder="请选正序或者降序">
              <el-option label="正序" value="1" />
              <el-option label="倒叙" value="2" />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="订单状态">
            <el-select v-model="form.state" placeholder="请选择排序方式">
              <el-option label="全部" value="" />
              <el-option label="待接单" value="1" />
              <el-option label="已结单" value="2" />
              <el-option label="已完成" value="4" />
              <el-option label="已取消" value="5" />
              <el-option label="系统取消" value="6" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item style="float:right">
            <el-button type="primary" @click="getList()">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="名字"
      />
      <el-table-column
        prop="phone"
        label="电话"
      />
      <el-table-column label="重量">
        <template slot-scope="scope">
          {{ scope.row.aboutWeight }} (kg)
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="info(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="self-page"
      background
      layout="prev, pager, next"
      :total="page.total"
      :page-size="10"
      @current-change="getList"
    />
    <el-dialog title="订单信息" :visible.sync="dialog">
      <el-form label-position="left" label-width="90px">
        <el-form-item label="名字">
          {{ formDialog.username }}
        </el-form-item>
        <el-form-item label="电话">
          {{ formDialog.phone }}
        </el-form-item>
        <el-form-item label="重量">
          {{ formDialog.aboutWeight }}kg
        </el-form-item>
        <el-form-item label="状态">
          {{ formDialog.state | STATE }}
        </el-form-item>
        <el-form-item label="地址">
          {{ formDialog.address+formDialog.addressDetail }}
        </el-form-item>
        <el-form-item label="备注">
          {{ formDialog.userRemark }}
        </el-form-item>
        <el-form-item label="备注">
          {{ formDialog.createTime | dateFormat }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { orderList, getWorkerList, cancelOrderByAdmin } from '@/api/system'
export default {
  data() {
    return {
      dialog: false,
      form: {
        search: '',
        state: '',
        workerId: '',
        sortParam: '',
        sort: ''
      },
      formDialog: '',
      workerList: [],
      list: [],
      page: {
        total: 0,
        page: 1
      },
      rules: {
        // sortParam: { required: true, message: '请选择排序方式' },
        // sort: { required: true, message: '请选正序或者降序' }
      }
    }
  },
  mounted() {
    this.getList()
    this.workerData()
  },
  methods: {
    getList(page = 1) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          orderList({
            ...this.form,
            page,
            size: 10
          }).then(res => {
            this.list = res.data.rows
            this.page.total = res.data.records
            this.page.page = res.data.page
          })
        } else {
          return false
        }
      })
    },
    workerData() {
      getWorkerList({
        page: 1,
        size: 9999
      }).then(res => {
        this.workerList = res.data.rows
      })
    },
    info(item) {
      this.dialog = true
      this.formDialog = item
    },
    handleDelete(id) {
      const that = this
      this.$confirm('确认删除订单吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelOrderByAdmin({
          id
        }).then(res => {
          that.$Message.success('删除成功')
          that.getList()
        }).catch(() => {
          console.log('cancel')
        })
      })
    }
  }
}
</script>

<style scoped>
</style>

