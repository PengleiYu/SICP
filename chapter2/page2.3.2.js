import {display_list, error, head, is_number, is_pair, is_string, list, tail} from "sicp";
import {deriv} from "./deriv.js";

// 2.3.2 实例：符号求导
(function () {

    (function () {
        display_list(deriv(list('+', 'x', 3), 'x'));
        display_list(deriv(list('*', 'x', 'y'), 'x'));
        display_list(deriv(list('*', list('*', 'x', 'y'), list('+', 'x', 3)), 'x'));
    })();
})()
