<template>
    <div class="add-coin">
        <div class="add-c">
            <p class="add-title">{{$t('addCoin[0]')}}</p>
            <div class="add">
                <!-- 项目联系人 -->
                <p class="label">
                    <span class="label-name">1 . {{$t('addCoin[1]')}}  </span>
                    <span class="label-desc">*</span>
                </p>
                <el-input :placeholder="$t('addCoin[2]')" v-model="form.project_contacts"></el-input>

                <!-- 联系方式 -->
                <p class="label">
                    <span class="label-name">2 . {{$t('addCoin[3]')}}  </span>
                    <span class="label-desc">*</span>
                </p>
                <el-input :placeholder="$t('addCoin[4]')" v-model="form.phone_num"></el-input>

                <!-- 项目简介 -->
                <p class="label">
                    <span class="label-name">3 . {{$t('addCoin[5]')}}  </span>
                    <span class="label-desc">*</span>
                </p>
                <el-input
                    type="textarea"
                    resize="none"
                    :rows="4"
                    :placeholder="$t('addCoin[6]')"
                    v-model="form.project_introduction">
                </el-input>

                <!-- 官方网站 -->
                <p class="label">
                    <span class="label-name">4 . {{$t('addCoin[7]')}}  </span>
                    <span class="label-desc">*</span>
                </p>
                <el-input :placeholder="$t('addCoin[8]')" v-model="form.links"></el-input>
                
                <!-- 白皮书链接 -->
                <p class="label">
                    <span class="label-name">5 . {{$t('addCoin[9]')}} </span>
                    <span class="label-desc">*</span>
                </p>
                <el-input :placeholder="$t('addCoin[10]')" v-model="form.white_paper_links"></el-input>

                <!-- 白皮书文件 -->
                <p class="label">
                    <span class="label-name">6 . {{$t('addCoin[11]')}}  </span>
                    <span class="label-desc">*</span>
                </p>
                <el-upload
                class="upload-demo"
                multiple
                :limit="1"
                action="index"
                :disabled="bpsDisable"
                :before-upload="beforeBpsFile">
                    <el-button size="small" type="primary">{{$t('addCoin[12]')}}</el-button>
                    <div slot="tip" class="el-upload__tip">
                        {{$t('addCoin[13]')}}
                        <span style="color: green" v-show="bpsDisable == true">{{$t('addCoin[34]')}}</span>
                    </div>
                </el-upload>

                <!-- 项目LOGO -->
                <p class="label">
                    <span class="label-name">7 . {{$t('addCoin[14]')}}  </span>
                    <span class="label-desc">*</span>
                </p>
                <el-upload
                class="avatar-uploader"
                action="index"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload">
                    <img v-if="logo" :src="logo" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">{{$t('addCoin[15]')}}</div>
                </el-upload>

                <!-- LOGO源文件 -->
                <p class="label">
                    <span class="label-name">8 . {{$t('addCoin[16]')}}  </span>
                    <span class="label-desc">*</span>
                </p>
                <el-upload
                class="upload-demo"
                action="index"
                :disabled="logoDisable"
                multiple
                :limit="1"
                :before-upload="beforeLogoFile">
                    <el-button size="small" type="primary">{{$t('addCoin[17]')}}</el-button>
                    <div slot="tip" class="el-upload__tip">
                        {{$t('addCoin[18]')}}
                        <span style="color: green" v-show="logoDisable == true">{{$t('addCoin[35]')}}</span>
                    </div>
                </el-upload>

                <!-- 项目成立时间 -->
                <p class="label">
                    <span class="label-name">9 . {{$t('addCoin[19]')}}  </span>
                    <span class="label-desc">*</span>
                </p>
                <el-input :placeholder="$t('addCoin[20]')" v-model="form.project_create_time"></el-input>

                <!-- 项目规划 -->
                <p class="label">
                    <span class="label-name">10 . {{$t('addCoin[21]')}}  </span>
                    <span class="label-desc">*</span>
                </p>
                <el-input
                    type="textarea"
                    resize="none"
                    :rows="4"
                    :placeholder="$t('addCoin[22]')"
                    v-model="form.project_plan">
                </el-input>

                <!-- 团队 -->
                <p class="label">
                    <span class="label-name">11 . {{$t('addCoin[23]')}}  </span>
                    <span class="label-desc">*</span>
                </p>
                <el-input :placeholder="$t('addCoin[24]')" v-model="form.teams"></el-input>

                <!-- 提交btn -->
                <el-button class="submit-btn" @click="submitForm">{{$t('addCoin[25]')}}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addCoin',
    data() {
        return {
            bpsDisable: false,
            logoDisable: false,
            form: {
                project_contacts: '',
                phone_num: '',
                project_introduction: '',
                links: '',
                white_paper_links: '',
                project_create_time: '',
                project_plan: '',
                teams: ''
            },
            white_paper: null,
            logo_source_file: null,
            logo: null,
            logoFile: null
        }
    },
    methods: {
    //白皮书
        // 白皮书格式校验
        beforeBpsFile(file) {
            let extension = file.name.substring(file.name.lastIndexOf('.')+1)
            let size = file.size / 1024 / 1024
            if(extension !== 'pdf') {
                this.$message.error(this.$t('addCoin[28]'));
                return
            }
            if(size > 10) {
                this.$message.error(this.$t('addCoin[29]'));
                return
            }
            this.white_paper = file
            this.bpsDisable = true
            this.$public.msg(this.$t('addCoin[36]'), 'success', this)
            return false
        },
       
    //LOGO
        // LOGO格式校验
        beforeAvatarUpload(file) {
            const isLt10M = file.size / 1024 / 1024 < 10;
            if(!(file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/bmp')) {
                this.$message.error(this.$t('addCoin[30]'))
            } 
            if (!isLt10M) {
                this.$message.error(this.$t('addCoin[31]'));
            }
            var reader = new FileReader(); 
            //转base64
            reader.onload = (e)=>{
                this.logo = e.target.result //将图片路径赋值给src
            }
            reader.readAsDataURL(file);
            this.logoFile = file
            return false
        },
        

    //LOGO源文件
        // LOGO源文件校验
        beforeLogoFile(file) {
            let extension = file.name.substring(file.name.lastIndexOf('.')+1)
            let size = file.size / 1024 / 1024
            if(extension !== 'psd' && extension !== 'ai') {
                this.$message.error(this.$t('addCoin[32]'));
                return
            }
            if(size > 10) {
                this.$message.error(this.$t('addCoin[33]'));
                return
            }
            this.logo_source_file = file
            this.logoDisable = true
            this.$public.msg(this.$t('addCoin[37]'), 'success', this)
            return false
        },

        // 提交
        submitForm() {
            if (this.form.project_contacts == '') {
                this.$message.error(this.$t('addCoin[38]'))
                return
            } else if (this.form.phone_num == '') {
                this.$message.error(this.$t('addCoin[39]'))
                return
            } else if(!this.$public.checkMobile(this.form.phone_num)) {
					this.$public.msg(this.$t('addCoin[40]'), 'warning', this);//请输入有效的手机号
            }  else if (this.form.project_introduction == '') {
                this.$message.error(this.$t('addCoin[41]'))
                return
            } else if (this.form.links == '') {
                this.$message.error(this.$t('addCoin[42]'))
                return
            } else if (this.form.white_paper_links == '') {
                this.$message.error(this.$t('addCoin[43]'))
                return
            } else if (!this.white_paper) {
                this.$message.error(this.$t('addCoin[44]'))
                return
            } else if (!this.logoFile) {
                this.$message.error(this.$t('addCoin[45]'))
                return
            } else if (!this.logo_source_file) {
                this.$message.error(this.$t('addCoin[46]'))
                return
            } else if (this.form.project_create_time == '') {
                this.$message.error(this.$t('addCoin[47]'))
                return
            } else if (this.form.project_plan == '') {
                this.$message.error(this.$t('addCoin[48]'))
                return
            } else if (this.form.teams == '') {
                this.$message.error(this.$t('addCoin[49]'))
                return
            } else {
                var formData = new FormData();
                this.isLoading = true
                formData.append('project_contacts', this.form.project_contacts);
                formData.append('phone_num', this.form.phone_num);
                formData.append('project_introduction', this.form.project_introduction);
                formData.append('links', this.form.links);
                formData.append('white_paper_links', this.form.white_paper_links);
                formData.append('project_create_time', this.form.project_create_time);
                formData.append('project_plan', this.form.project_plan);
                formData.append('teams', this.form.teams);
                formData.append('white_paper', this.white_paper);
                formData.append('logo_source_file',this.logo_source_file);
                formData.append('logo',this.logoFile);
                this.$http.post(this.$http.applicationCoin, formData).then(res=> {
                    if (res.data.code == 200) {
                        this.$message.success(this.$t('addCoin[50]'))
                        this.form.project_contacts = ''
                        this.form.phone_num = ''
                        this.form.project_introduction = ''
                        this.form.links = ''
                        this.form.white_paper_links = ''
                        this.form.project_create_time = ''
                        this.form.project_plan = ''
                        this.form.teams = ''
                        this.white_paper = null
                        this.logo_source_file = null
                        this.logoFile = null
                        this.isLoading = false
                        this.bpsDisable = false
                        this.logoDisable = false
                        return
                    } else {
                        this.$public.msg(res.data.msg, 'error', this)
                        this.isLoading = false
                        return
                    }
                })
            }
        }
    }
}
</script>

<style lang=less>
	@import '../../assets/public.less';
	@import './addCoin.less';
</style>