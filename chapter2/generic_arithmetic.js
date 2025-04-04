import {apply_in_underlying_javascript, error, head, is_pair, is_undefined, list, map, pair, tail} from 'sicp'
import {make_table} from "../chapter3/table2.js";
import {add_rat, div_rat, make_rat, mul_rat, sub_rat,} from "./rat.js";
import {angle, imag_part, magnitude, make_from_mag_ang, make_from_real_imag, real_part} from "./real2.js";

// 通用型算术运算
function add(x, y) {
    return apply_generic(OP_ADD, list(x, y));
}

function sub(x, y) {
    return apply_generic(OP_SUB, list(x, y));
}

function mul(x, y) {
    return apply_generic(OP_MUL, list(x, y));
}

function div(x, y) {
    return apply_generic(OP_DIV, list(x, y));
}

// 1，标签系统
function attach_tag(type_tag, contents) {
    return pair(type_tag, contents);
}

function type_tag(datum) {
    return is_pair(datum)
        ? head(datum)
        : error(datum, "Bad tagged datum -- type-tag");
}

function contents(datum) {
    return is_pair(datum)
        ? tail(datum)
        : error(datum, "Bad tagged datum -- contents");
}

// 2，操作类型表
const table = make_table();

function put(op, type, item) {
    return table('insert')(op, type, item);
}

function get(op, type) {
    return table('lookup')(op, type);
}

function apply_generic(op, args) {
    const type_tags = map(type_tag, args);
    const fun = get(op, type_tags);
    return !is_undefined(fun)
        ? apply_in_underlying_javascript(fun, map(contents, args))
        : error(list(op, type_tags), "no method for these types -- apply_generic");
}

const OP_ADD = 'add';
const OP_SUB = 'sub';
const OP_MUL = 'mul';
const OP_DIV = 'div';
const OP_MAKE = "make";

// 3，常规数
const TYPE_TAG_JAVASCRIPT_NUMBER = 'javascript_number';

function install_javascript_number_package() {
    // 系统接口
    function tag(x) {
        return attach_tag(TYPE_TAG_JAVASCRIPT_NUMBER, x);
    }

    put(OP_ADD, list(TYPE_TAG_JAVASCRIPT_NUMBER, TYPE_TAG_JAVASCRIPT_NUMBER), (x, y) => tag(x + y));
    put(OP_SUB, list(TYPE_TAG_JAVASCRIPT_NUMBER, TYPE_TAG_JAVASCRIPT_NUMBER), (x, y) => tag(x - y));
    put(OP_MUL, list(TYPE_TAG_JAVASCRIPT_NUMBER, TYPE_TAG_JAVASCRIPT_NUMBER), (x, y) => tag(x * y));
    put(OP_DIV, list(TYPE_TAG_JAVASCRIPT_NUMBER, TYPE_TAG_JAVASCRIPT_NUMBER), (x, y) => tag(x / y));
    put(OP_MAKE, TYPE_TAG_JAVASCRIPT_NUMBER, (x) => tag(x));
    return 'done';
}

install_javascript_number_package();

function make_javascript_number(x) {
    return get(OP_MAKE, TYPE_TAG_JAVASCRIPT_NUMBER)(x);
}

// 4，有理数
const TYPE_TAG_RATIONAL = "rational";

function install_rational_package() {
    // 内部函数来自导入rat.js
    // 系统接口
    function tag(x) {
        return attach_tag(TYPE_TAG_RATIONAL, x);
    }

    put(OP_ADD, list(TYPE_TAG_RATIONAL, TYPE_TAG_RATIONAL), (x, y) => tag(add_rat(x, y)));
    put(OP_SUB, list(TYPE_TAG_RATIONAL, TYPE_TAG_RATIONAL), (x, y) => tag(sub_rat(x, y)));
    put(OP_MUL, list(TYPE_TAG_RATIONAL, TYPE_TAG_RATIONAL), (x, y) => tag(mul_rat(x, y)));
    put(OP_DIV, list(TYPE_TAG_RATIONAL, TYPE_TAG_RATIONAL), (x, y) => tag(div_rat(x, y)));
    put(OP_MAKE, TYPE_TAG_RATIONAL, (x, y) => tag(make_rat(x, y)));
    return 'done';
}

install_rational_package();

function make_rational(n, d) {
    return get(OP_MAKE, TYPE_TAG_RATIONAL)(n, d);
}

// 5, 复数
const TYPE_TAG_COMPLEX = "complex";

const OP_MAKE_FROM_REAL_IMAG = "make_from_real_imag";

const OP_MAKE_FROM_MAG_ANG = "make_from_mag_ang";

function install_complex_package() {
    // 内部函数
    function add_complex(z1, z2) {
        return make_from_real_imag(
            real_part(z1) + real_part(z2),
            imag_part(z1) + imag_part(z2));
    }

    function sub_complex(z1, z2) {
        return make_from_real_imag(
            real_part(z1) - real_part(z2),
            imag_part(z1) - imag_part(z2));
    }

    function mul_complex(z1, z2) {
        return make_from_mag_ang(
            magnitude(z1) * magnitude(z2),
            angle(z1) + angle(z2));
    }

    function div_complex(z1, z2) {
        return make_from_mag_ang(
            magnitude(z1) / magnitude(z2),
            angle(z1) - angle(z2));
    }

    // 系统接口
    function tag(x) {
        return attach_tag(TYPE_TAG_COMPLEX, x);
    }

    put(OP_ADD, list(TYPE_TAG_COMPLEX, TYPE_TAG_COMPLEX), (z1, z2) => tag(add_complex(z1, z2)));
    put(OP_SUB, list(TYPE_TAG_COMPLEX, TYPE_TAG_COMPLEX), (z1, z2) => tag(sub_complex(z1, z2)));
    put(OP_MUL, list(TYPE_TAG_COMPLEX, TYPE_TAG_COMPLEX), (z1, z2) => tag(mul_complex(z1, z2)));
    put(OP_DIV, list(TYPE_TAG_COMPLEX, TYPE_TAG_COMPLEX), (z1, z2) => tag(div_complex(z1, z2)));
    put(OP_MAKE_FROM_REAL_IMAG, TYPE_TAG_COMPLEX, (x, y) => tag(make_from_real_imag(x, y)));
    put(OP_MAKE_FROM_MAG_ANG, TYPE_TAG_COMPLEX, (r, a) => tag(make_from_mag_ang(r, a)));
    return 'done';
}

install_complex_package();

function make_complex_from_real_imag(x, y) {
    return get(OP_MAKE_FROM_REAL_IMAG, TYPE_TAG_COMPLEX)(x, y);
}

function make_complex_from_mag_ang(r, a) {
    return get(OP_MAKE_FROM_MAG_ANG, TYPE_TAG_COMPLEX)(r, a);
}

export {
    add,
    sub,
    mul,
    div,
    make_javascript_number,
    make_rational,
    make_complex_from_real_imag,
    make_complex_from_mag_ang,
}
