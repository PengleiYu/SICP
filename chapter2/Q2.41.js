import {append, display_list, filter, head, list, map, pair, tail, accumulate} from "sicp";

// 嵌套的flatmap
(function () {
    function flatmap(f, seq) {
        return accumulate(append, null, map(f, seq));
    }

    function enumerate_interval(low, high) {
        return low > high
            ? null
            : pair(low, enumerate_interval(low + 1, high));
    }

    // 练习2.41 请写一个函数，它能生成所有小于等于给定整数n的正的相异整数i、j和k的有序三元组，其中每个三元组的三个元之和都等于给定的整数s。
    function check_sum(sum, seq) {
        return head(seq) + head(tail(seq)) + head(tail(tail(seq))) === sum;
    }

    function test(n, s) {
        return filter(seq => check_sum(s, seq),
            flatmap(i =>
                    flatmap(j =>
                            map(k => list(i, j, k), enumerate_interval(1, j - 1)),
                        enumerate_interval(1, i - 1)),
                enumerate_interval(1, n)));
    }

    display_list(test(10, 15));
})()
