下面其实是两个脚本，你可以直接在浏览器运行他，也可以用另一个文件 main.min.js 的代码，里面是压缩过的，你可以直接添加在浏览器书签，实现一键答题
// 首先你需要运行脚本1，把所有答案都展开，然后运行脚本2，自动答题。


// 脚本1 一键打开所有答案
var zkjxs = $（'#questionModule> ul>li .zkjx');
控制台。log（zkjxs.长度);

zkjxs 的each（function（index， zkjx) {
  zkjx 的点击();
});
// 设置考试剩余时间
etimeSeconds = 6000;


// 脚本2 自动答题
var lis = $（'#questionModule> ul>li');
控制台。log（lis.长度);

var myevent = new Event（'change'， { bubbles： true });

如果 （lis.长度 > 0) {
    for （let index = 0; 索引 < lis.长度; 指数++) {
        var li = lis[索引];
        var tx = getTx（li.querySelector（'.sub-dotitle i'） 的文本内容);
        如果 （tx == -1) {
            控制台。log（'err tx');
            继续;
        }
        var answers = getAnswer（tx， li.querySelector（'.solution'） 的文本内容);
        if （回答。长度 <= 0) {
            控制台。log（'err answer');
            继续;
        }
        如果 （tx==0 || tx==1 || tx==2) {
            var dds = li.querySelectorAll（'.sub-answer dd');
            如果 （DDS.长度 > 0) {
                var breakxh = false;
                for （let i = 0; 我< DDS。长度; 我++) {
                    var dd = dds[i];
                    var ddtext = dd.attributes['data-value'] 的文本内容;
                    控制台。log（ddtext);
                    for （let j = 0; j <回答。长度; j++) {
                        ddtext.indexOf（答案[j]） ！= -1
                        if （ddtext == 答案[j]) {
                            dd.点击();
                            如果 （tx ！= 1) {
                                breakxh = 真;
                            }
                            破;
                        }
                    }
                    if （breakxh) {
                        破;
                    }
                }
            } 还 {
                控制台。log（'err dd tx 0 1');
            }
        }
        // 填空
        如果 （tx == 3) {
            var txa = li.querySelector（'.e__textarea');
            txa 的值 = answers[0];
            txa 的dispatchEvent（myevent);
        }
    }
}


function getAnswer（tx， answer) {
    var 回答 = [];
    如果 （tx == 1 || tx == 0) {
        var xx = ['A'， 'B'， 'C'， 'D'];
        for （let index = 0; 索引 < xx。长度; 指数++) {
            if （答案。indexOf（xx[index]） ！= -1) {
                回答。push（xx[索引]);
                如果 （tx == 0) {
                    破;
                }
            }
        }
    }
    如果 （tx == 2) {
        if （答案。indexOf（'参考答案：错'） ！= -1) {
            回答 = ['错误'];
        }
        if （答案。indexOf（'参考答案：对'） ！= -1) {
            回答 = ['正确'];
        }
    }
    如果 （tx == 3) {
        const regex = /参考答案：（.*？）\n答案解析：/s;
        const res = 答案。match（正则表达式);
        控制台。log（res);
        如果 （res & res.长度 == 2) {
            回答 = [res[1]];
        }
    }
    返回 ANS;
}

函数 getTx（str) {
    如果 （str.indexOf（'单选题'） ！= -1) {
        返回 0;
    }
    如果 （str.indexOf（'多选题'） ！= -1) {
        返回 1;
    }
    如果 （str.indexOf（'判断题'） ！= -1) {
        返回 2;
    }
    // 简答题等（由于这种题型太多，就全部默认返回3了）
    if （str.indexOf（'填空题'） ！= -1 || str.indexOf（'论述题'） ！= -1 || str.indexOf（'综合题'） ！= -1 || str.indexOf（'计算题'） ！= -1 || str.indexOf（'应用题'） ！= -1） {
    返回 3;
    // }
    返回 3;
