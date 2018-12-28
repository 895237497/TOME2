<template>
    <transition name="modal" tag="div">
        <div class="modal" v-show="visible" transition="fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!--头部-->
                    <div class="modal-header">
                        <slot name="header">
                            <p class="title">{{modal.title}}</p>
                        </slot>
                        <a @click="close(0)" class="xd xd-close" href="javascript:void(0)"></a>
                    </div>
                    <!--内容区域-->
                    <div class="modal-body">
                        <slot name="body">
                        </slot>
                    </div>
                    <!--尾部,操作按钮-->
                    <div class="modal-footer">
                        <slot name="footer">
                            <slot name="button">
                                <a v-if="modal.showCancelButton" href="javascript:void(0)" class="button"     :class="modal.cancelButtonClass" @click="close(1)">{{modal.cancelButtonText}}</a>
                                <a v-if="modal.showConfirmButton" href="javascript:void(0)" class="button" :class="modal.confirmButtonClass" @click="submit">{{modal.confirmButtonText}}</a>
                            </slot>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div v-show="show" class="modal-backup"></div> -->
    </transition>
</template>


<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
    options: {
      type: Object,
      default: {}
    }
  },
  // 采用v-bind将visible传入

  methods: {
    ConfirmHandler() {
      this.$emit("update:visible", false); // 更新visible的值（可选，如果想点击确认之后，进行一些处理再决定关不关闭，可取消在这里更新visible）
      this.$emit("Confirm"); // 传递确认事件
    },
    CancelHandler() {
      this.$emit("update:visible", false); // 更新visible的值
      this.$emit("Cancel"); // 传递取消事件
    }
  },
  /**
   * modal 模态接口参数
   * @param {string} modal.title 模态框标题
   * @param {boolean} modal.showCancelButton 是否显示取消按钮
   * @param {string} modal.cancelButtonClass 取消按钮样式
   * @param {string} modal.cancelButtonText 取消按钮文字
   * @param {string} modal.showConfirmButton 是否显示确定按钮
   * @param {string} modal.confirmButtonClass 确定按钮样式
   * @param {string} modal.confirmButtonText 确定按钮标文字
   */
  computed: {
    /**
     * 格式化props进来的参数,对参数赋予默认值
     */
    modal() {
      let modal = this.options;
      if (modal) {
        modal = {
          title: modal.title || "提示",
          showCancelButton:
            typeof modal.showCancelButton == "undefined"
              ? true
              : modal.showCancelButton,
          cancelButtonClass: modal.cancelButtonClass
            ? modal.showCancelButton
            : "btn-default",
          cancelButtonText: modal.cancelButtonText
            ? modal.cancelButtonText
            : "取消",
          showConfirmButton:
            typeof modal.showConfirmButton == "undefined"
              ? true
              : modal.cancelButtonClass,
          confirmButtonClass: modal.confirmButtonClass
            ? modal.confirmButtonClass
            : "btn-active",
          confirmButtonText: modal.confirmButtonText
            ? modal.confirmButtonText
            : "确定"
        };
      } else {
        // 使用时没有传递参数
        modal = {
          title: "提示",
          showCancelButton: true,
          cancelButtonClass: "btn-default",
          cancelButtonText: "取消",
          showConfirmButton: true,
          confirmButtonClass: "btn-active",
          confirmButtonText: "确定"
        };
      }
      return modal;
    }
  }
};
</script>

<style lang="less" scoped>
.modal-enter-active {
  animation: modal-in 0.35s linear;
}

.modal-leave-active {
  animation: modal-in 0.35s reverse linear;
}

@keyframes modal-in {
  0% {
    transform: translateY(-20px) rotateX(-35deg);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(0) rotateX(0);
    opacity: 1;
  }
}

.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  outline: 0;
  overflow: hidden;
}

.modal-dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  width: 4.8rem;
  background: #fff;
  border-radius: 0.1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1002;
  .modal-content {
    > div {
      padding: 0.15rem 0.4rem;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      a {
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
    .modal-footer {
      text-align: right;
      padding-top: 10px;
      padding-bottom: 10px;
      border-top: 1px solid #eee;
      a {
        display: inline-block;
        color: #fff;
        padding: 2% 5%;
        border-radius: 5px;
        &:first-of-type {
          background-color: orange;
          margin-right: 15px;
        }
        &:last-of-type {
          background-color: #269;
        }
      }
    }
  }
}

.modal-backup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
