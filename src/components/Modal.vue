<template>
    <div id="topContent">
      <div class="top">
                 <div>
                   <span class="title">卡斯柯<span class="line">-</span></span>
                 </div>
                 <div class="input">
                     <span>分配状态<el-input v-model="input" ></el-input></span>
                  </div>   
                  <!-- <div class="input">
                     <span> 状态<el-select v-model="value" placeholder="状态">
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                     </span>
                 </div>
                 <div class="input">
                    <span>机器码<input type="text"/></span>
                </div>
                <div class="input">
                    <span>设备IMEI  <input type="text"/></span>
                </div>
                <div class="input">
                    <span>手机号<input type="text"/></span>
                </div>
                <div class="input">
                    <span>日期
                        <el-date-picker
                        v-model="value1"
                        type="date">
                        </el-date-picker>
                        <el-date-picker
                        v-model="value2"
                        align="right"
                        type="date"
                        :picker-options="pickerOptions1">
                        </el-date-picker>
                    </span>
                </div>
                
                <div class="input">
                     <span> 景区
                          <el-select v-model="value" placeholder="请选择">
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="value" placeholder="旅游团">
                                            <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>                  
                     </span>
                 </div>
                
                <div class="input">
                   <el-button type="warning" plain>查询</el-button>
                   <el-button type="info" plain>重置</el-button>
                </div>
                <div class="input">
                    <span>共有设备：</span>
                </div> -->
             </div>
    </div>
      
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      // 日期
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: ""
    };
  }
};
</script>

<style lang="less">
#topContent {
  .top {
    div {
      padding-top: 15px;
      .title {
        color: #ccc;
        border-left: 4px solid #ff6600;
        padding-left: 4px;
      }
    }
    .input {
      display: inline;
      span {
        color: #ccc;
          padding-right: 5px;
        input {
          background: #ccc;
          border: none;
          outline: none;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
