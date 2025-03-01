import {list, display_list, accumulate, pair, head, tail, is_null, is_pair} from "sicp";

// 使用accumulate实现树的叶子计数
(function () {
    // 练习2.35 请把2.2.2节的count_leaves重新声明为一个累积：

    function count_leaves(items) {
        return accumulate(
            (sub_tree, count) =>
                is_null(sub_tree)
                    ? count
                    : !is_pair(sub_tree)
                        ? count + 1
                        : count + count_leaves(sub_tree),
            0,
            items);
    }


    const x = pair(list(1, 2), list(3, 4));
    display_list(count_leaves(x));
    display_list(list(x, x));
    display_list(count_leaves(list(x, x)));
})();
