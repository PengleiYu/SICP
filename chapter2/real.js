import {display, head, pair, stringify, tail, math_cos, math_sin, math_atan2, math_sqrt,} from 'sicp'

function square(a) {
    return a * a;
}

// 复数的底层表示
// 直角坐标系
function real_part(z) {
    return head(z);
}

function imag_part(z) {
    return tail(z);
}

function magnitude(z) {
    return math_sqrt(square(real_part(z)) + square(imag_part(z)));
}

function angle(z) {
    return math_atan2(imag_part(z), real_part(z));
}

function make_from_real_imag(x, y) {
    return pair(x, y);
}

function make_from_mag_ang(r, a) {
    return make_from_real_imag(r * math_cos(a), r * math_sin(a));
}

// 极坐标系
// function real_part(z) {
//     return magnitude(z) * math_cos(angle(z));
// }
//
// function imag_part(z) {
//     return magnitude(z) * math_sin(angle(z));
// }
//
// function magnitude(z) {
//     return head(z);
// }
//
// function angle(z) {
//     return tail(z);
// }
//
// function make_from_real_imag(x, y) {
//     return make_from_mag_ang(math_sqrt(square(x) + square(y)), math_atan2(y, x));
// }
//
// function make_from_mag_ang(r, a) {
//     return pair(r, a);
// }


// 四则运算
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
