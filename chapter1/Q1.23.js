// 优化最小因子查找，仅测试奇数
(function () {
    // 练习1.23 本节开始时给出的smallest_divisor函数做了许多无用检查：在检查了一个数能否被2整除后，完全没必要再检查它是否能被任何偶数整除。
    // 这说明test_divisor用的值不该是2, 3, 4, 5, 6, …，而应该是2, 3, 5, 7, 9, …。
    // 请实现这种修改。其中声明一个函数next，用2调用时它返回3，否则返回其输入值加2。
    // 修改smallest_divisor函数，让它用next(test_divisor)而不是test_divisor+1。
    // 请用结合了这一smallest_divisor版本的timed_prime_test运行练习1.22里那个找12个素数的测试。
    // 这样修改使检查的次数减半，你可能期望其运行速度快一倍。实际情况符合这一预期吗？
    // 如果不符，你观察到的两个算法速度的比值是什么？你如何解释比值不是2的事实？


    function display(s) {
        console.log(s)
    }

    function is_prime(n) {
        function divides(a, b) {
            return b % a === 0;
        }

        function square(x) {
            return x * x;
        }

        // 最小整除数，从2开始向上寻找整除数，直到根号n
        function smallest_divisor(n) {
            return find_divisor(n, 2);
        }

        // 仅提供奇数
        function next(n) {
            return n === 2 ? 3 : n + 2;
        }

        function find_divisor(n, test_divisor) {
            return square(test_divisor) > n
                ? n
                : divides(test_divisor, n)
                    ? test_divisor
                    : find_divisor(n, next(test_divisor));
        }

        return n === smallest_divisor(n);
    }

    function timed_prime_test(n) {
        display(n);
        return start_prime_test(n, get_time());
    }

    function get_time() {
        return Date.now();
    }

    function report_prime(elapsed_time) {
        display(' *** ')
        display(elapsed_time)
    }

    function start_prime_test(n, start_time) {
        return is_prime(n)
            ? report_prime(get_time() - start_time)
            : true;
    }


    function search_for_primes(start, end, arr = [], max_count = Number.MAX_VALUE) {
        if (start > end) {
            return;
        }
        if (arr.length >= max_count) {
            return;
        }
        if (start % 2 === 1) {
            if (!timed_prime_test(start)) {
                arr.push(start);
            }
        }
        search_for_primes(start + 1, end, arr, max_count);
    }

    // 测试函数
    // (function () {
    //     const arr = [];
    //     let start = 100;
    //     let end = 1000;
    //     search_for_primes(start, end, arr, Number.MAX_VALUE);
    //     console.log(`${start}-${end}之间的素数为${arr}`);
    // })();

    // 请用你的函数找出大于1000、大于10000、大于100000和大于1000000的最小的三个素数。
    // (function () {
    //     function smallest_3_primes(n) {
    //         let arr = [];
    //         search_for_primes(n, 2 * n, arr, 3)
    //         return arr;
    //     }
    //
    //     [1000, 10000, 100000, 1000000]
    //         .map(value => {
    //             let smallest3Primes = smallest_3_primes(value);
    //             return [value, smallest3Primes];
    //         })
    //         .forEach(value => {
    //             console.log(`大于${value[0]}的最小三个素数:${value[1]}`)
    //         });
    //     // 大于1000的最小三个素数:1009,1013,1019
    //     // 大于10000的最小三个素数:10007,10009,10037
    //     // 大于100000的最小三个素数:100003,100019,100043
    //     // 大于1000000的最小三个素数:1000003,1000033,1000037
    // })();

    // 可能电脑太快了，以下测试耗时都是0
    timed_prime_test(1009);
    timed_prime_test(10007);
    timed_prime_test(100003);
    timed_prime_test(1000003);


})()
