

//大数相加
function addNums(a, b) {
    var result = [];
    for (var i = 1; a.length - i >= 0 || b.length - i >= 0; i++) {

        var _temp = ~~(a[a.length - i] || 0) + ~~(b[b.length - i] || 0) + ~~(result[i - 1] || 0);
        // console.log(_temp);
        _temp = _temp + "";

        result[i - 1] = ~~_temp[_temp.length - 1] ;
        result[i] = ~~(_temp[_temp.length - 2] || 0) + (result[i] || 0);
    }
    //console.log(result);
    return result.reverse().join('').replace(/^0+/, '');
}

(function () {
    console.log(addNums("579132875092798769876669876698769789", '12346987698669876979876987689769876978658'));
})();