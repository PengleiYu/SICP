import {list, display_list, accumulate, pair, head, tail, is_null, is_pair} from "sicp";

// 使用accumulate实现map/append/length
(function () {
    // 练习2.33 下面是一些把基本表操作看作累积的声明，请填充空缺的表达式，完成它们：
    function map(f, sequence) {
        return accumulate((x, y) => pair(f(x), y), null, sequence)
    }

    display_list(map(x => 2 * x, list(1, 2, 3, 4, 5)));

    function append(seq1, seq2) {
        return accumulate(pair, seq2, seq1);
    }

    display_list(append(list(1, 2, 3), list(4, 5, 6)));

    function length(seq) {
        return accumulate((a, b) => b + 1, 0, seq);
    }

    display_list(length(list(1, 2, 3, 4, 5)));
})();
