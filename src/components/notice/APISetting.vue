<style lang="less">
    @import '../../assets/public';
    @import './apisetting';
</style>
<template>
    <div class="api_setting_wrapper">
        <div class="api_header clearfix">
            <span>{{ $t("apiEnCn.list[0]") }}</span> <!-- API设置 -->
            <!-- <router-link to="">查看API文档</router-link> -->
        </div>
        <div class="api_notices">
            <h3>{{ $t("apiEnCn.list[1]") }}</h3> <!-- 注意事项 -->
            <p>1. {{ $t("apiEnCn.list[2]") }}</p> <!-- 我们提供 REST 和 WebSocket API，可查阅API文档。 -->
            <p>2. {{ $t("apiEnCn.list1[0]") }}</p> <!-- 每个用户最多可创建10对API秘钥。 -->
            <p>3. {{ $t("apiEnCn.list[3]") }}</p> <!-- 针对交易API和杠杆API，单个IP限制每分钟1000次将被锁定1小时，一小时后自动解除。 -->
            <p>4. {{ $t("apiEnCn.list1[1]") }}</p> <!-- 针对交易API和杠杆API，单个API限制每秒钟30次访问，一秒钟内30次以上的请求，将会视作无效。 -->
            <p>5. {{ $t("apiEnCn.list1[2]") }}</p> <!-- K线接口每秒只能请求一次数据。 -->
            <p>6. {{ $t("apiEnCn.list1[3]") }}</p> <!-- 如果在使用过程中有任何问题，请加群764113552我们将为您做出最权威的解答。 -->
        </div>
        <div class="api_box">
            <div class="api_header">{{ $t("apiEnCn.list2[0]") }}</div> <!-- 添加新API -->
            <div class="api_border api_content clearfix">
                <div class="api_c_left">
                    <p class="api_c_title">{{ $t("apiEnCn.list2[1]") }}:</p> <!-- API秘钥资料填写 -->
                    <el-form label-position="right" :model="apiForm1" ref="apiForm1" :rules="rules" :hide-required-asterisk="true" label-width="120px">
                        <el-form-item :label="$t('apiEnCn.list2[3]')" prop="title"> <!-- 名称: -->
                            <el-input v-model="apiForm1.title" :placeholder="$t('apiEnCn.list2[4]')"></el-input> <!-- API名称 -->
                        </el-form-item>
                        <el-form-item :label="$t('apiEnCn.list3[0]')" prop="ip"> <!-- （选填）绑定IP: -->
                            <el-input v-model="apiForm1.ip" :placeholder="$t('apiEnCn.list3[1]')"></el-input> <!-- 可加多个, 用","分隔 -->
                        </el-form-item>
                        <el-form-item :label="'Google ' + $t('login.list[3]') + ':'" prop="googleCode"> <!-- Google验证码 -->
                            <el-input v-model="apiForm1.googleCode"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="api_c_right">
                    <p class="api_c_title">{{ $t("apiEnCn.list2[2]") }}:</p> <!-- API秘钥权限 -->
                    <el-form label-position="right" :model="apiForm2" ref="apiForm2" :hide-required-asterisk="true" label-width="0">
                        <el-form-item label="" prop="zichan">
                            <el-checkbox v-model="apiForm2.zichan" :label="$t('apiEnCn.list3[2]')"></el-checkbox> <!-- 行情 -->
                        </el-form-item>
                        <el-form-item label="" prop="fabi">
                            <el-checkbox v-model="apiForm2.fabi" :label="$t('apiEnCn.list3[6]')"></el-checkbox> <!-- 行情 -->
                        </el-form-item>
                        <el-form-item label="" prop="jiaoyi">
                            <el-checkbox v-model="apiForm2.jiaoyi" :label="$t('apiEnCn.list3[3]')"></el-checkbox> <!-- 融资理财 -->
                        </el-form-item>
                        <el-form-item label="" prop="ctbi">
                            <el-checkbox v-model="apiForm2.ctbi" :label="$t('apiEnCn.list3[4]')"></el-checkbox> <!-- 币币交易 -->
                        </el-form-item>
                        <el-form-item label="" prop="ganggan">
                            <el-checkbox v-model="apiForm2.ganggan" :label="$t('apiEnCn.list3[5]')"></el-checkbox> <!-- 充/提币 -->
                        </el-form-item>
                    </el-form>
                </div>
                <div class="api_button">
                    <el-button type="primary" @click="cerateAPI">{{ $t('apiEnCn.list4[2]') }}</el-button> <!-- 创建API秘钥 -->
                </div>
            </div>
        </div>
        <div class="api_box">
            <div class="api_header">{{ $t('apiEnCn.list4[3]') }}</div> <!-- 我的API秘钥 -->
            <div class="api_border api_border2">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="index" :label="$t('apiEnCn.list5[0]')" width="80"></el-table-column>
                    <el-table-column prop="title" :label="$t('apiEnCn.list5[1]')" width="130"></el-table-column>
                    <el-table-column prop="secret" :label="$t('apiEnCn.list5[5]')" width="265"></el-table-column>
                    <el-table-column prop="rule" :label="$t('apiEnCn.list5[2]')" width="250"></el-table-column>
                    <el-table-column prop="ip" label="IP" width="280"></el-table-column>
                    <el-table-column :label="$t('apiEnCn.list5[3]')" width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="showModify(scope.row.id)">{{ $t('security.information[4]') }}</el-button> <!-- 修改 -->
                            <el-button type="primary" size="small" @click="showRemove(scope.row.id)">{{ $t('apiEnCn.list5[4]') }}</el-button> <!-- 删除 -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="pagination" v-if="page.total>0">
            <el-pagination layout="prev, pager, next" :prev-text="$t('moneyRecord.page[2]')"  :next-text="$t('moneyRecord.page[3]')" :total="page.total" :current-page.sync="page.current" :page-count="5" @current-change="changePage"></el-pagination>
        </div>

        <!-- 秘钥详情 -->
		<div role="dialog" aria-modal="true" aria-label="提示" class="el-message-box__wrapper" style="z-index: 2064;" v-if="isSecretInfo"><!--提示-->
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">API{{ $t("apiEnCn.list5[5]") }}</span> 
                        <p class="secret_title_tip">{{ $t("apiEnCn.list5[6]") }}</p> <!-- 仅显示一次，若遗忘请重新生成 -->
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="isSecretInfo = false">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<div class="secret_info">
                        <p class="name">API{{ $t("apiEnCn.list6[4]") }} (Access Key)</p> <!-- 访问密匙 -->
                        <input :value="secretInfoForm.accesskey" id="accessKey" readonly />
                        <span class="copy_btn" @click="copy('accessKey')">{{$t("chongBit.list[3]")}}</span> <!-- 复制 -->
                    </div>
					<div class="secret_info" style="margin-top:20px;">
                        <p class="name">API{{ $t("apiEnCn.list6[5]") }} (Secret Key)</p> <!-- 私有密匙 -->
                        <input :value="secretInfoForm.secret" id="secretCopy" readonly />
                        <span class="copy_btn" @click="copy('secretCopy')">{{$t("chongBit.list[3]")}}</span> <!-- 复制 -->
                    </div>
                    <div class="secret_tip">
                        {{ $t("apiEnCn.list6[6]") }}
                    </div>
				</div>
			</div>
		</div>

        <!-- 修改api -->
		<div role="dialog" aria-modal="true" aria-label="提示" class="el-message-box__wrapper" style="z-index: 2064;" v-if="modifyApi"><!--提示-->
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">{{ $t("security.information[4]") }}API</span>
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="modifyApi = false">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
				</div>
				<div class="el-message-box__content modify_box">
					<el-form label-position="top" :model="modifyForm" status-icon :rules="rulesGoogle" ref="modifyForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="APIAccessKey" prop="accesskey" style="margin-bottom:10px;"> 
                            <el-input v-model="modifyForm.accesskey" readonly></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('apiEnCn.list3[0]')" prop="ip"> <!-- （选填）绑定IP: -->
                            <el-input v-model="modifyForm.ip" :placeholder="$t('apiEnCn.list3[1]')"></el-input> <!-- 可加多个, 用","分隔 -->
                        </el-form-item>
                        <p class="api_c_title">{{ $t("apiEnCn.list2[2]") }}:</p> <!-- API秘钥权限 -->
                        <el-form label-position="right" :model="apiForm3" ref="apiForm3" :hide-required-asterisk="true" label-width="0" class="modify_checkbox">
                            <el-form-item label="" prop="zichan">
                                <el-checkbox v-model="apiForm3.zichan" :label="$t('apiEnCn.list3[2]')"></el-checkbox> <!-- 行情 -->
                            </el-form-item>
                            <el-form-item label="" prop="fabi">
                                <el-checkbox v-model="apiForm3.fabi" :label="$t('apiEnCn.list3[6]')"></el-checkbox> <!-- 行情 -->
                            </el-form-item>
                            <el-form-item label="" prop="jiaoyi">
                                <el-checkbox v-model="apiForm3.jiaoyi" :label="$t('apiEnCn.list3[3]')"></el-checkbox> <!-- 融资理财 -->
                            </el-form-item>
                            <el-form-item label="" prop="ctbi">
                                <el-checkbox v-model="apiForm3.ctbi" :label="$t('apiEnCn.list3[4]')"></el-checkbox> <!-- 币币交易 -->
                            </el-form-item>
                            <el-form-item label="" prop="ganggan">
                                <el-checkbox v-model="apiForm3.ganggan" :label="$t('apiEnCn.list3[5]')"></el-checkbox> <!-- 充/提币 -->
                            </el-form-item>
                        </el-form>
                        <el-form-item :label='$t("security.log[2]")' prop="googleCode">
                            <el-input type="text" v-model="modifyForm.googleCode" auto-complete="off" :placeholder='$t("security.log[3]")'></el-input>
                        </el-form-item>
                        <el-form-item class="btns">
                            <el-button type="primary" class="btn_confirm" @click="modify">{{$t("security.log[6]")}}</el-button>
                            <el-button type="primary" plain class="btn_cancel" @click="modifyApi = false">{{$t("security.log[7]")}}</el-button>
                        </el-form-item>
					</el-form>
				</div>
			</div>
		</div>

        <!-- 删除api设置 -->
		<div role="dialog" aria-modal="true" aria-label="提示" class="el-message-box__wrapper" style="z-index: 2064;" v-if="removeApi"><!--提示-->
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">
						<span class="el-message-box__word">{{ $t("apiEnCn.list5[4]") }}API</span> <!-- 删除 -->
					</div>
					<button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="removeApi = false">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<el-form label-position="top" :model="googleAttes" status-icon :rules="rulesGoogle" ref="googleAttes" label-width="100px" class="demo-ruleForm">
						<el-form-item :label='$t("security.log[2]")' prop="googleCode">
							<el-input type="text" v-model="googleAttes.googleCode" auto-complete="off" :placeholder='$t("security.log[3]")'></el-input>
						</el-form-item>
						<el-form-item class="btns">
							<el-button type="primary" class="btn_confirm" @click="remove">{{$t("security.log[6]")}}</el-button>
							<el-button type="primary" plain class="btn_cancel" @click="removeApi = false">{{$t("security.log[7]")}}</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
