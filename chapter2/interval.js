import {display, head, math_max, math_min, pair, tail, error} from "sicp";

export function make_interval(lower, higher) {
    return pair(lower, higher);
}

export function lower_bound(interval) {
    return head(interval);
}

export function higher_bound(interval) {
    return tail(interval);
}

export function display_interval(x) {
    display(`[${lower_bound(x)}, ${higher_bound(x)}]`);
}

export function add_interval(x, y) {
    return make_interval(
        lower_bound(x) + lower_bound(y),
        higher_bound(x) + higher_bound(y),
    );
}

export function sub_interval(x, y) {
    const p1 = lower_bound(x) - lower_bound(y);
    const p2 = lower_bound(x) - higher_bound(y);
    const p3 = higher_bound(x) - lower_bound(y);
    const p4 = higher_bound(x) - higher_bound(y);
    return make_interval(math_min(p1, p2, p3, p4), math_max(p1, p2, p3, p4));
}

export function mul_interval(x, y) {
    const p1 = lower_bound(x) * lower_bound(y);
    const p2 = lower_bound(x) * higher_bound(y);
    const p3 = higher_bound(x) * lower_bound(y);
    const p4 = higher_bound(x) * higher_bound(y);
    return make_interval(math_min(p1, p2, p3, p4), math_max(p1, p2, p3, p4));
}

export function div_interval(x, y) {
    if (lower_bound(y) * higher_bound(y) <= 0) {
        error("区域不能横跨0 -- div_interval")
    }
    // x区间乘以y区间的倒数
    return mul_interval(x,
        make_interval(
            1 / higher_bound(y),
            1 / lower_bound(y)));
}
