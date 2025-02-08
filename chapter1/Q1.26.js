// 不正确的幂取模改动
(function () {
    function is_even(n) {
        return n % 2 === 0;
    }


    // 进行一次费马检查
    function fermat_test(n) {
        function try_it(a) {
            return exp_mod(a, n, n) === a;
        }

        // 随机数范围：1到n-1
        return try_it(1 + Math.floor(Math.random() * (n - 1)))
    }

    // 使用费马检查测试素数
    // 不变量是什么
    function fast_is_prime(n, times) {
        return times === 0
            ? true
            : fermat_test(n)
                // 通过费马检查则进行下一次检查
                ? fast_is_prime(n, times - 1)
                // 未通过则立即失败
                : false;
    }

    // 练习1.26 Louis Reasoner在做练习1.24时遇到很大困难，他的fast_is_prime检查看起来运行得比他写的is_prime还慢。
    // Louis请他的朋友Eva Lu Ator过来帮忙。在检查Louis的代码时，两人发现他重写了expmod函数，其中采用显式的乘法而没有调用square：
    function exp_mod(base, exp, m) {
        return exp === 0
            ? 1
            : is_even(exp)
                ? (exp_mod(base, exp / 2, m) * exp_mod(base, exp / 2, m)) % m
                : (base * exp_mod(base, exp - 1, m)) % m;
    }
    // “我看不出来这会造成什么不同，”Louis说。“我能看出，”Eva说，“用这种方式写这个函数，你就把一个Θ(log n)的计算过程变成Θ(n)的了。
    // ”请解释这个问题。


    // 很简单，偶数情况下exp_mod重复计算了两次，导致运算次数是旧实现的平方倍
})()