export default {
    data () {
        var validateTitle = (rule, value, callback) => {
            if (!value) {
                callback(new Error(this.$t('apiEnCn.list4[0]')));
            } else {
                callback();
            }
        };
        var validateGoogle = (rule, value, callback) => {
            if (!value) {
                callback(new Error(this.$t('security.log[3]')));
            } else {
                callback();
            }
        };

        return {
            apiForm1: {
                title: '',
                ip: '',
                googleCode: '',
                rule: []
            },
            rules: {
                title: [
                    { validator: validateTitle,  trigger: 'blur' }
                ],
                googleCode: [
                    { validator: validateGoogle, trigger: 'blur' }
                ]
            },
            apiForm2: {
                zichan: false,
                jiaoyi: false,
                ctbi: false,
                ganggan: false,
                fabi: false
            },
            apiForm3: {
                zichan: false,
                jiaoyi: false,
                ctbi: false,
                ganggan: false,
                fabi: false
            },
            tableData: [],
            page: {
                current: 1,
                total: 0,
                size: 10
            },
            isSecretInfo: false,
            removeApi: false,
            secretInfoForm: {
                accesskey: '',
                secret: ''
            },
            modifyApi: false,
            modifyForm: {
                accesskey: '',
                ip: '',
                googleCode: '',
                rule: []
            },
            removeId: '',
            googleAttes: {
                googleCode: ''
            },
            rulesGoogle: {
                googleCode: [
                    { validator: validateGoogle, trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        // 复制函数
        copy(para) { 
            var _this = this;
            var ele = document.getElementById(para);
            ele.select();
            document.execCommand("Copy");
            _this.$public.msg(_this.$t("chongBit.tips[0]"), 'success', _this); //复制成功
        },
        // 创建api
        cerateAPI() {
            this.$refs.apiForm1.validate((valid) => {
                if (valid) {
                    if (!this.apiForm2.zichan && !this.apiForm2.jiaoyi && !this.apiForm2.ctbi && !this.apiForm2.ganggan && !this.apiForm2.fabi) {
                        this.$public.msg(this.$t('apiEnCn.list4[1]'), 'warning', this);  // 至少勾选一种权限
                        return 
                    }
                    
                    let arr = [];
                    if (this.apiForm2.zichan) { // 行情
                        arr.push(1)
                    } 
                    if (this.apiForm2.jiaoyi) { // 融资理财
                        arr.push(4)
                    } 
                    if (this.apiForm2.ctbi) { // 币币交易
                        arr.push(3)
                    } 
                    if (this.apiForm2.ganggan) { // 充/提币
                        arr.push(2)
                    }  
                    if (this.apiForm2.fabi) { // 充/提币
                        arr.push(5)
                    }  
                    this.apiForm1.rule = arr.join(',');

                    this.$http.post(this.$http.addSecret, this.apiForm1).then(res => {
                        if (res.data.status == '200') {
                            this.$public.msg(res.data.msg, 'success', this);
                            this.$refs.apiForm1.resetFields();
                            this.$refs.apiForm2.resetFields();
                            this.showList();
                            // 显示秘钥详情
                            setTimeout(() => {
                                this.$http.post(this.$http.secretInfo, {id: this.tableData[0].id}).then(res2 => {
                                    if (res2.data.status == '200') {
                                        this.isSecretInfo = true;
                                        this.secretInfoForm = res2.data.data;
                                    }   
                                })
                            }, 1000)
                        } else {
                            this.$public.msg(res.data.msg, 'error', this);
                        }
                    }).catch(err => {})
                } else {
                    return false;
                }
            });
        },
        // 秘钥列表
        showList() {
            let data = {
                p: this.page.current,
                size: this.page.size,
            };
            this.$http.post(this.$http.secretList, data).then(res => {
                if (res.data.status == '200') {
                    this.tableData = res.data.data.res;
                    this.page.current = Number(res.data.data.p);
                    this.page.total = Number(res.data.data.count);
                } else {
                    this.$public.msg(res.data.msg, 'error', this);
                    this.tableData = [];
                    this.page.current = 1;
                    this.page.total = 0;
                }
            }).catch(err => {})
        },
        showModify(id) {
            this.modifyForm.id = id;
            this.modifyApi = true;
            this.apiForm3 = {
                zichan: false,
                jiaoyi: false,
                ctbi: false,
                ganggan: false,
                fabi: false
            };
            this.$http.post(this.$http.secretInfo, {id: id}).then(res => {
                if (res.data.status == '200') {
                    this.modifyForm.accesskey = res.data.data.accesskey;
                    this.modifyForm.ip = res.data.data.ip;
                    let arr = res.data.data.rule.split(',');
                    this.modifyForm.rule = arr;
                    arr.forEach(val => {
                        if (val == 1) {
                            this.apiForm3.zichan = true;
                        }
                        if (val == 2) {
                            this.apiForm3.ganggan = true;
                        }
                        if (val == 3) {
                            this.apiForm3.ctbi = true;
                        }
                        if (val == 4) {
                            this.apiForm3.jiaoyi = true;
                        }
                        if (val == 5) {
                            this.apiForm3.fabi = true;
                        }
                    })
                }   
            })
        },
        // 修改api
        modify() {
            this.$refs.modifyForm.validate((valid) => {
                if (valid) {
                    if (!this.apiForm3.zichan && !this.apiForm3.jiaoyi && !this.apiForm3.ctbi && !this.apiForm3.ganggan && !this.apiForm3.fabi) {
                        this.$public.msg(this.$t('apiEnCn.list4[1]'), 'warning', this);  // 至少勾选一种权限
                        return 
                    }

                    let arr = [];
                    if (this.apiForm3.zichan) { // 行情
                        arr.push(1)
                    } 
                    if (this.apiForm3.jiaoyi) { // 融资理财
                        arr.push(4)
                    } 
                    if (this.apiForm3.ctbi) { // 币币交易
                        arr.push(3)
                    } 
                    if (this.apiForm3.ganggan) { // 充/提币
                        arr.push(2)
                    }  
                    if (this.apiForm3.fabi) { // 充/提币
                        arr.push(5)
                    }  
                    this.modifyForm.rule = arr.join(',');

                    this.$http.post(this.$http.modifySecret, this.modifyForm).then(res => {
                        if (res.data.status == '200') {
                            this.modifyApi = false;
                            this.showList();
                        } else {
                            this.$public.msg(res.data.msg, 'error', this);
                        }
                    }).catch(err => {})
                } else {
                    return false
                }
            })
        },
        showRemove(id) {
            this.removeId = id;
            this.removeApi = true;
            this.googleAttes.googleCode = '';
        },
        // 删除秘钥
        remove() {
            this.$refs.googleAttes.validate((valid) => {
                if (valid) {
                    this.$http.post(this.$http.deleteSecret, {id: this.removeId, googleCode: this.googleAttes.googleCode}).then(res => {
                        if (res.data.status == '200') {
                            this.$public.msg(res.data.msg, 'success', this);
                            this.removeApi = false;
                            this.showList();
                        } else {
                            this.$public.msg(res.data.msg, 'error', this);
                        }
                    })
                } else {
                    return false
                }
            })
            // this.$confirm(this.$t('apiEnCn.list6[0]'), this.$t('apiEnCn.list6[1]'), {
            //     confirmButtonText: this.$t('apiEnCn.list6[2]'),
            //     cancelButtonText: this.$t('apiEnCn.list6[3]'),
            // }).then(() => {
            //     this.$http.post(this.$http.deleteSecret, {id: this.removeId, googleCode: this.googleAttes.googleCode}).then(res => {
            //         if (res.data.status == '200') {
            //             this.$public.msg(res.data.msg, 'success', this);
            //             this.showList();
            //         } else {
            //             this.$public.msg(res.data.msg, 'error', this);
            //         }
            //     })
            // }).catch(() => {
            //     return
            // })
        },
        changePage(i){
            this.page.current = i;
            this.showList();
        }
    },
    mounted() {
        this.showList();
    }
}
</script>