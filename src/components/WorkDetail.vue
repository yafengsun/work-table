<template>
    <div>
      <div style="width: 200px;position: absolute;right: 20px">
          <el-input
                  placeholder="请输入公司名"
                  v-model="input"
                  size="small"
                  prefix-icon="el-icon-search"
                  @change="findName"
                  clearable>
          </el-input>
      </div>
        <el-button type="primary" @click="mes()" style="margin-bottom: 20px">信息登记</el-button>
        <!--职位、公司、地址、学历、创建日期-->
        <el-dialog title="信息登记" :visible.sync="dialogFormVisible">
            <el-form :model="jobsInformation">
                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-input v-model="jobsInformation.jobName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司" :label-width="formLabelWidth">
                    <el-input v-model="jobsInformation.company" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="hr姓名111" :label-width="formLabelWidth">
                    <el-input v-model="jobsInformation.hrName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="jobsInformation.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="薪资" :label-width="formLabelWidth">
                    <el-input v-model="jobsInformation.salary" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年限" :label-width="formLabelWidth">
                    <el-input v-model="jobsInformation.years" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学历" :label-width="formLabelWidth">
                    <el-input v-model="jobsInformation.education" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" >
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm()">确 定</el-button>
            </div>
        </el-dialog>
    <el-table
            border
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="jobName"
                label="职位"
                width="180">
        </el-table-column>
        <el-table-column
                prop="company"
                label="公司"
                width="180">
        </el-table-column>
        <el-table-column
                prop="hrName"
                label="hr姓名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址"
                width="180">
        </el-table-column>
        <el-table-column
                prop="salary"
                label="薪资"
                width="180">
        </el-table-column>
        <el-table-column
                prop="years"
                label="年限"
                width="180">
        </el-table-column>
        <el-table-column
                prop="education"
                label="学历"
                width="180">
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="日期"
                width="180">
        </el-table-column>
        <el-table-column
                label="操作"
                width="180">
            <template slot-scope="scope">
                <div class="rightBtn">
                    <el-button @click="handleClick(scope.row)" type="danger" size="small" >删除</el-button>
                    <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                </div>

            </template>
        </el-table-column>
    </el-table>
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</template>
<script>
  // import axios from 'axios';
  export default {
    name: "WorkDetail",
    data() {
      return {
        tableData: [],
        jobsInformation:{
          jobName : '',
          company : '',
          hrName : '',
          address : '',
          salary : '',
          years : '',
          education : ''
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        input:'',
        pageNum:1,
        pageSize:10,
        total:0
      }
    },
    methods:{
      submitForm(){
        this.dialogFormVisible = false;
        this.$axios.post('', this.jobsInformation)
          .then(() => {
            this.$message({
              message: '添加成功啦，恭喜你，离offer又近了一步！',
              type: 'success'
            })
            this.listForm()
          });

      },
      //请求页面列表数据
      listForm(){
       this.$axios.get(`?pageNum=${this.pageNum}&pageSize=${this.pageSize}`)
          .then(response => { this.tableData = response.data.jobsInformations
          this.total = response.data.total;
            this.tableData.forEach((item)=>{
              item.createTime = `${new Date(item.createTime).getFullYear()}年${new Date(item.createTime).getMonth() + 1}月${new Date(item.createTime).getDate()}日`
            })
          });
      },
      //删除某条数据
      handleClick(row) {
        console.log(row.id);
        this.$confirm('此操作将永久删除此条信息, 确定要继续嘛?', '提示', {
          confirmButtonText: '删吧删吧',
          cancelButtonText: '算了吧',
          type: 'warning'
        }).then(() => {
          this.$axios.delete('/'+ row.id ).then(()=>{
            this.$message({
              message: '删除成功啦～',
              type: 'success'
            })
            this.listForm()
          }).catch(()=>{
            this.$message.error('删除失败～等会再试一下');
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //信息登记
      mes(){
        this.dialogFormVisible = true
        this.jobsInformation = {    jobName : '',
          company : '',
          hrName : '',
          address : '',
          salary : '',
          years : '',
          education : ''}
      },
      edit(row){
        //请求单个公司的数据
        this.$axios.get('/'+row.id).then(res=>{
          console.log(res.data)
          this.jobsInformation = res.data
        })
        this.dialogFormVisible = true
      },
      findName(){
        this.pageNum = 1;
        this.pageSize = 10;
        this.$axios.get('/find?name=' + this.input+`&pageNum=${this.pageNum}&pageSize=${this.pageSize}`)  .then(response => { this.tableData = response.data.jobsInformations
          this.tableData.forEach((item)=>{
            item.createTime = `${new Date(item.createTime).getFullYear()}年${new Date(item.createTime).getMonth() + 1}月${new Date(item.createTime).getDate()}日`
          })
        });
      },
      //每页条数pageSize改变时触发
      handleSizeChange(val){
        this.pageSize = val;
        this.listForm()
      },
      //当前页改变pageNum
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageNum = val;
        this.listForm()
      }
    },
    mounted(){
      this.listForm();
    }
  }
</script>

<style scoped>
.rightBtn{
    display: flex;
    justify-content: center;
    /*width: 200%;*/
    /*margin-left: -20px;*/
}
</style>