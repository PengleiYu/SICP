import {append, map, list, display_list, accumulate, pair, head, tail, is_null, is_pair} from "sicp";

// reverse分别用fold_left和fold_right实现
(function () {
    function fold_left(op, init, sequence) {
        function iter(result, rest) {
            return is_null(rest)
                ? result
                : iter(op(result, head(rest)), tail(rest));
        }

        return iter(init, sequence);
    }

    const fold_right = accumulate;

    // 练习2.39 请基于练习2.38的fold_right和fold_left完成下面两个有关函数reverse（练习2.18）的声明：

    (function () {
        function reverse(sequence) {
            return fold_right((x, y) => append(y, list(x)), null, sequence);
        }

        const l = list(1, 4, 9, 16, 25);
        display_list(reverse(l));
    })();

    (function () {
        function reverse(sequence) {
            return fold_left((x, y) => pair(y, x), null, sequence);
        }

        const l = list(1, 4, 9, 16, 25);
        display_list(reverse(l));
    })();
})()
