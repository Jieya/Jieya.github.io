 var vm =  new Vue({
    el: '#app',
    data: {
        visible: false,
        radio: '0',
        realName: '',
        identityCode:'',
        phone:'',
        code:'',
        buttonName: "获取验证码",
        isDisabled: false,
        time: 60 
    },
    methods: {
        sendMsg() {
            vm.isDisabled = true;
            var interval = window.setInterval(function () {
                vm.buttonName = '重新发送('+vm.time + ')';
                --vm.time; 
                if (vm.time < 0) {
                    vm.buttonName = "重新发送";
                    vm.time = 60;
                    vm.isDisabled = false;
                    window.clearInterval(interval);
                }
            }, 1000);

        }

    }


})