import {
    error,
    is_pair,
    head,
    pair,
    list,
    tail,
    math_cos,
    math_sin,
    math_atan2,
    math_sqrt,
    map,
    is_undefined,
    apply_in_underlying_javascript
} from 'sicp'
import {make_table} from "../chapter3/table2.js";

function square(a) {
    return a * a;
}

const TAG_RECTANGULAR = 'rectangular';
const TAG_POLAR = 'polar';

// 0.0 标签系统
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

// 0.1 注册和查询操作
function put(op, type, item) {
    return table('insert')(op, type, item);
}

function get(op, type) {
    return table('lookup')(op, type);
}

// 1,直角坐标表示
function install_rectangular_package() {
    function real_part(z) {
        return head(z);
    }

    function imag_part(z) {
        return tail(z);
    }

    function make_from_real_imag(x, y) {
        return pair(x, y);
    }

    function magnitude(z) {
        return math_sqrt(square(real_part(z)) + square(imag_part(z)));
    }

    function angle(z) {
        return math_atan2(imag_part(z), real_part(z));
    }

    function make_from_mag_ang(r, a) {
        return make_from_real_imag(r * math_cos(a), r * math_sin(a));
    }

    function tag(x) {
        return attach_tag(TAG_RECTANGULAR, x);
    }

    put('real_part', list(TAG_RECTANGULAR), real_part);
    put('imag_part', list(TAG_RECTANGULAR), imag_part);
    put('magnitude', list(TAG_RECTANGULAR), magnitude);
    put('angle', list(TAG_RECTANGULAR), angle);
    put('make_from_real_imag', list(TAG_RECTANGULAR), (x, y) => tag(make_from_real_imag(x, y)));
    put('make_from_mag_ang', list(TAG_RECTANGULAR), (r, a) => tag(make_from_mag_ang(r, a)));
    return 'done';
}


// 2,极坐标表示
function install_polar_package() {
    function real_part(z) {
        return magnitude(z) * math_cos(angle(z));
    }

    function imag_part(z) {
        return magnitude(z) * math_sin(angle(z));
    }

    function magnitude(z) {
        return head(z);
    }

    function angle(z) {
        return tail(z);
    }

    function make_from_real_imag(x, y) {
        return make_from_mag_ang(math_sqrt(square(x) + square(y)), math_atan2(y, x));
    }

    function make_from_mag_ang(r, a) {
        return pair(r, a);
    }

    function tag(x) {
        return attach_tag(TAG_POLAR, x);
    }

    put('real_part', list(TAG_POLAR), real_part);
    put('imag_part', list(TAG_POLAR), imag_part);
    put('magnitude', list(TAG_POLAR), magnitude);
    put('angle', list(TAG_POLAR), angle);
    put('make_from_real_imag', list(TAG_POLAR), (x, y) => tag(make_from_real_imag(x, y)));
    put('make_from_mag_ang', list(TAG_POLAR), (r, a) => tag(make_from_mag_ang(r, a)));
    return 'done';
}

function apply_generic(op, args) {
    const type_tags = map(type_tag, args);
    const fun = get(op, type_tags);
    return !is_undefined(fun)
        ? apply_in_underlying_javascript(fun, map(contents, args))
        : error(list(op, type_tags), "no method for these types -- apply_generic");
}

function real_part(z) {
    return apply_generic('real_part', list(z));
}

function imag_part(z) {
    return apply_generic('imag_part', list(z));
}

function magnitude(z) {
    return apply_generic('magnitude', list(z));
}

function angle(z) {
    return apply_generic('angle', list(z));
}

function make_from_real_imag(x, y) {
    let makeFromRealImag = get("make_from_real_imag", list(TAG_RECTANGULAR));
    return makeFromRealImag(x, y);
}

function make_from_mag_ang(r, a) {
    return get("make_from_mag_ang", list(TAG_POLAR))(r, a);
}

// 3,安装包
const table = make_table();
install_rectangular_package();
install_polar_package();

export {
    real_part,
    imag_part,
    magnitude,
    angle,
    make_from_real_imag,
    make_from_mag_ang,
}
