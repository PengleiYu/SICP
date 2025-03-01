import {append, display_list, head, is_null, is_pair, list, map, pair, tail} from "sicp";

// 2.2.3 序列作为约定的接口
// 各个高阶函数以序列为约定接口，进而可以随意组合
(function () {
    function sum_odd_squares(tree) {
        return is_null(tree)
            ? 0
            : !is_pair(tree)
                ? tree % 2 === 1 ? tree * tree : 0
                : sum_odd_squares(head(tree)) + sum_odd_squares(tail(tree));
    }

    display_list(sum_odd_squares(list(1, list(2, list(3, 4)), 5)));

    function fib(k) {
        return k === 0
            ? 0
            : k <= 2
                ? 1
                : fib(k - 1) + fib(k - 2);
    }

    function even_fibs(n) {
        function next(k) {
            if (k > n) {
                return null;
            } else {
                const f = fib(k);
                return f % 2 === 0
                    ? pair(f, next(k + 1))
                    : next(k + 1);
            }
        }

        return next(0);
    }

    display_list(even_fibs(20));

    // 以上函数的目标可以描述为一个级联的处理步骤的信号，但这些函数中这些步骤散落在各处并耦合在一起，无法清晰对应某个步骤
    // 下面来实现可级联的各个步骤函数

    display_list(map(x => x * x, list(1, 2, 3, 4, 5)));

    function filter(predicate, sequence) {
        return is_null(sequence)
            ? null
            : predicate(head(sequence))
                ? pair(head(sequence), filter(predicate, tail(sequence)))
                : filter(predicate, tail(sequence));
    }

    display_list(filter(x => x % 2 === 1, list(1, 2, 3, 4, 5)));

    function accumulate(op, initial, sequence) {
        return is_null(sequence)
            ? initial
            // : accumulate(op, op(initial, head(sequence)), tail(sequence));
            : op(head(sequence),
                accumulate(op, initial, tail(sequence)));
    }

    display_list(accumulate((a, b) => a + b, 0, list(1, 2, 3, 4, 5)));
    display_list(accumulate((a, b) => a * b, 1, list(1, 2, 3, 4, 5)));
    display_list(accumulate(pair, null, list(1, 2, 3, 4, 5)));

    function enumerate_interval(low, high) {
        return low > high
            ? null
            : pair(low, enumerate_interval(low + 1, high));
    }

    display_list(enumerate_interval(2, 7));

    function enumerate_tree(tree) {
        return is_null(tree)
            ? null
            : !is_pair(tree)
                ? list(tree)
                : append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
    }

    display_list(enumerate_tree(list(1, list(2, list(3, 4)), 5)));


    // 使用操作序列方式实现流程
    (function () {
        function sum_odd_squares(tree) {
            return accumulate((a, b) => a + b,
                0,
                map(x => x * x,
                    filter(x => x % 2 === 1,
                        enumerate_tree(tree))));
        }

        display_list(sum_odd_squares(list(1, list(2, list(3, 4)), 5)));

        function even_fibs(n) {
            return filter(x => x % 2 === 0,
                map(fib,
                    enumerate_interval(0, 20)));
        }

        display_list(even_fibs(20));
    })();

    // 随意组合变换器
    function list_fib_squares(n) {
        return accumulate(pair,
            null,
            map(x => x * x,
                map(fib,
                    enumerate_interval(0, n))));
    }

    display_list(list_fib_squares(10));

    function product_of_squares_of_odd_elements(sequence) {
        return accumulate(
            (a, b) => a * b,
            1,
            map(x => x * x,
                filter(x => x % 2 === 1,
                    sequence)));
    }

    display_list(product_of_squares_of_odd_elements(list(1, 2, 3, 4, 5)));

    // 嵌套的映射，flatmap

    // 给定一个自然数n，要求找出所有不同的有序对i和j，其中1≤j<i≤n，使得i+j是素数。
    function flatmap(f, seq) {
        return accumulate(append, null, map(f, seq));
    }

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
                filter(is_prime_sum,
                    flatmap(i => map(j => list(i, j),
                            enumerate_interval(1, i - 1)),
                        enumerate_interval(1, n))));
        }

        display_list(prime_pairs(6));
        // display_list(flatmap(i => enumerate_interval(1, i), enumerate_interval(1, 4)));
    })();


    // 假设现在我们希望生成一个集合S的所有排列，也就是说，生成这一集合中元素的所有可能的排序序列
    (function () {
        function remove(s, x) {
            return filter(item => item !== x, s);
        }

        function permutations(s) {
            return is_null(s)
                ? list(null)
                : flatmap(x =>
                        map(p => pair(x, p),
                            permutations(remove(s, x))),
                    s)
        }

        display_list(permutations(list(1, 2, 3, 4)));
    })();
})()
