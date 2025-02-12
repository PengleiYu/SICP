// 高阶函数之带过滤器的累积函数
(function () {
    // 练习1.33 你可以引进一个针对被组合项的过滤器(filter)概念，写出一个更一般的accumulate（练习1.32）版本，
    // 对于从给定范围得到的项，该函数只组合起那些满足特定条件的项。这样就得到了一个filtered_accumulate抽象，其参数与上面的累积函数一样，
    // 再增加一个表示所用过滤器的谓词参数。请把filtered_accumulate声明为一个函数，并用下面实例展示如何使用filtered_accumulate：

    function filtered_accumulate(combiner, null_value, term, a, next, b, filter) {
        // 这个迭代实现里，把null_value当成result了，也可以声明一个内部函数，专门使用result参数
        return a > b
            ? null_value
            : filtered_accumulate(combiner,
                filter(a) ? combiner(null_value, term(a)) : null_value,
                term, next(a), next, b, filter,);

    }

    // a.区间a到b中的所有素数之和（假定你已经有谓词is_prime）。
    function is_prime(n) {
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
                    // 重点：这里利用了公式 ab%m=(a%m)(b%m)%m
                    ? square(exp_mod(base, exp / 2, m)) % m
                    : (base * exp_mod(base, exp - 1, m)) % m;
        }

        function fermat_test(n) {
            function try_it(a) {
                return exp_mod(a, n, n) === a;
            }

            // 随机数范围：1到n-1
            return try_it(1 + Math.floor(Math.random() * (n - 1)))
        }

        function fast_is_prime(n, times) {
            return times === 0
                ? true
                : fermat_test(n)
                    // 通过费马检查则进行下一次检查
                    ? fast_is_prime(n, times - 1)
                    // 未通过则立即失败
                    : false;
        }

        return fast_is_prime(n, 10)
    }


    const a = 0, b = 97;
    const numbers = Array.from({length: b - a + 1}, (v, k) => k + a)

    const prime_numbers = numbers.filter(is_prime);
    console.log(prime_numbers)
    console.log(prime_numbers.reduce((previousValue, currentValue) => previousValue + currentValue))
    let sum_prime = filtered_accumulate(
        (a, b) => a + b,
        0, a => a, a, a => a + 1, b, is_prime,);
    console.log(`${a}到${b}之间的素数之和为${sum_prime}`);

    // b.求小于n的所有与n互素的正整数（即所有满足GCD(i, n)=1的整数i<n）之乘积。

    function is_prime_n(i, n) {
        function gcd(a, b) {
            return b === 0
                ? a
                : gcd(b, a % b);
        }

        return gcd(n, i) === 1
    }

    const n = 22;
    const numbers2 = Array.from({length: n}, (v, k) => k + a)
    const gcd_numbers = numbers2.filter(value => is_prime_n(value, n))
    console.log(gcd_numbers)
    console.log(gcd_numbers.reduce((previousValue, currentValue) => previousValue * currentValue));
    const product_prime_n = filtered_accumulate(
        (a, b) => a * b,
        1, a => a, a, a => a + 1, n, a => is_prime_n(a, n),
    )
    console.log(`小于${n}的所有与之互素的正整数之积为${product_prime_n}`)
})()
