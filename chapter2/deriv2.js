import {error, head, is_list, is_number, is_pair, is_string, list, math_exp, pair, tail} from "sicp";
import {make_table} from "../chapter3/table2.js";

const table = make_table();

function put(op, type, item) {
    return table('insert')(op, type, item);
}

function get(op, type) {
    return table('lookup')(op, type);
}

const OP_DERIV = "deriv";

function install_sum_deriv() {
    put(OP_DERIV, "+",
        (args, variable) =>
            make_sum(
                deriv(head(args), variable),
                deriv(head(tail(args)), variable)))
}

function install_product_deriv() {
    put(OP_DERIV, "*",
        (args, variable) =>
            make_sum(
                make_product(
                    head(args),
                    deriv(head(tail(args)), variable),
                ),
                make_product(
                    head(tail(args)),
                    deriv(head(args), variable),
                ),
            ))
}

function install_exp() {
    put(OP_DERIV, "**",
        (args, variable) =>
            make_product(
                make_product(
                    head(tail(args)), make_exp(
                        head(args), make_sum(
                            head(tail(args)),
                            -1),
                    ),
                ),
                deriv(head(args), variable),
            ));
}

install_sum_deriv();
install_product_deriv();
install_exp();

function deriv(exp, variable) {
    return is_number(exp)
        ? 0
        : is_variable(exp)
            ? is_same_variable(exp, variable) ? 1 : 0
            // 不支持一个符号跟无限多参数的表达式
            : get(OP_DERIV, operator(exp))(operands(exp), variable);
}

function operator(exp) {
    return head(exp);
}

function operands(exp) {
    return tail(exp);
}

function is_variable(e) {
    return is_string(e);
}

function is_same_variable(v1, v2) {
    return is_variable(v1) && is_variable(v2) && v1 === v2;
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

function make_exp(base, exponent) {
    return is_number(base) && is_number(exponent)
        ? math_exp(base, exponent)
        : is_number(exponent) && number_equal(exponent, 0)
            ? 1
            : is_number(exponent) && number_equal(exponent, 1)
                ? base
                : list('**', base, exponent);
}

function number_equal(exp, num) {
    return is_number(exp) && exp === num;
}

export {
    deriv,
    is_variable,
    is_same_variable,
    make_sum,
    make_product,
    make_exp,
    number_equal,
}
