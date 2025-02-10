// 1.2.6 素数检查的概率算法：费马检查
(function () {
    function divides(a, b) {
        return b % a === 0;
    }

    function square(x) {
        return x * x;
    }

    // 1, 传统检查素数，增长阶为根号n
    function is_prime(n) {
        return n === smallest_divisor(n);
    }

    // 最小整除数，从2开始向上寻找整除数，直到根号n
    function smallest_divisor(n) {
        return find_divisor(n, 2);
    }

    function find_divisor(n, test_divisor) {
        return square(test_divisor) > n
            ? n
            : divides(test_divisor, n)
                ? test_divisor
                : find_divisor(n, test_divisor + 1);
    }

    [3, 4, 5, 6, 7, 8, 9].forEach(value => {
        console.log(`smallest_divisor方式：${value} is prime? ${is_prime(value)}`)
    })

    // 2，概率算法：费马检查
    // 费马小定理：如果n是素数，a是小于n的任意正整数，那么a的n次方与a模n同余。
    function is_even(n) {
        return n % 2 === 0;
    }

    // 求幂取模
    function exp_mod(base, exp, m) {
        return exp === 0
            ? 1
            : is_even(exp)
                // 重点：这里利用了公式 ab%m=(a%m)(b%m)%m
                ? square(exp_mod(base, exp / 2, m)) % m
                : (base * exp_mod(base, exp - 1, m)) % m;
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

    const expects = [true, false, true, false, true, false, false,
        true, true, true, true,
        false, false, false,
        false, false, false, false, false, false,
    ];


    [3, 4, 5, 6, 7, 8, 9,
        17, 23, 97, 113,//素数
        88, 99, 111,//合数
        561, 1105, 1729, 2465, 2821, 6601,//可以欺骗费马检查的Carmichael数
    ].forEach((value, index) => {
        let isPrime = fast_is_prime(value, 10/*灵敏度很高，10就够用了*/);
        console.log(`${value}\t测试成功:${isPrime === expects[index]}\t预期: ${expects[index]}\t测试结果: ${isPrime}`)
    })
})()
