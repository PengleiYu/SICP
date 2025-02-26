import {pair, head, tail, display, display_list, list, is_null, is_pair, length} from "sicp";

(function () {
    // 2.2.2 层次结构
    const x = pair(list(1, 2), list(3, 4));
    display(length(x));
    display(count_leaves(x));
    display(list(x, x));
    display(length(list(x, x)));
    display(count_leaves(list(x, x)));

    // 计算列表中的叶子数量
    function count_leaves(items) {
        return is_null(items)//空表无叶子
            ? 0
            : !is_pair(items) // 单个叶子
                ? 1
                : count_leaves(head(items)) + count_leaves(tail(items));// head的叶子数+tail的叶子数
    }
})();
