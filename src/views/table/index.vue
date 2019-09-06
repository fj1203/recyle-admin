<template>
  <el-card>
    <el-card class="sys-item">
      <el-form>
        <el-form-item label="轮播图" label-width="120px">
          <el-upload
            list-type="picture-card"
            action="/apis/dic/uploadFace"
            :show-file-list="true"
            :on-remove="remove"
            :on-success="success"
            :on-exceed="exceed"
            :file-list="fileList"
            :auto-upload="true"
            :limit="4"
          >
            <!-- <img v-for="(item,index) in imageArr" :key="index" :src="imageArr" class="avatar"> -->
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="text-right">
        <el-button type="primary" @click="setPic">提交</el-button>
      </div>
    </el-card>
    <el-card class="sys-item">
      <el-row>
        <el-col :span="12">
          <el-form>
            <el-form-item label="今日价格" label-width="120px">
              <el-input v-model="price" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="text-right">
        <el-button type="primary" @click="setPrice">提交</el-button>
      </div>
    </el-card>
    <el-card class="sys-item">
      <el-row>
        <el-col :span="12">
          <el-form>
            <el-form-item label="滚动文字" label-width="120px">
              <el-input v-model="content" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="text-right">
        <el-button type="primary" @click="setContent">提交</el-button>
      </div>
    </el-card>
  </el-card>
</template>
<script>
import { getPic, setPic, getPrice, setPrice, getContent, setContent, delPic } from '@/api/system'
export default {
  data() {
    return {
      fileList: [],
      price: '',
      content: '',
      sendfilelist: []
    }
  },
  created() {
    this.getPrice()
    this.getContent()
    this.getPic()
  },
  methods: {
    // upload(data) {
    //   console.log(data)
    //   const _file = data.file
    //   var formData = new FormData()
    //   formData.append('files', _file)
    //   console.log(_file)
    //   uploadFace(formData).then(res => {
    //     // this.imageUrl = 'http://123.207.86.66:6784' + res.data.data
    //     // this.fileList.push(`http://www.wwwruiqilinmuyinghuli.cn${res.data.data}`)
    //     console.log(this.fileList)
    //   })
    // },
    remove(file, fileList) {
      let temp = []
      temp = this.sendfilelist.filter(item => item.uid !== file.uid)
      console.log('得到剔除了该图片的总列表', temp)
    },
    success(res, file, fileList) {
      console.log('file', file)
      console.log('fileList', fileList)
      if (this.sendfilelist.length === 0) {
        this.sendfilelist = fileList.map((item, index) => {
          return {
            id: index + 4,
            uid: item.uid,
            url: item.response.data
          }
        })
      }
    },
    exceed() {
      this.$message({ type: 'error', message: '只允许上传4张照片' })
    },
    getPrice() {
      getPrice()
        .then(res => {
          this.price = res.data
        })
        .catch(() => {
          console.log('cancel')
        })
    },
    getContent() {
      getContent()
        .then(res => {
          this.content = res.data
        })
        .catch(() => {
          console.log('cancel')
        })
    },
    setPrice() {
      setPrice({ price: this.price })
        .then(res => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        })
        .catch(() => {
          console.log('cancel')
        })
    },
    setContent() {
      setContent({ content: this.content })
        .then(res => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        })
        .catch(() => {
          console.log('cancel')
        })
    },
    getPic() {
      getPic()
        .then(res => {
          const a = res.data
            .filter(item => item.value)
            .map(item => {
              return {
                name: item.id,
                url: 'http://www.wwwruiqilinmuyinghuli.cn' + item.value
              }
            })
          console.log(a)
          this.fileList = a
        })
        .catch(() => {
          console.log('cancel')
        })
    },
    setPic() {
      console.log(this.fileList)
      this.sendfilelist.forEach((item, index) => {
        setPic({ picId: item.id, fileUrl: item.url })
          .then(res => {
            console.log(res)
          })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.text-right {
  text-align: right;
}
.sys-item {
  margin-bottom: 20px;
}
</style>
