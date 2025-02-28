import {map, pair, head, tail, display, display_list, list, is_null, is_pair, length} from "sicp";

// 实现高阶函数tree_map
(function () {
    display_list(square_tree(list(1,
        list(2, list(3, 4), 5),
        list(6, 7))));

    // list(1, list(4, list(9, 16), 25), list(36, 49))

    // 练习2.31 请把你对练习2.30的解答进一步抽象为一个函数tree_map，使它能支持我们采用下面的形式声明square_tree：
    function square_tree(tree) {
        return tree_map(x => x * x, tree);
    }

    function tree_map(f, tree) {
        return is_null(tree)
            ? null
            : !is_pair(tree)
                ? f(tree)
                : pair(tree_map(f, head(tree)), tree_map(f, tail(tree)));
    }
})()
