// 使用对数步加法实现乘法（迭代形式）
(function () {
    // 练习1.18 利用练习1.16和练习1.17的结果设计一个函数，它能产生一个基于加、加倍和折半运算的迭代计算过程，
    // 只用对数的步数就能求出两个整数的乘积
    function is_even(y) {
        return y % 2 === 0;
    }

    function double(a) {
        return a + a;
    }

    function halve(a) {
        return a / 2;
    }

    // 折半，步数为对数级别log2(b)
    function fast_times(a, b) {
        console.log(`fast_times(${a},${b})`)

        // 迭代形式，不变量为 x*y+r
        function iter(x, y, result) {
            console.log(`iter(${x},${y},${result})`)
            return y === 0
                ? result
                : is_even(y)
                    ? iter(double(x), halve(y), result)
                    : iter(x, y - 1, result + x);
        }

        return iter(a, b, 0);
    }

    console.log(fast_times(2, 4))
    console.log(fast_times(9, 8))
    console.log(fast_times(2, 64))
    console.log(fast_times(2, 30))
})()
