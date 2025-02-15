// 无穷连分式计算tan(x)
(function () {
    // 练习1.39 1770年，德国数学家J.H.Lambert发表了正切函数的连分式表示：[插图]其中x用弧度表示。
    // 请声明一个函数tan_cf(x,_k)，它基于Lambert公式计算正切函数的近似值。k描述计算的项数，就像练习1.37一样。

    function tan_cf(x, k) {
        function iter(x, i, result) {
            console.log(`iter:i=${i},result=${result}`)
            return i === 0
                ? result
                : iter(x, i - 1, x * x / (2 * i - 1 - result));
        }

        return iter(x, k, 0) / x;
    }

    console.log('连分式求tan(PI/4)', tan_cf(Math.PI / 4, 10));

    (function () {
        let expect = 1;
        let i = 0;
        let result;
        do {
            result = tan_cf(Math.PI / 4, ++i);
            console.log(`i=${i},result=${result}`)
        } while (Math.abs(result - expect) > 0.00005)
        console.log(`连分式${i}次迭代后，result=${result},expect=${expect},差值=${result - expect}`)
    })()


    // 使用更通用的无限连分式函数
    function cont_frac(n, d, k) {
        function iter(n, d, i, result) {
            return i === 0
                ? result
                : iter(n, d, i - 1, n(i) / (d(i) + result))
        }

        return iter(n, d, k, 0);
    }

    function tan_cf2(x, k) {
        return -cont_frac(i => -x * x, i => 2 * i - 1, k) / x;
    }

    console.log(`通用连分式求tan(PI/4)=${tan_cf2(Math.PI / 4, 10)}`);
    (function () {
        let expect = 1;
        let i = 0;
        let result;
        do {
            result = tan_cf2(Math.PI / 4, ++i);
            console.log(`i=${i},result=${result}`)
        } while (Math.abs(result - expect) > 0.00005)
        console.log(`通用连分式${i}次迭代后，result=${result},expect=${expect},差值=${result - expect}`)
    })()
})()
