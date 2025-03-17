import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair, append} from "sicp";

// 集合作为可重复元素的无序表
(function () {
    // 练习2.60 我们前面说明了如何把集合表示为没有重复元素的表。现在假定允许重复，例如，集合{1,2, 3}可能被表示为表list(2, 3, 2, 1, 3, 2, 2)。
    // 请为在这种表示上的操作设计函数is_element_of_set、adjoin_set，union_set和intersection_set。
    function is_element_of_set(x, set) {
        return is_null(set)
            ? false
            : equal(x, head(set))
                ? true
                : is_element_of_set(x, tail(set));
    }

    function adjoin_set(x, set) {
        return pair(x, set);
    }

    function intersection_set(set1, set2) {
        return is_null(set1) || is_null(set2)
            ? null
            : is_element_of_set(head(set1), set2)
                ? pair(head(set1), intersection_set(tail(set1), set2))
                : intersection_set(tail(set1), set2);
    }

    function union_set(set1, set2) {
        return append(set1, set2);
    }

    // 与前面不允许重复的表示里的相应操作相比，现在这些操作的效率如何？
    // is_element_of_set还是O(n)，adjoin_set从O(n)变为O(1)，intersection_set还是O(n^2)，union_set从O(n^2)变为O(n)

    // 在什么样的应用中你更倾向于使用这种表示，而不用前面那种无重复的表示？
    // 在需要频繁添加元素和合并集合的应用中，允许重复的表示方式更高效。例如，日志记录、事件追踪或统计分析中，允许重复的列表可以更高效地处理数据。
    // 然而，在需要频繁查询或交集操作的应用中，可能更倾向于使用不允许重复的表示方式，以避免处理重复元素带来的额外开销。

    (function () {
        const set1 = list(1, 2, 2, 3, 3, 4);
        const set2 = list(2, 2, 2, 3);
        display_list(is_element_of_set(2, set1));
        display_list(is_element_of_set(5, set1));
        display_list(adjoin_set(2, set1));
        display_list(adjoin_set(5, set1));
        display_list(intersection_set(set1, set2));
        display_list(intersection_set(set2, set1));
        display_list(union_set(set1, set2));
        display_list(union_set(set2, set1));
    })();
})();
