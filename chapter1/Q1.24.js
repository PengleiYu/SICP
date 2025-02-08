// 测试费马检查法耗时增长速度
(function () {
    // 练习1.24 请修改练习1.22的timed_prime_test函数，让它使用fast_is_prime（费马方法）​，并检查你在该练习中找出的12个素数。
    // 因为费马检查具有Θ(log n)的增长速度，对于检查接近1000000的素数与检查接近1000的素数，你预期两个时间之间的比较应该怎样？
    // 你的数据符合这一预期吗？你能解释所发现的任何不符吗？
    function is_even(n) {
        return n % 2 === 0;
    }

    function square(x) {
        return x * x;
    }

    // 求幂取模
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


    function get_time() {
        return Date.now();
    }

    function display(s) {
        console.log(s)
    }

    function timed_prime_test(n) {
        display(n);
        return start_prime_test(n, get_time());
    }

    function start_prime_test(n, start_time) {
        return fast_is_prime(n, 10)
            ? report_prime(get_time() - start_time)
            : true;
    }

    function report_prime(elapsed_time) {
        display(' *** ')
        display(elapsed_time)
    }

    // 费马检查增长速度为log(n)，所以耗时应该为2倍
    // 可能电脑太快了，以下测试耗时都是0
    timed_prime_test(1009);
    timed_prime_test(1000003);
})()
