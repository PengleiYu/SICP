import {map, pair, head, tail, display, display_list, list, is_null, is_pair, length} from "sicp";

// 实现对树遍历平方
(function () {
    // 练习2.30 请声明一个函数square_tree，它与练习2.21中的函数square_list类似，也就是说，它应该具有下面的行为：
    display_list(square_tree(list(1,
        list(2, list(3, 4), 5),
        list(6, 7))));

    // list(1, list(4, list(9, 16), 25), list(36, 49))

    function square_tree(tree) {
        return square_tree_map(tree);
        // return square_tree_direct(tree);
    }

    // 直接实现
    function square_tree_direct(tree) {
        return is_null(tree)
            ? null
            : !is_pair(tree)
                ? tree * tree
                : pair(square_tree_direct(head(tree)), square_tree_direct(tail(tree)));
    }

    // 使用高阶函数map实现
    function square_tree_map(tree) {
        return map(x => is_pair(x) ? square_tree_map(x) : x * x, tree);
    }
})()
