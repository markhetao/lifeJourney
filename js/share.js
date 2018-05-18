   //1.搜索所有信息
    $("#getData").click(function(){
    	var anthor = $("#txtVal").val().trim();
        //非空判断
        if(!anthor){
        	alert("请输入钱包地址");
        	return false;
        }
        location.href='path_road.html?author='+anthor;
    });
    function getData(){
    	var page =1;
        console.log("最新信息页码:"+page);
        if(!page || page ===0){
             alert('请输入最新数据有效页码');
        return;
        }

        //搜索
        var from = Account.NewAccount().getAddressString();
        var value = "0";
        var nonce = "0";
        var gas_price = "1000000";
        var gas_limit = "2000000";
        var callFunction = "getAddrs";
        var callArgs = "[\""+ page + "\"]";
        var contract = {
          "function":callFunction,
          "args":callArgs
        }
//      console.log("Account:"+Account);
//      console.log("callArgs:"+callArgs)
        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(
            function(resp){
            cbSearchNew(resp);
        }).catch(function(err){
            console.log("error:"+err.message);
        })
    }
	getData();
    function cbSearchNew(resp){
        var result = resp.result;
        console.log("result:"+JSON.stringify(result));
        if(result === 'null'){
            // $(".result").addClass("hide");
            // $(".birthSay").removeClass("hide");
        }else{
            try{
              result = JSON.parse(result);
              if(isArray(result)) {
              	for(var i = 0;i<result.length;i++){
          			var item = {
						info:result[i]
					}
          			$('#dancon').barrager(item);
              	}
          	}else{
		            alert(result);
	            };
            }catch(err){
            	
            }
        }
    };
