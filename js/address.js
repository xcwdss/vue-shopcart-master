new Vue({
	el:'.container',
	data:{
		limitNum:3,
		addressList:[],
		currentIndex:0,
		shippingMethod:1
	},
	mounted:function () {
		this.$nextTick(function (){
			this.getAddressList();
		});
	},
	computed:{
		filterAddress:function (){
			return this.addressList.slice(0,this.limitNum);//这里slice是返回一个新的数组，而splice是对原数组进行切割
		}
	},
	methods:{
		getAddressList:function (){
			this.$http.get("data/address.json").then(response=>{
				var res=response.data;
				if(res.status=="0"){
					this.addressList=res.result;
				}
			});
		},
		loadMore:function (){
			if(this.limitNum==this.addressList.length){
				this.limitNum=3;
			}else{
				this.limitNum=this.addressList.length;
			}
		},
		setDefault:function (addressId){
			this.addressList.forEach((item,index)=>{
				if(item.addressId==addressId){
					item.isDefault=true;
				}else{
					item.isDefault=false;
				}
			});
		}
	}
})