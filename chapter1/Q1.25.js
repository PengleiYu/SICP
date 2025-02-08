// 对幂取模进行分治优化的必要性
(function () {
    function is_even(n) {
        return n % 2 === 0;
    }

    function square(x) {
        return Math.pow(x, 2);
    }

    function fast_exp(b, n) {
        return n === 0
            ? 1
            : is_even(n)
                ? square(fast_exp(b, n / 2))
                : b * fast_exp(b, n - 1);
    }

    function fermat_test(n) {
        function try_it(a) {
            return exp_mod(a, n, n) === a;
        }

        return try_it(1 + Math.floor(Math.random() * (n - 1)))
    }

    function fast_is_prime(n, times) {
        return times === 0
            ? true
            : fermat_test(n)
                ? fast_is_prime(n, times - 1)
                : false;
    }

    // function exp_mod(base, exp, m) {
    //     return exp === 0
    //         ? 1
    //         : is_even(exp)
    //             ? square(exp_mod(base, exp / 2, m)) % m
    //             : (base * exp_mod(base, exp - 1, m)) % m;
    // }

    // 练习1.25 Alyssa P.Hacker提出，expmod做了过多的额外工作。她说，毕竟我们已经知道怎样计算乘幂，因此只需要简单地写：
    function exp_mod(base, exp, m) {
        return fast_exp(base, exp) % m;
    }

    // 她说的对吗？这个函数能很好地服务于我们的快速素数检查程序吗？请解释这些问题。

    let expects = [true, false, true, false, true, false, false,
        true, true, true, true,
        false, false, false,
        false, false, false, false, false, false,
    ];


    // 从结果可以看出，这里从17开始所有的测试结果都认为是合数
    // 原因是指数增长太快，很快就溢出了，所以必须将求幂取模放一起，使用指数分治法，每次乘积立即取模，避免了溢出问题
    [3, 4, 5, 6, 7, 8, 9,
        17, 23, 97, 113,//素数
        88, 99, 111,//合数
        561, 1105, 1729, 2465, 2821, 6601,//可以欺骗费马检查的Carmichael数
    ].forEach((value, index) => {
        let isPrime = fast_is_prime(value, 10/*灵敏度很高，10就够用了*/);
        console.log(`${value}\t测试成功:${isPrime === expects[index]}\t预期: ${expects[index]}\t测试结果: ${isPrime}`)
    })
})()
