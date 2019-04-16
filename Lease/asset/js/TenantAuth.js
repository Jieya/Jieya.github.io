var vm = new Vue({
    el: '#app',
    data: {
        step:1,
        visible: false,
        radio: '0',
        realName: '',
        identityCode: '',
        corporateIdCard:'',
        corporateName:'',
        companyName:'',
        companyCode:'',
        phone: '',
        code: '',
        buttonName: "获取验证码",
        isDisabled: false,
        fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
        time: 60
    },
    methods: {
        sendMsg() {
            vm.isDisabled = true;
            var interval = window.setInterval(function () {
                vm.buttonName = '重新发送(' + vm.time + ')';
                --vm.time;
                if (vm.time < 0) {
                    vm.buttonName = "重新发送";
                    vm.time = 60;
                    vm.isDisabled = false;
                    window.clearInterval(interval);
                }
            }, 1000);

        },
        authentication(){

            if(vm.radio=='0'){
                //个人用户，直接认证
   // var params = { 
            //     OS:1,
            //     Version : '8.0.0',
            //     VerifyCode : '123456',
            //     Phone : '19926431639',
            //     Access_Token : '291b90a6-d2a5-406e-86fe-bd20e720e7ea',
            //     Type : 0,
            //     RealName : '张三',
            //     IdentityCode : '432503199010054678',
            //     Path : 0
            // }

            // vm.sendPost('http://192.168.1.88:9110/Contract/Authentication', params, (err, result) => {
            //     if (err) {
            //         throw err;
            //     } else {
            //         var obj = JSON.parse(result);
            //         console.log('obj', obj); 
            //     }
            // });
            }else{
                //企业用户
                vm.step = 2;
            }

         



        },done(){
            
        },        
        goBack(){
            vm.step = vm.step-1;
        },next(){
             vm.step =  vm.step +1;
        },  
        sendPost: function (urlStr, data, cb) {

            var dataStr = "paramsJSON=" + JSON.stringify(data); 

            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

            axios.post(urlStr, dataStr)
                .then(function (response) {
                    console.log(response);

                    if (response.status == 200) {
                        var result = response.data;
                        cb(null, JSON.stringify(result));
                    } else {
                        cb("您所请求的页面有异常。" + response.statusText);
                    }

                })
                .catch(function (error) {
                    cb("您所请求的页面有异常。" + error);

                });

        }

    }


})