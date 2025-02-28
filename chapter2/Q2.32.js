import {append, map, pair, head, tail, display, display_list, list, is_null, is_pair, length} from "sicp";

// 使用map解决集合所有子集问题
(function () {
    // 练习2.32 我们可以用元素互不相同的表来表示集合，因此一个集合的所有子集可以表示为一个表的表。比如说，假定集合为list(1, 2, 3)，其所有子集的集合就是
    display_list(
        list(null, list(3), list(2), list(2, 3),
            list(1), list(1, 3), list(1, 2),
            list(1, 2, 3))
    );
    // display_list的展示有些问题，使用display查看完全正确
    display_list(subsets(list(1, 2, 3)))

    // 请完成下面的函数声明，该函数生成一个集合的所有子集的集合。请解释它为什么能完成这项工作。
    // 先获取不包含head的所有子集，再获取所有包含head的子集，最后合并即为所有子集
    function subsets(s) {
        if (is_null(s)) {
            return list(null);
        } else {
            const rest = subsets(tail(s));
            return append(rest, map(x => pair(head(s), x), rest));
        }
    }
})()
