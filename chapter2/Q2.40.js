import {append, display_list, filter, head, list, map, pair, tail, accumulate} from "sicp";

// 使用flatmap简化有序对生成
(function () {
    function flatmap(f, seq) {
        return accumulate(append, null, map(f, seq));
    }

    function enumerate_interval(low, high) {
        return low > high
            ? null
            : pair(low, enumerate_interval(low + 1, high));
    }

    // 练习2.40 请写一个函数unique_pairs，给它一个整数参数n，它产生所有序对(i, j)的序列，其中1≤j<i≤n。请用unique_pairs简化上面prime_sum_pairs的定义。
    function unique_pairs(n) {
        return flatmap(i =>
                map(j => list(i, j),
                    enumerate_interval(1, i - 1)),
            enumerate_interval(1, n));
    }

    display_list(unique_pairs(9));


    (function () {
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

        function is_prime_sum(pair) {
            return is_prime(head(pair) + head(tail(pair)));
        }

        function make_pair_sum(pair) {
            return list(head(pair), head(tail(pair)), head(pair) + head(tail(pair)));
        }

        function prime_pairs(n) {
            return map(make_pair_sum,
                filter(is_prime_sum, unique_pairs(n)));
        }

        display_list(prime_pairs(6));
    })();
})()
