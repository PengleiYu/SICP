// 使用对数步加法实现乘法
(function () {
    // 练习1.17 本节中几个求幂算法的基础都是通过反复做乘法去求乘幂。
    // 与此类似，也可以通过反复做加法的方式求出乘积。
    // 下面的乘积函数与expt函数类似（在这里假定我们的语言里只有加法而没有乘法）：
    function times(a, b) {
        return b === 0
            ? 0
            : a + times(a, b - 1);
    }

    // 这一算法所需的步骤数相对于b是线性的。
    // 现在假定除了加法外还有一个函数double，它求出一个整数的两倍；还有函数halve，它把一个（偶）数除以2。
    // 请用这些运算设计一个类似fast_expt的求乘积函数，使之只用对数的计算步数。

    function double(x) {
        return x + x;
    }

    function halve(x) {
        return x / 2;
    }

    // 折半，步数为对数级别log2(b)
    function fast_times(a, b) {
        console.log(`fast_times(${a},${b})`)
        return b === 0
            ? 0
            : b % 2 === 0
                ? double(fast_times(a, halve(b)))
                : a + fast_times(a, b - 1);
    }

    console.log(fast_times(2, 4))
    console.log(fast_times(9, 8))
    console.log(fast_times(2, 64))
    console.log(fast_times(2, 30))
})()
