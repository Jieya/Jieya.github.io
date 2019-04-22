new Vue({
    el: '#app',
    data: { 
        dist_A:'',
        dist_B:'',
        smallRoom:'',
        lockerRoom:'',
        instrument:'',
        towel:'',
        eighthFloor:'',

        dist_A1:'',
        dist_B1:'',
        smallRoom1:'',
        lockerRoom1:'',
        instrument1:'',
        towel1:'',
        eighthFloor1:'',

        result:'',
        dateValue :'',
        
        options: [
            { value: ' ', label: '无' },
            { value: '燕', label: '胡小燕' },
            { value: '琴', label: '杨琴琴' },
            { value: '芳', label: '李丽芳' },
            { value: '雯', label: '黄慧雯' },
            { value: '娟', label: '谢文娟' },
            { value: '玲', label: '李红玲' },
            { value: '珊', label: '古珊珊' },
            { value: '香', label: '骆恒香' },
            { value: '敏', label: '李慧敏' },
            { value: '思', label: '曾思敏' },
            { value: '倩', label: '田倩'   },
            { value: '心', label: '梁馨心' },
            { value: '沁', label: '赖如沁' }
        ]



    }, created: function () {
        var now = new Date(); //当前日期 
 

        var nowDay = now.getDate(); //当前日
        var nowMonth = now.getMonth()+1; //当前月
        var nowYear = now.getFullYear(); //当前年
 
        this.dateValue =   nowMonth + ' 月 ' + nowDay + ' 日 ';

        this.getResult();

    },
    methods: {

        getResult: function(){

            
            
            var str =  this.dateValue + ' 护理间卫生分配:\n\n';
            str  += 'A区: '+this.dist_A +'  ' + this.dist_A1 + '\n\n';
            str  += 'B区: '+this.dist_B +'  ' + this.dist_B1 + '\n\n';
            str  += '小房间: '+this.smallRoom +'  ' + this.smallRoom1 + '\n\n';
            str  += '更衣室: '+this.lockerRoom +'  ' + this.lockerRoom1 + '\n\n';
            str  += '仪器: '+this.instrument +'  ' + this.instrument + '\n\n';
            str  += '洗毛巾: '+this.towel +'  ' + this.towel1 + '\n\n';
            str  += '8楼: '+this.eighthFloor +'  ' + this.eighthFloor1 + '\n\n';


            str  += '更衣室早班卫生要求：要把桌面酒精擦拭消毒，物品摆放整齐（包含鞋子、雨伞等物品摆放）\n\n';
            
            str  += '晚班卫生要求：外卖盒、零食袋子等下班前一定要扔到消防通道大垃圾桶以及地上垃圾的及时清理！\n\n';
            
            str  += 'Ａ区卫生要求：椅子统一摆放整齐，垃圾桶盖上，洗手台水迹擦干，物品摆放整齐，玻璃镜子每天擦拭\n\n';


            
            this.result = str;
        }, // 复制成功
        onCopy(e){
          console.log(e);
        },
        // 复制失败
        onError(e){
          alert("失败");
        },
        copyResult:function(){
            var clipboard = new Clipboard('.tag-read')
                    clipboard.on('success', e => {
                      console.log('复制成功')
                      // 释放内存
                      clipboard.destroy()
                    })
                    clipboard.on('error', e => {
                      // 不支持复制
                      console.log('该浏览器不支持自动复制')
                      // 释放内存
                      clipboard.destroy()
                    })

        }

    }


})