new Vue({
	el:"#app",
	data:{
		productList:[],
		totalMoney:0,
		checkAllFlag:false,
		delFlag:false,
		cutProduct:''
	},
	filters:{
		formatMoney:function(v){
			return '￥'+v.toFixed(2);
		}
	},
	mounted:function () {
		this.$nextTick(function (){
				this.cartView();	
			});
	},
	methods:{
		cartView:function(){
			let _this = this;//let和var的不同使用？？？？？
			this.$http.get('data/cartData.json').then(function(res){
				_this.productList = res.data.result.list;
				//_this.totalMoney = res.data.result.totalMoney;
			});
		},
		changeQuantity:function(item,flag){
			if(flag>0){
				item.productQuantity++;
			}else{
				item.productQuantity--;
				if(item.productQuantity<1){
					item.productQuantity=1;
				}
			}
			this.calcTotalPrice();//修改1：当购物车中商品数量发生变化时，重新计算总金额。
		},
		selectedProduct:function(item){
			if(typeof item.checked == 'undefined'){
				// Vue.set(item,'checked',true);全局注册
				this.$set(item,'checked',true);//局部注册
			}else{
				item.checked=!item.checked;
				}
			this.calcTotalPrice();
			//this.isChecked = this.productList.every(function(item){
			//	return item.checked === true;//判定时需要使用恒等判定，如果只是‘=’判定，结果会始终返回true。
			//	});
			},
			checkAll:function (flag) {
				this.checkAllFlag=flag;
				if(this.checkAllFlag){
					this.productList.forEach((item,index)=>{
						if(typeof item.checked == 'undefined'){
						// Vue.set(item,'checked',true);全局注册
							this.$set(item,'checked',true);//局部注册
						}else{
						item.checked=true;
						}
					})
				}else{
					this.productList.forEach((item,index)=>{
						if(typeof item.checked == 'undefined'){
						// Vue.set(item,'checked',true);全局注册
							this.$set(item,'checked',false);//局部注册
						}else{
						item.checked=false;
						}
						//this.totalMoney=0;
					})
				}
				this.calcTotalPrice();
			},
			calcTotalPrice:function () {
				this.totalMoney=0;
				this.productList.forEach((item,index)=>{
					if(item.checked){
						this.totalMoney=this.totalMoney+item.productQuantity*item.productPrice;
					};

				})
			},
			delConfirm:function (item){
				this.delFlag=true;
				this.cutProduct=item;
			},
			delProduct:function () {
				var index=this.productList.indexOf(this.cutProduct);
				this.productList.splice(index,1);//此方法删除数组中的元素，从index位置开始删除1个
				this.delFlag=false;
			}
	},
});
