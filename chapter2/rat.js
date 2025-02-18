import {display, head, pair, stringify, tail} from 'sicp'

function gcd(a, b) {
    return b === 0
        ? a
        : gcd(b, a % b);
}

// 有理数的使用函数
export function add_rat(x, y) {
    return make_rat(
        number(x) * denom(y) + number(y) * denom(x),
        denom(x) * denom(y)
    );
}

export function sub_rat(x, y) {
    return make_rat(
        number(x) * denom(y) - number(y) * denom(x),
        denom(x) * denom(y)
    );
}

export function mul_rat(x, y) {
    return make_rat(
        number(x) * number(y),
        denom(x) * denom(y)
    );
}

export function div_rat(x, y) {
    return make_rat(
        number(x) * denom(y),
        denom(x) * number(y)
    );
}

export function equal_rat(x, y) {
    return number(x) * denom(y) === number(y) * denom(x);
}

// 有理数的实现
export function make_rat(n, d) {
    // return pair(n, d);
    // 新实现，有理数化简
    const g = gcd(n, d);
    return pair(n / g, d / g);
}

export function number(x) {
    return head(x);
}

export function denom(x) {
    return tail(x);
}

export function print_rat(x) {
    return display(stringify(number(x)) + " / " + stringify(denom(x)));
}

