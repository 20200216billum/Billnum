<style lang=less>
	@import '../../assets/public.less';
	@import './addSite.less';
</style>
<template>
	<div class="addSite">
        <div class="auto">
            <div class="title">
                <span>{{$t('addSite[0]')}}</span>
            </div>
            <div class="form">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item :label="$t('addSite[1]')">
                            <div class="block" style="width: 270px;">
                                <el-cascader :options="options" v-model="selectedOptions" @change="handleChange" :placeholder="$t('addSite[2]')">
                                </el-cascader>
                            </div>
                    </el-form-item>
                    <el-form-item :label="$t('addSite[3]')">
                        <el-input type="textarea" v-model="form.detail" :placeholder="$t('addSite[4]')"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="邮政编码">
                        <el-input v-model="form.postcode" placeholder="请填写邮政编码"></el-input>
                    </el-form-item> -->
                    <el-form-item :label="$t('addSite[5]')">
                        <el-input v-model="form.name" :placeholder="$t('addSite[6]')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('addSite[7]')">
                        <el-input v-model="form.phone" :placeholder="$t('addSite[8]')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox-group v-model="delivery">
                            <el-checkbox :label="$t('addSite[9]')" name="type" :placeholder="$t('addSite[10]')"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">{{$t('addSite[11]')}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="ulList">   
                <ul class="title">
                    <li>{{$t('siteList[0]')}}</li>
                    <li>{{$t('siteList[1]')}}</li>
                    <li>{{$t('siteList[2]')}}</li>
                    <li>{{$t('siteList[3]')}}</li>
                    <li>{{$t('siteList[4]')}}</li>
                    <li></li>
                    <div style="clear: both"></div>
                </ul>
                <div style="clear: both" v-if="tableData.length == 0" class="noData">暂无数据</div>
                <ul v-for="(i,k) in tableData" :key="k" class="for" v-else>
                    <li>{{i.name}}</li>
                    <li>{{i.province}}</li>
                    <li>{{i.detail}}</li>
                    <li>{{i.phone}}</li>
                    <li><span @click="amend('edit',i.id)" class="border btn1" style="cursor:pointer;">{{$t('siteList[5]')}}</span><span @click="amend('del',i.id,i)" style="cursor:pointer;" class="btn2">{{$t('siteList[6]')}}</span></li>
                    <li><span @click="approve(i.id)" style="cursor:pointer;" class="btn3">{{$t('siteList[7]')}}</span></li>
                    <div style="clear: both"></div>
                </ul>
                <el-pagination background layout="prev, pager, next" :total="page.total"  @current-change="current_change" :page-size='page.size' :current-page.sync="page. num"></el-pagination>
            </div>
        </div>
        <el-dialog :title="$t('siteTip[0]')" :visible.sync="xiugai" width="35%" class="dialog">
            <div class="form">
                <el-form ref="form" :model="form1" label-width="120px">
                    <el-form-item :label="$t('siteTip[1]')">
                            <div class="block" style="width: 270px;">
                                <el-cascader :options="options" v-model="selectedOptions1" @change="handleChange">
                                </el-cascader>
                            </div>
                    </el-form-item>
                    <el-form-item :label="$t('siteTip[2]')">
                        <el-input type="textarea" v-model="form1.detail" :placeholder="$t('siteTip[3]')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('siteTip[4]')">
                        <el-input v-model="form1.name" :placeholder="$t('siteTip[5]')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('siteTip[6]')">
                        <el-input v-model="form1.phone" :placeholder="$t('siteTip[7]')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox-group v-model="form1.is_default">
                            <el-checkbox :label="$t('siteTip[8]')" name="type" :placeholder="$t('siteTip[9]')"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onEdit">{{$t('siteTip[10]')}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="xiugai = false">{{$t('siteTip[11]')}}</el-button>
                <el-button type="primary" @click="xiugai = false">{{$t('siteTip[12]')}}</el-button>
            </span>
        </el-dialog>

        <el-dialog :title="$t('delSite[0]')" :visible.sync="delSite" width="20%">
        <span>{{$t('delSite[1]')}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delSite = false">{{$t('delSite[2]')}}</el-button>
            <el-button type="primary" @click="del(key)">{{$t('delSite[3]')}}</el-button>
        </span>
        </el-dialog>



	</div>
</template>
<script>
    import Swiper from 'swiper'; 
    import region from '../../shujuData/region.js'; 
	export default {
		data() {
			return {
                form: {
                    name: '',//收货人姓名
                    detail: '',//详细地址
                    phone: '',//手机号
                    province:'',//省
                    city:'',//市
                    country:'',//区
                    is_default:'',
                },
                form1: {
                    id:'',
                    name: '',//收货人姓名
                    detail: '',//详细地址
                    phone: '',//手机号
                    province:'',//省
                    city:'',//市
                    country:'',//区
                    is_default:'',
                },
                delivery: false,//是否设为默认收货地址
                delivery1: false,
                xiugai:false,
                key:'',
                selectedOptions:[],//收货地址
                selectedOptions1:[],
                options:[],  
                tableData:[],
                page:{
                    num:1,
                    size:1,
                    total:1,
                },
                delSite:false,//删除收货地址对话框
                key:'',//当前收货地址id
            }
		},
		methods: {
            //获取收货地址列表
            take(val){
                var _this = this;
                _this.$http.get(_this.$http.shouhuo,{params:{
                    page:val
                }}).then(function(res) {
                    if(res.data.code == '200') {
                        _this.tableData = res.data.data.data; 
                        _this.page.total = res.data.data.total;
                        _this.page.size = res.data.data.per_page;
                    }
                })
            },
            //获取对应收货地址
            addressInfo(){
                var _this = this;
                _this.$http.get(_this.$http.addressInfo,{params:{address_id:_this.key}}).then(function(res) {
                  if(res.data.code == '200') {
                    _this.form1.name = res.data.data.name
                    _this.form1.phone = res.data.data.phone
                    _this.form1.detail = res.data.data.detail
                    _this.form1.id = res.data.data.id
                    // 省 市 区
                    _this.selectedOptions1 = [res.data.data.province, res.data.data.city, res.data.data.country]
                    if(res.data.data.is_default == 1){
                        _this.form1.is_default = true;
                    }else{
                        _this.form1.is_default = false;
                    }
                 }
                })
            },
            //添加收货地址
            onSubmit() {
                var _this = this;
                if(_this.delivery == true){
                    _this.form.is_default = 1
                }else{
                    _this.form.is_default = 0
                }
                _this.$http.post(_this.$http.add,_this.form).then(function(res) {
                  if(res.data.code == '200') {
                      _this.take()
                      _this.$public.msg(_this.$t('delSite[4]'),'success',_this)
                      _this.form = {
                        name: '',//收货人姓名
                        detail: '',//详细地址
                        phone: '',//手机号
                        province:'',//省
                        city:'',//市
                        country:'',//区
                        is_default:'',
                      }
                      _this.selectedOptions = [];
                 }else{
                    _this.$public.msg(res.data.msg,'warning',_this)
                 }
                })
            },
            //修改或删除收货地址
            amend(val,k,z){
                var _this = this;
                if(val == 'del'){
                    if(z.is_default){
                        _this.$public.msg(_this.$t('delSite[7]'),'warning',_this)
                    return
                    }
                    _this.delSite = true;
                    _this.key = k;
                    // _this.$http.post(_this.$http.delAddress,{id:k}).then(function(res) {
                    //   if(res.data.code == '200') {

                    //     _this.$public.msg('删除成功','success',_this)
                    //     _this.take();
                    //  }else{
                    //     _this.$public.msg(res.data.msg,'warning',_this)
                    //  }
                    // })
                }else if(val == 'edit'){
                    _this.xiugai = true;
                    _this.key = k;
                    _this.addressInfo();
                }
            },
            //修改默认地址
            onEdit(){
                var _this = this;
                _this.form1.province = _this.selectedOptions1[0]
                _this.form1.city = _this.selectedOptions1[1]
                _this.form1.country = _this.selectedOptions1[2]
                if(_this.form1.is_default == true){
                    _this.form1.is_default = 1;
                }else{
                    _this.form1.is_default = 0;
                }
                _this.$http.post(_this.$http.edit,_this.form1).then(function(res) {
                      if(res.data.code == '200') {
                        _this.xiugai = false;
                        _this.form1 = {
                            id:'',
                            name: '',//收货人姓名
                            detail: '',//详细地址
                            phone: '',//手机号
                            province:'',//省
                            city:'',//市
                            country:'',//区
                            is_default:'',
                        }
                        _this.$public.msg(_this.$t('ranking[8]'),'success',_this)
                     }else{
                        _this.public.msg(res.data.msg,'warning',_this)
                     }
                })
            },
            //删除收货地址
            del(k){
                var _this = this;
                _this.$http.post(_this.$http.delAddress,{id:k}).then(function(res) {
                    if(res.data.code == '200') {
                        _this.$public.msg(_this.$t('delSite[5]'),'success',_this)
                        _this.take();
                        _this.delSite = false;
                    }else{
                        _this.$public.msg(res.data.msg,'warning',_this)
                    }
                })
            },
            //设为默认收货地址
            approve(val){
                var _this = this;
                _this.$http.post(_this.$http.setDefault,{
                    id:val
                }).then(function(res) {
                  if(res.data.code == '200') {
                    _this.$public.msg(_this.$t('delSite[6]'),'success',_this)
                    _this.take();
                 }
                })
            },

            //分页
            current_change(val){
                this.take(val)
            },
            handleChange(val){
                this.form.province = val[0]
                this.form.city = val[1]
                this.form.country = val[2]
            }
        },
        mounted:function(){
            region.dict.dict.forEach((item,index) => {
                var province ={value:item.key,label:item.key,children:[]} // 省
                if(item.dict.dict.constructor === Array){ // 有多个市 多个市区时类型为数组 单个为对象
                    for(var i in item.dict.dict){
                        var _i = item.dict.dict
                        var city ={value:_i[i].key,label:_i[i].key,children:[]} // 市
                        for( var x in item.dict.dict[i].array.string ){
                            var _x = item.dict.dict[i].array.string
                            var area ={value:_x[x],label:_x[x]} // 区
                            city.children.push(area)
                        }
                        province.children.push(city) 
                    }
                }else{ // 只有一个市 例如北京 上海
                    var _key = item.dict.dict.key
                    var city ={value:_key,label:_key,children:[]} // 市
                    for(var y in item.dict.dict.array.string){
                        var _y = item.dict.dict.array.string
                        var area = {value:_y[y],label:_y[y]}
                        city.children.push(area )
                    }
                    province.children.push(city) 
                }
                this.options.push(province) 
            });
        },
        created() {
            var _this = this;
            _this.take(1);
        }
    }
</script>