<template>
  <el-card class="box-card">
    <el-form ref="form" :model="form" label-width="110px" label-position="left" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="sortParam" label="排序方式">
            <el-select v-model="form.sortParam" placeholder="请选择排序方式">
              <el-option label="按金额排序" value="1" />
              <el-option label="按订单数排序" value="2" />
              <el-option label="按创建时间排序" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sort" label="正序或者降序">
            <el-select v-model="form.sort" placeholder="请选正序或者降序">
              <el-option label="正序" value="1" />
              <el-option label="倒叙" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
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
        prop="name"
        label="名字"
      />
      <el-table-column
        prop="phone"
        label="电话"
      />
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.deleted == '1' ? 'success' : 'danger'"> {{ scope.row.deleted | WORDERSTATUS }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | dateFormat }}
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
            v-if="scope.row.deleted == '2'"
            size="mini"
            type="primary"
            @click="changeWorker(scope.row.id)"
          >审核</el-button>
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
  </el-card>
</template>

<script>
import { getWorkerList, delWorker, changeWorker } from '@/api/system'
export default {
  data() {
    return {
      form: {
        sortParam: '',
        sort: ''
      },
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
  },
  methods: {
    getList(page = 1) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getWorkerList({
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
    handleDelete(id) {
      this.$confirm('确认删除吗,只是禁止回收员登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delWorker({
          id
        }).then(res => {
          this.$Message.success('删除成功')
          this.getList()
        }).catch(() => {
          console.log('cancel')
        })
      })
    },
    changeWorker(id) {
      const that = this
      changeWorker({
        id
      }).then(res => {
        that.$Message.success('审核成功')
        that.getList()
      }).catch(() => {
        console.log('cancel')
      })
    }
  }
}
</script>

<style scoped>
</style>

