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

function square(a) {
    return a * a;
}

const OP_REAL_PART = 'real_part';
const OP_IMAG_PART = 'imag_part';
const OP_MAGNITUDE = 'magnitude';
const OP_ANGLE = 'angle';

function real_part(z) {
    return apply_generic(OP_REAL_PART, list(z));
}

function imag_part(z) {
    return apply_generic(OP_IMAG_PART, list(z));
}

function magnitude(z) {
    return apply_generic(OP_MAGNITUDE, list(z));
}

function angle(z) {
    return apply_generic(OP_ANGLE, list(z));
}

function apply_generic(op, args) {
    return head(args)(op);
}

function make_from_real_imag(x, y) {
    function dispatch(op) {
        return op === OP_REAL_PART
            ? x
            : op === OP_IMAG_PART
                ? y
                : op === OP_MAGNITUDE
                    ? math_sqrt(square(x) + square(y))
                    : op === OP_ANGLE
                        ? math_atan2(y, x)
                        : error(op, 'Unknown op -- MAKE_FROM_REAL_IMAG');
    }
    return dispatch;
}

function make_from_mag_ang(r, a) {
    function dispatch(op) {
        return op === OP_REAL_PART
            ? r * math_cos(a)
            : op === OP_IMAG_PART
                ? r * math_sin(a)
                : op === OP_MAGNITUDE
                    ? r
                    : op === OP_ANGLE
                        ? a
                        : error(op, 'Unknown op -- MAKE_FROM_MAG_ANG');
    }
    return dispatch;
}

export {
    real_part,
    imag_part,
    magnitude,
    angle,
    make_from_real_imag,
    make_from_mag_ang,
}
