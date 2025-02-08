// 验证欺骗费马检查的卡迈克尔数
(function () {
    function is_even(n) {
        return n % 2 === 0;
    }

    function square(x) {
        return x * x;
    }

    function exp_mod(base, exp, m) {
        return exp === 0
            ? 1
            : is_even(exp)
                ? square(exp_mod(base, exp / 2, m)) % m
                : (base * exp_mod(base, exp - 1, m)) % m;
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

    // 练习1.27 请证明脚注47中列出的那些Carmichael数确实能骗倒费马检查。
    // 也就是说，写一个函数，它以整数n为参数，对每个a < n检查an是否与a模n同余。
    // 然后用你的函数去检查前面给出的那些Carmichael数。


    [3, 4, 5, 6, 7, 8, 9,
        17, 23, 97, 113,//素数
        88, 99, 111,//合数
        561, 1105, 1729, 2465, 2821, 6601,//可以欺骗费马检查的Carmichael数，其实是合数
    ].forEach(value => {
        let isPrime = fast_is_prime(value, 10/*灵敏度很高，10就够用了*/);
        console.log(`费马检查方式：${value} ${isPrime ? '素数' : '合数'}`)
    })
})()
