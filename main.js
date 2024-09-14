// 下面其实是两个脚本，你可以直接在浏览器运行他，也可以用另一个文件 main.min.js 的代码，里面是压缩过的，你可以直接添加在浏览器书签，实现一键答题
// 首先你需要运行脚本1，把所有答案都展开，然后运行脚本2，自动答题。


// 脚本1 一键打开所有答案
var zkjxs = $('#questionModule>ul>li .zkjx');
console.log(zkjxs.length);

zkjxs.each(function(index, zkjx) {
  zkjx.click();
});
// 设置考试剩余时间
etimeSeconds = 6000;


// 脚本2 自动答题
var lis = $('#questionModule>ul>li');
console.log(lis.length);

var myevent = new Event('change', { bubbles: true });

if (lis.length > 0) {
    for (let index = 0; index < lis.length; index++) {
        var li = lis[index];
        var tx = getTx(li.querySelector('.sub-dotitle i').textContent);
        if (tx == -1) {
            console.log('err tx');
            continue;
        }
        var answers = getAnswer(tx, li.querySelector('.solution').textContent);
        if (answers.length <= 0) {
            console.log('err answer');
            continue;
        }
        if (tx==0 || tx==1 || tx==2) {
            var dds = li.querySelectorAll('.sub-answer dd');
            if (dds.length > 0) {
                var breakxh = false;
                for (let i = 0; i < dds.length; i++) {
                    var dd = dds[i];
                    var ddtext = dd.attributes['data-value'].textContent;
                    console.log(ddtext);
                    for (let j = 0; j < answers.length; j++) {
                        // ddtext.indexOf(answers[j]) != -1
                        if (ddtext == answers[j]) {
                            dd.click();
                            if (tx != 1) {
                                breakxh = true;
                            }
                            break;
                        }
                    }
                    if (breakxh) {
                        break;
                    }
                }
            } else {
                console.log('err dd tx 0 1');
            }
        }
        // 填空
        if (tx == 3) {
            var txa = li.querySelector('.e__textarea');
            txa.value = answers[0];
            txa.dispatchEvent(myevent);
        }
    }
}


function getAnswer(tx, answer) {
    var ans = [];
    if (tx == 1 || tx == 0) {
        var xx = ['A', 'B', 'C', 'D'];
        for (let index = 0; index < xx.length; index++) {
            if (answer.indexOf(xx[index]) != -1) {
                ans.push(xx[index]);
                if (tx == 0) {
                    break;
                }
            }
        }
    }
    if (tx == 2) {
        if (answer.indexOf('参考答案：错') != -1) {
            ans = ['错误'];
        }
        if (answer.indexOf('参考答案：对') != -1) {
            ans = ['正确'];
        }
    }
    if (tx == 3) {
        const regex = /参考答案：(.*?)\n答案解析：/s;
        const res = answer.match(regex);
        console.log(res);
        if (res && res.length == 2) {
            ans = [res[1]];
        }
    }
    return ans;
}

function getTx(str) {
    if (str.indexOf('单选题') != -1) {
        return 0;
    }
    if (str.indexOf('多选题') != -1) {
        return 1;
    }
    if (str.indexOf('判断题') != -1) {
        return 2;
    }
    // 简答题等（由于这种题型太多，就全部默认返回3了）
    // if (str.indexOf('填空题') != -1 || str.indexOf('简答题') != -1 || str.indexOf('综合题') != -1 || str.indexOf('计算题') != -1 || str.indexOf('应用题') != -1) {
    //     return 3;
    // }
    return 3;
}
