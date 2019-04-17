new Vue({
    el: '#app',
    data: {
        skipCode: '',
        a: '1',
        businessLicence: '',
        certificate: '',
        imageUrl: '',
        step: 1,
        visible: false,
        radio: '0',
        realName: '',
        identityCode: '',
        corporateIdCard: '',
        corporateName: '',
        companyName: '',
        companyCode: '',
        phone: '',
        code: '',
        buttonName: "获取验证码",
        isDisabled: false,
        time: 60
    }, created: function () {

        // 获取get参数 skipCode

 
        this.skipCode = this.getQueryVariable('code');



        if (localStorage.getItem('SendTime')) {
            var vals = localStorage.getItem('SendTime');
            var curtime = new Date().getTime();

            var sendTime = 60 - parseInt((curtime - vals) / 1000);

            console.log(curtime);
            console.log(vals);
            console.log(sendTime);

            if ((sendTime > 0)) {
                this.time = sendTime;
                this.isDisabled = true;
                var that = this;    //将this存为一个变量，此时的this指向obj
                var interval = window.setInterval(function () {
                    that.buttonName = '重新发送(' + that.time + ')';
                    --that.time;
                    if (that.time < 0) {
                        that.buttonName = "重新发送";
                        that.time = 60;
                        that.isDisabled = false;
                        window.clearInterval(interval);
                    }
                }, 1000);
            }
        }

    },
    methods: { 
        getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) { return pair[1]; }
            }
            return (false);
        },
        sendMsg() {

            if (this.phone.length == 0) {
                this.$message.error('请输入手机号!');
                return;
            }

            var curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列  
            localStorage.setItem('SendTime', curtime);
            console.log(curtime);



            this.isDisabled = true;


            var that = this;    //将this存为一个变量，此时的this指向obj

            var interval = window.setInterval(function () {
                that.buttonName = '重新发送(' + that.time + ')';
                --that.time;
                if (that.time < 0) {
                    that.buttonName = "重新发送";
                    that.time = 60;
                    that.isDisabled = false;
                    window.clearInterval(interval);
                }
            }, 1000);
        },
        authentication() {

            if (this.radio == '0') {

                if(this.realName.length==0){
                    this.$message.error('请输入真实姓名!');
                    return;
                }else if(this.identityCode.length==0){
                    this.$message.error('请输入身份证号码!');
                    return;
                }else if(this.phone.length==0){
                    this.$message.error('请输入手机号码!');
                    return;
                }else if(this.code.length==0){
                    this.$message.error('请输入验证码!');
                    return;
                }
 
                // 个人用户，直接认证
                var params = {
                    SkipCode: this.skipCode,
                    VerifyCode: this.code,
                    Phone: this.phone,
                    Type: 0,
                    RealName: this.realName,
                    IdentityCode: this.identityCode,
                    Path: 1
                }

                this.sendPost('http://192.168.1.88:9110/Contract/Authentication', params, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        var obj = JSON.parse(result);
                        console.log('obj', obj);

                        //  window.location.href = 'https://www.baidu.com'
                    }
                });
            } else {
                //企业用户
                this.step = 2;
            }

        },
        done() {

        },
        goBack() {
            this.step = this.step - 1;
        },
        next() {
            this.step = this.step + 1;
        },
        getBusinessLicence(file, fileList) {
            this.getBase64(file.raw).then(res => {
                console.log(res)
                this.businessLicence = res;
            });
        },
        getCertificate(file, fileList) {
            this.getBase64(file.raw).then(res => {
                console.log(res)
                this.certificate = res;
            });
        },
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function () {
                    imgResult = reader.result;
                };
                reader.onerror = function (error) {
                    reject(error);
                };
                reader.onloadend = function () {
                    resolve(imgResult);
                };
            });
        },
        handleAvatarSuccess(res, file) {
            debugger
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 3;

            if (!isJPG && !isPNG) {
                this.$message.error('营业执照只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上营业执照大小不能超过 3MB!');
            }
            return isJPG && isLt2M;
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