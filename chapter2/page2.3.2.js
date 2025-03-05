import {display_list, error, head, is_number, is_pair, is_string, list, tail} from "sicp";

// 2.3.2 实例：符号求导
(function () {
    function deriv(exp, variable) {
        return is_number(exp)
            ? 0
            : is_variable(exp)
                ? is_same_variable(exp, variable) ? 1 : 0
                : is_sum(exp)
                    ? make_sum(
                        deriv(addend(exp), variable),
                        deriv(augend(exp), variable))
                    : is_product(exp)
                        ? make_sum(
                            make_product(
                                multiplier(exp),
                                deriv(multiplicand(exp), variable),
                            ),
                            make_product(
                                multiplicand(exp),
                                deriv(multiplier(exp), variable),
                            ),
                        )
                        : error(exp, 'unknown expression type -- deriv');
    }


    function is_variable(e) {
        return is_string(e);
    }

    function is_same_variable(v1, v2) {
        return is_variable(v1) && is_variable(v2) && v1 === v2;
    }

    function is_sum(e) {
        return is_pair(e) && head(e) === '+'
    }

    function addend(e) {
        return head(tail(e));
    }

    function augend(e) {
        return head(tail(tail(e)));
    }

    function make_sum(a1, a2) {
        return number_equal(a1, 0)
            ? a2
            : number_equal(a2, 0)
                ? a1
                : is_number(a1) && is_number(a2)
                    ? a1 + a2
                    : list('+', a1, a2);
    }

    function is_product(e) {
        return head(e) === '*';
    }

    function multiplier(e) {
        return head(tail(e));
    }

    function multiplicand(e) {
        return head(tail(tail(e)));
    }

    function make_product(m1, m2) {
        return number_equal(m1, 0) || number_equal(m2, 0)
            ? 0
            : number_equal(m1, 1)
                ? m2
                : number_equal(m2, 1)
                    ? m1
                    : is_number(m1) && is_number(m2)
                        ? m1 * m2
                        : list('*', m1, m2);
    }

    function number_equal(exp, num) {
        return is_number(exp) && exp === num;
    }

    (function () {
        display_list(deriv(list('+', 'x', 3), 'x'));
        display_list(deriv(list('*', 'x', 'y'), 'x'));
        display_list(deriv(list('*', list('*', 'x', 'y'), list('+', 'x', 3)), 'x'));
    })();
})()
