import {error, is_pair, display, head, pair, stringify, tail, math_cos, math_sin, math_atan2, math_sqrt,} from 'sicp'

function square(a) {
    return a * a;
}

// 基于类型的分派，这是在系统设计中获得模块性的一种功能强大的策略；
// 但存在两个缺陷，根本原因是这项技术不具有可加性
// 1,通用接口层需要知道所有不同的表示
// 2,虽然不同的表示可以单独设计，但不能重名


// 实数系统分为三部分，直角坐标表示、极坐标表示、复数运算
const TAG_RECTANGULAR = 'rectangular';
const TAG_POLAR = 'polar';

// 0.1标签数据系统
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

function is_rectangular(z) {
    return type_tag(z) === TAG_RECTANGULAR;
}

function is_polar(z) {
    return type_tag(z) === TAG_POLAR;
}


// 0.2,通用接口层
function real_part(z) {
    return is_rectangular(z)
        ? real_part_rectangular(contents(z))
        : is_polar(z)
            ? real_part_polar(contents(z))
            : error(z, "Unknown type -- real_part");
}

function imag_part(z) {
    return is_rectangular(z)
        ? imag_part_rectangular(contents(z))
        : is_polar(z)
            ? imag_part_polar(contents(z))
            : error(z, "Unknown type -- imag_part");
}

function magnitude(z) {
    return is_rectangular(z)
        ? magnitude_rectangular(contents(z))
        : is_polar(z)
            ? magnitude_polar(contents(z))
            : error(z, "Unknown type -- magnitude");
}

function angle(z) {
    return is_rectangular(z)
        ? angle_rectangular(contents(z))
        : is_polar(z)
            ? angle_polar(contents(z))
            : error(z, "Unknown type -- angle");
}

function make_from_real_imag(x, y) {
    return make_from_real_imag_rectangular(x, y);
}

function make_from_mag_ang(r, a) {
    return make_from_mag_ang_polar(r, a);
}

// 1,直角坐标表示
function real_part_rectangular(z) {
    return head(z);
}

function imag_part_rectangular(z) {
    return tail(z);
}

function magnitude_rectangular(z) {
    return math_sqrt(square(real_part_rectangular(z)) + square(imag_part_rectangular(z)));
}

function angle_rectangular(z) {
    return math_atan2(imag_part_rectangular(z), real_part_rectangular(z));
}

function make_from_real_imag_rectangular(x, y) {
    return attach_tag(TAG_RECTANGULAR, pair(x, y));
}

function make_from_mag_ang_rectangular(r, a) {
    return make_from_real_imag_rectangular(r * math_cos(a), r * math_sin(a));
}

// 2,极坐标表示
function real_part_polar(z) {
    return magnitude_polar(z) * math_cos(angle_polar(z));
}

function imag_part_polar(z) {
    return magnitude_polar(z) * math_sin(angle_polar(z));
}

function magnitude_polar(z) {
    return head(z);
}

function angle_polar(z) {
    return tail(z);
}

function make_from_real_imag_polar(x, y) {
    return make_from_mag_ang_polar(math_sqrt(square(x) + square(y)), math_atan2(y, x));
}

function make_from_mag_ang_polar(r, a) {
    return attach_tag(TAG_POLAR, pair(r, a));
}

// 3,复数运算
function add_complex(z1, z2) {
    return make_from_real_imag(
        real_part(z1) + real_part(z2),
        imag_part(z1) + imag_part(z2)
    );
}

function sub_complex(z1, z2) {
    return make_from_real_imag(
        real_part(z1) - real_part(z2),
        imag_part(z1) - imag_part(z2)
    );
}

function mul_complex(z1, z2) {
    return make_from_mag_ang(
        magnitude(z1) * magnitude(z2),
        angle(z1) + angle(z2)
    );
}

function div_complex(z1, z2) {
    return make_from_mag_ang(
        magnitude(z1) / magnitude(z2),
        angle(z1) - angle(z2)
    );
}

export {
    real_part,
    imag_part,
    magnitude,
    angle,
    make_from_mag_ang,
    make_from_real_imag,
}
