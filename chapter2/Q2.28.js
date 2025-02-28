import {append, display_list, head, is_null, is_pair, list, tail} from "sicp";

// 实现树的叶子遍历
(function () {
    // 练习2.28 请写一个函数fringe，它以一个树（表示为一个表）为参数，返回一个表，该表里的元素就是这棵树的所有树叶，按从左到右的顺序排列。例如

    const x = list(list(1, 2), list(3, 4));
    display_list(fringe(x));
    display_list(fringe(list(x, x)));


    function fringe(items) {
        function iter(things, result) {
            return is_null(things)
                ? result
                : !is_pair(things)
                    ? list(things)// 注意要返回list，因为要传给append
                    : iter(tail(things),
                        append(
                            // 已遍历的叶子列表
                            result,
                            // 子树的叶子列表，要新生成
                            iter(head(things), null)));
        }

        return iter(items, null);
    }
})();
