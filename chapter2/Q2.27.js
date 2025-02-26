import {pair, head, tail, display, display_list, list, is_null, is_pair, length, for_each, append, reverse} from "sicp";

// 实现序列的deep_reverse函数
(function () {
    // 练习2.27 请修改你在练习2.18做的reverse函数，做一个deep_reverse函数。它以一个表为参数，返回另一个表作为值。结果表中的元素反转，所有的子树也反转。例如：
    const x = list(list(1, 2), list(3, 4));
    display_list(x);// list(list(1, 2), list(3, 4))
    display_list(reverse(x));// list(list(3, 4), list(1, 2))
    display_list(deep_reverse(x));// list(list(4, 3), list(2, 1))

    function deep_reverse(items) {
        function iter(items, result) {
            return is_null(items)
                ? result
                : !is_pair(items)
                    ? items
                    : iter(tail(items),
                        pair(
                            // 注意这里是新开遍历，不要使用旧的result
                            iter(head(items), null)
                            , result));
        }

        return iter(items, null);
    }
})()
