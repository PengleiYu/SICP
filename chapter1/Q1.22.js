// 验证素数基本算法的耗时增长阶为根号n
(function () {
    // 练习1.22 假设有一个无参数的基本函数get_time，它返回一个整数，表示从1970年1月1日的00:00:00[插图]起到现在已经过去的微秒数。
    // 如果对整数n调用下面的timed_prime_test函数，它将打印出n，然后检查n是否素数。
    // 如果n是素数，函数将打印出三个星号[插图]，随后是执行这一检查所用的时间量。
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

        function find_divisor(n, test_divisor) {
            return square(test_divisor) > n
                ? n
                : divides(test_divisor, n)
                    ? test_divisor
                    : find_divisor(n, test_divisor + 1);
        }

        return n === smallest_divisor(n);
    }

    function get_time() {
        return Date.now();
    }

    function timed_prime_test(n) {
        display(n);
        return start_prime_test(n, get_time());
    }

    function start_prime_test(n, start_time) {
        return is_prime(n)
            ? report_prime(get_time() - start_time)
            : true;
    }

    function report_prime(elapsed_time) {
        display(' *** ')
        display(elapsed_time)
    }


    // 请利用这个函数写一个search_for_primes函数，它检查给定范围内连续的各个奇数的素性。
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


    // 请注意检查每个素数所需的时间。因为这一检查算法具有根号n的增长阶，你可以期望在10000附近的素数检查耗时大约为在1000附近的素数检查的根号10倍。
    // 你得到的数据确实如此吗？
    // 由100000和1000000得到的数据，对这一根号n预测的支持情况如何？
    // 概念上说，在你的机器上运行的时间正比于计算所需的步数，你的结果符合这一说法吗？

    // 可能电脑太快了，以下测试耗时都是0
    timed_prime_test(1009);
    timed_prime_test(10007);
    timed_prime_test(100003);
    timed_prime_test(1000003);
})()
