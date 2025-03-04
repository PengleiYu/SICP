import {append, display_list, display, head, is_null, is_pair, list, map, pair, tail} from "sicp";

// 2.3.1 字符串
(function () {
    // 列表中的字符串
    (function () {
        const a = 1;
        const b = 2;
        display(list(a, b));
        display(list("a", "b"));
        display(list("a", b));
    })();

    (function () {
        function member(item, x) {
            return is_null(x)
                ? null
                : item === head(x)
                    ? x
                    : member(item, tail(x));
        }

        display_list(member("apple", list("pear", "banana", "prune")));
        display_list(member("apple", list("x", "y", "apple", "pear")));
    })();
})()
