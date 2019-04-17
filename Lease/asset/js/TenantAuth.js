new Vue({
    el: '#app',
    data: {
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
        // `this` 指向 vm 实例
        console.log('a is: ' + this.a)

        if (localStorage.getItem('SendTime')) {
            var vals = localStorage.getItem('SendTime');
            var curtime = new Date().getTime();
            
            var sendTime =  60 -  parseInt((curtime - vals) / 1000);

            console.log(curtime);
            console.log(vals);
            console.log(sendTime);
            
            if ((sendTime > 0 )) {
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

                // this.sendPost('http://192.168.1.88:9110/Contract/Authentication', params, (err, result) => {
                //     if (err) {
                //         throw err;
                //     } else {
                //         var obj = JSON.parse(result);
                //         console.log('obj', obj); 
                //     }
                // });
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