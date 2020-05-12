<!-- 弹窗组件 -->
<template>
    <div class="tanchuang_wrap" v-if="isShow">
        <div class="dialog_cover"  @click="closeMyself"></div>

        <transition name="drop">
            <div class="dialog_content" v-if="isShow">
                <div class="alert_title">
                    <div class="alert_title_left">{{dialogname}}</div>
                    <div class="alert_title_right" @click="closeMyself">
                        <i style="color: #fff;font-size: 18px;" class="iconfont icon-guanbi"></i>
                    </div>
                </div>

                <!-- <div style="padding: 10px 15px;;text-align:left;
                            font-size:14px;color:#606266">
                      {{alert_text}}
                </div> -->
                <div class="content">
                    <div class="dialogInfo">
                        <div>
                            <i style="color: #e89301;font-size: 56px;" class="iconfont icon-tishi"></i>
                        </div>
                        <div>
                            <!-- 确定要离开当前待检页面吗？ 系统可能不保存您的待检配置！ -->
                            <p style="color: #4e95ff;">{{alert_text}}</p>
                            <p>{{info}}</p>
                        </div>
                    </div>
                </div>

                <div class="down" >
                    <div v-if="showCancle" class="down_button_cancle" @click="closeMyself">取消</div>
                    <div class="down_button" @click="besure">确定</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow: false,
                showCancle:false,
                dialogname:null,
                alert_text:'',
                info: '',
            }
        },
        methods: {
            show(params){  //初始化参数
                let { showCancle,dialogname,alert_text,info } = params
                this.showCancle = showCancle
                this.dialogname = dialogname
                this.alert_text = alert_text
                this.info = info

                this.isShow = true
            },
            closeMyself () {
                this.isShow = false
                this.callBack(false)
            },
            besure(){  //确定按钮
                this.isShow = false
                this.callBack(true)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .drop-enter-active {
        transition: all .5s ease;
    }
    .drop-leave-active {
        transition: all .5s ease;
    }
    .drop-enter {
        transform: translateY(-500px);
    }
    .drop-leave {
        transform: translateY(-500px);
    }


    .tanchuang_wrap{
        .dialog_cover {
            background: #000;
            opacity: 0.3 ;
            position: fixed;
            z-index: 35;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .dialog_content {
            width: 510px;
            height: 290px;
            position: fixed;
            overflow: auto;
            background: #fff;
            top: 192px;
            left: 45%;
            margin-left: -211px;
            z-index: 40;
            line-height: 1.6;
            border-radius:4px;
            .alert_title{
                background: #4e95ff;
                width: 478px;
                height: 40px;
                overflow: hidden;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 0 16px;
                .alert_title_left{
                    color: #fff;
                }
                .alert_title_right{
                    cursor: pointer;
                }
                .right:hover{
                    color: #4fc08d;
                }
            }
            .content{
                width: 510px;
                height: 110px;
                margin-top: 34px;
                .dialogInfo{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: row;
                    height: 100%;
                }
            }
            .down{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 510px;
                height: 106px;
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
                .down_button{
                    width: 90px;
                    height: 40px;
                    cursor: pointer;
                    background:#4e95ff;
                    border-radius:3px;
                    text-align: center;
                    line-height: 30px;
                    color: white;
                    font-size: 16px;
                    line-height: 40px;
                    margin-left:15px;
                }
                .down_button_cancle{
                    width: 90px;
                    height: 40px;
                    font-size: 16px;
                    cursor: pointer;
                    background:#fff;
                    border:1px solid #CCCCCC;
                    border-radius:3px;
                    text-align: center;
                    line-height: 30px;
                    color: #999;
                    line-height: 40px;
                }
            }
        }
    }
</style>