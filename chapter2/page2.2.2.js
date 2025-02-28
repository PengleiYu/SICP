import {map, pair, head, tail, display, display_list, list, is_null, is_pair, length} from "sicp";

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


    // 对树的缩放
    (function () {
        function scale_tree(tree, factor) {
            return is_null(tree)
                ? null
                : !is_pair(tree)
                    ? tree * factor
                    // 这里需要手动取子元素再应用递归函数，并最终用pair组合结果，如果用了map就省去这些了
                    : pair(scale_tree(head(tree), factor), scale_tree(tail(tree), factor));
        }

        let tree1 = list(1, list(2, list(3, 4), 5), list(6, 7));
        display_list(tree1);
        display_list(scale_tree(tree1, 10));
    })();

    // 使用map来实现缩放
    (function () {
        function scale_tree(tree, factor) {
            return map(
                // 使用map时，f收到的每个参数都是列表元素，所以不用手动取，直接调用递归函数即可
                sub_tree => is_pair(sub_tree) ? scale_tree(sub_tree, factor) : sub_tree * factor,
                tree
            );
        }

        let tree1 = list(1, list(2, list(3, 4), 5), list(6, 7));
        display_list(tree1);
        display_list(scale_tree(tree1, 10));
    })();
})();
