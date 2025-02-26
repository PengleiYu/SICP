import {pair, head, tail, display, display_list, list, is_null, is_pair, length, for_each, append} from "sicp";

// 对比pair、list的实际表示
(function () {
    // 练习2.26 假设x和y定义为如下的两个表：
    const x = list(1, 2, 3);
    const y = list(4, 5, 6);

    // 解释器对下面各个表达式将打印出什么结果？
    display(append(x, y));
    // [1, [2, [3, [4, [5, [6, null]]]]]]
    display(pair(x, y));
    // [[1, [2, [3, null]]], [4, [5, [6, null]]]]
    display(list(x, y));
    // [[1, [2, [3, null]]], [[4, [5, [6, null]]], null]]
})()
