// 不会被骗的费马检查变形
(function () {
    function is_even(n) {
        return n % 2 === 0;
    }

    function square(x) {
        return x * x;
    }

    // 练习1.28 费马检查的一种不会被骗的变形称为Miller-Rabin检查(Miller 1976, Rabin 1980)，
    // 它源于费马小定理的一个变形。该变形断言，如果n是素数，a是任何小于n的正整数，则a的(n-1)次幂与1模n同余。
    // 用Miller-Rabin检查考察数n的素数性时，我们随机选取数a< n并用函数expmod求a的(n-1)次幂对n的模。
    // 然而，在执行expmod中的平方步骤时，我们要查看是否发现了一个“1取模n的非平凡平方根”​，
    // 也就是说，是否存在不等于1或n-1的数，其平方取模n等于1。可以证明，如果1的这种非平凡平方根存在，那么n就不是素数。
    // 还可以证明，如果n是非素数的奇数，那么，至少存在一半的a <n，按这种方式计算an-1，会遇到1取模n的非平凡平方根。这也是Miller-Rabin检查不会受骗的原因。
    // 请修改expmod函数，让它在发现1的非平凡平方根时报告失败。利用它实现一个类似于fermat_test的函数完成Miller-Rabin检查。
    // 通过检查一些已知的素数和非素数的方式考验你的函数。提示：让expmod送出失败信号的一种方便方法是让它返回0。


    // 原理：若a和n互质，则a^2 mod n = 1只有平凡解n+1或n-1；所以若检测出非平凡解，则n是合数
    // TODO 更本质的解释需要学习抽象代数，了解模乘法群的结构
    function exp_mod(base, exp, m) {
        if (exp === 0) return 1;
        if (is_even(exp)) {
            let half = exp_mod(base, exp / 2, m);
            if (half === 0) return 0;
            let result = square(half) % m;
            // (m-1)^2 %m 必等于1，所以需要排除
            if (half !== 1 && half !== m - 1 && result === 1) {
                return 0;
            }
            return result;
        } else {
            let prev = exp_mod(base, exp - 1, m);
            if (prev === 0) return 0;
            return (base * prev) % m;
        }
    }


    function miller_rabin__test(n) {
        function try_it(a) {
            console.log(`检测${n}，使用${a}测试`)
            return exp_mod(a, n - 1, n) === 1;
        }

        // 随机数范围：1到n-1
        return try_it(1 + Math.floor(Math.random() * (n - 1)))
    }

    function fast_is_prime(n, times) {
        return times === 0
            ? true
            : miller_rabin__test(n)
                ? fast_is_prime(n, times - 1)
                : false;
    }

    const expects = [true, true, false, true, false, true, false, false,
        true, true, true, true,
        false, false, false,
        false, false, false, false, false, false,
    ];


    [2, 3, 4, 5, 6, 7, 8, 9,
        17, 23, 97, 113,//素数
        88, 99, 111,//合数
        561, 1105, 1729, 2465, 2821, 6601,//可以欺骗费马检查的Carmichael数
    ].forEach((value, index) => {
        let isPrime = fast_is_prime(value, 10/*较大的素数需要更多测试次数*/);
        console.log(`${value}\t测试成功:${isPrime === expects[index]}\t预期: ${expects[index]}\t测试结果: ${isPrime}`)
    })


    // 费马小定理的两种表述：
    // 1:若n为素数，(a^n)%n=a%n
    // 2：若a与n互质，(a^(n-1))%n=1

    // a与n互质，所以a在模n意义下可逆，即存在数b，使得ab%n=1，因此表述1可以推出表述2
})()
