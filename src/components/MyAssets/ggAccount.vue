<template lang="html">
	<el-main class="deal_account_right">
		<div class="right_title">
			<span>净资产折合：0.00000000</span>
			<el-checkbox v-model="checked">隐藏资产为0的币种</el-checkbox>
			<el-input class="searchInput" v-model="searchInput" suffix-icon="el-icon-search" clearable>
			</el-input>
			<div class="title_link">
				<router-link to="/noticeList">财务记录</router-link>
			</div>
		</div>
		<!-- 表格 -->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="bit" label="杠杆账户">
			</el-table-column>
			<el-table-column prop="type" label="可用" width="100">
			</el-table-column>
			<el-table-column prop="freeze" label="冻结">
			</el-table-column>
			<el-table-column prop="borrow" label="已借">
			</el-table-column>
			<el-table-column prop="danger" label="爆仓率">
			</el-table-column>
			<el-table-column prop="bang" label="爆仓价">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">转入</el-button>
					<el-button type="text" size="small">转出</el-button>
					<el-button type="text" size="small">杠杆</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-main>

</template>
<script>
import Header from "../../header/heaer.vue";
import Footer from "../../footer/footer.vue";

export default {
	data() {
		return {
			checked: false,
			searchInput: '',
			tableData: [{
				bit: 'USDT',
				type: '0.00000000',
				freeze: '0.00000000',
				borrow: '0.00000000',
				danger: '无危险',
				bang: '---'
			}]
		}
	},
	methods: {

	},
	created: function() {},
	components: {
		"HeaDer": Header,
		"FooTer": Footer,
	}
}
</script>