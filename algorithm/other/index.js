/**
 * 算法问题求解
 * 
 */


//大数相加:输入两个数字（字符串类型），返回 相加结果

function addNums(a, b) {
    var result = [];
    for (var i = 1; a.length - i >= 0 || b.length - i >= 0; i++) {

        var _temp = ~~(a[a.length - i] || 0) + ~~(b[b.length - i] || 0) + ~~(result[i - 1] || 0);
        // console.log(_temp);
        _temp = _temp + "";

        result[i - 1] = ~~_temp[_temp.length - 1];
        result[i] = ~~(_temp[_temp.length - 2] || 0) + (result[i] || 0);
    }
    //console.log(result);
    return result.reverse().join('').replace(/^0+/, '');
}

//找出一个文章中出现最多的单词，并表明数量
function findMaxWord(article){
    
}

