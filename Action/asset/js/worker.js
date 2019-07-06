new Vue({
    el: '#app',
    data: {
        dist_A: '',
        dist_B: '',
        smallRoom: '',
        lockerRoom: '',
        instrument: '',
        towel: '',
        eighthFloor: '',

        dist_A1: '',
        dist_B1: '',
        smallRoom1: '',
        lockerRoom1: '',
        instrument1: '',
        towel1: '',
        eighthFloor1: '',

        result: '',
        dateValue: '',

        options: [
            { value: ' ', label: '无' },
            { value: '燕', label: '胡小燕' },
            { value: '琴', label: '杨琴琴' },
            { value: '丽', label: '李丽芳' },
            { value: '雯', label: '黄慧雯' },
            { value: '娟', label: '谢文娟' },
            { value: '玲', label: '李红玲' },
            { value: '珊', label: '古珊珊' },
            { value: '香', label: '骆恒香' },
            { value: '敏', label: '李慧敏' },
            { value: '思', label: '曾思敏' },
            { value: '倩', label: '田倩' },
            { value: '心', label: '梁馨心' },
            { value: '辉', label: '易辉' },
            { value: '沁', label: '赖如沁' }
        ]



    }, created: function () {
        var now = new Date(); //当前日期 


        var nowDay = now.getDate(); //当前日
        var nowMonth = now.getMonth() + 1; //当前月
        var nowYear = now.getFullYear(); //当前年

        this.dateValue = nowMonth + ' 月 ' + nowDay + ' 日 ';

        this.getResult();

    },
    methods: {

        getResult: function () {



            var str = this.dateValue + ' 护理间卫生分配:\n\n';
            str += 'A区+走廊: ' + this.dist_A + '  ' + this.dist_A1 + '\n\n';
            str += 'B区: ' + this.dist_B + '  ' + this.dist_B1 + '\n\n';
            str += '小房间: ' + this.smallRoom + '  ' + this.smallRoom1 + '\n\n';
            str += '办公室: ' + this.lockerRoom + '  ' + this.lockerRoom1 + '\n\n';
            str += '仪器: ' + this.instrument + '  ' + this.instrument1 + '\n\n';
            str += '洗毛巾: ' + this.towel + '  ' + this.towel1 + '\n\n';
            str += '8楼: ' + this.eighthFloor + '  ' + this.eighthFloor1 + '\n\n';

                              

                                                    


            str += '办公室早班卫生要求：所有桌面擦拭消毒，物品分类（办公用物，私人物品茶杯等）放置整齐，公共餐桌物品摆放整齐（包含杯子、饭盒等）杂物，垃圾收拾干净，所有椅櫈归位，摆放整洁。\n重点：在岗人员全天维护以上标准，当天值日生督导维护。\n';

            str += '\n晚班卫生要求：同早班标准+外卖盒、零食袋子等下班前一定要扔到消防通道大垃圾桶。\n';

            str += '重点：关闭窗户，空调，电脑，灯光，存在安全隐患电源类。\n';



            this.result = str;
        }, 
        copyResult: function () {

            console.log('copy');

            var clipboard = new ClipboardJS('.ml10');
 
            clipboard.on('success', e => {
                console.log('复制成功')
                // 释放内存
                clipboard.destroy()
            });
            clipboard.on('error', e => {
                // 不支持复制
                console.log('该浏览器不支持自动复制')
                // 释放内存
                clipboard.destroy()
            });


        }

    }


})