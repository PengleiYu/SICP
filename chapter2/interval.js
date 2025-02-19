import {display, head, math_max, math_min, pair, tail, error} from "sicp";

export function make_center_width(c, w) {
    return make_interval(c - w, c + w);
}

export function center(i) {
    return (lower_bound(i) + higher_bound(i)) / 2;
}

export function width(i) {
    return (higher_bound(i) - lower_bound(i)) / 2;
}

export function make_center_percent(c, p) {
    return make_interval(c * (1 - p), c * (1 + p));
}

export function percent(i) {
    const up = higher_bound(i);
    const low = lower_bound(i);
    return (up - low) / (up + low);
}

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
    const a = lower_bound(x);
    const b = higher_bound(x);
    const c = lower_bound(y);
    const d = higher_bound(y);

    if (a >= 0 && c >= 0) { // x正y正
        return make_interval(a * c, b * d);
    } else if (b <= 0 && d <= 0) { // x负y负
        return make_interval(b * d, a * c);
    } else if (a >= 0 && d <= 0) { // x正y负
        return make_interval(b * c, a * d);
    } else if (b <= 0 && c >= 0) { // x负y正
        return make_interval(a * d, b * c);
    } else if (a <= 0 && b >= 0 && c >= 0) { // x横跨y正
        return make_interval(a * d, b * d);
    } else if (a <= 0 && b >= 0 && d <= 0) { // x横跨y负
        return make_interval(b * c, a * c);
    } else if (a >= 0 && c <= 0 && d >= 0) { // x正y横跨
        return make_interval(b * c, b * d);
    } else if (b <= 0 && c <= 0 && d >= 0) { // x负y横跨
        return make_interval(a * d, a * c);
    } else { // x横跨y横跨
        return make_interval(math_min(a * d, b * c), math_max(a * c, b * d));
    }
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
