import {
    display_list,
    error,
    head,
    is_list,
    is_null,
    is_number,
    is_pair,
    is_string,
    list,
    math_exp,
    tail,
    length,
    pair
} from "sicp";

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
                    : is_exp(exp)
                        ? make_product(
                            make_product(
                                exponent(exp), make_exp(
                                    base(exp), make_sum(
                                        exponent(exp),
                                        -1),
                                ),
                            ),
                            deriv(base(exp), variable),
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

//可以处理list(+,1,2,3,4,5)的形式，不影响和的底层表示
//make_sum返回的结果还是嵌套的list(+,1,list(+,2,3))
function augend(e) {
    const rest = tail(tail(e));
    return length(rest) === 1
        ? head(rest)
        : pair('+', rest);
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

// 可以处理list(*,1,2,3,4,5)的形式
function multiplicand(e) {
    const rest = tail(tail(e));
    return length(rest) === 1
        ? head(rest)
        : pair('*', rest);
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

function is_exp(e) {
    return is_pair(e) && head(e) === '**' && is_number(exponent(e));
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

function base(e) {
    return head(tail(e));
}

function exponent(e) {
    return head(tail(tail(e)));
}

function number_equal(exp, num) {
    return is_number(exp) && exp === num;
}

export {
    deriv,
    is_variable,
    is_same_variable,
    is_sum,
    addend,
    augend,
    make_sum,
    is_product,
    multiplier,
    multiplicand,
    make_product,
    is_exp,
    make_exp,
    base,
    exponent,
    number_equal,
}
