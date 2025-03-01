import {append, map, pair, head, tail, display, display_list, list, is_null, is_pair, length} from "sicp";

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
})()
