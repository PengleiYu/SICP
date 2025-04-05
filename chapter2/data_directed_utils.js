import {apply_in_underlying_javascript, error, head, is_pair, is_undefined, list, map, pair, tail, length} from 'sicp'
import {make_table} from "../chapter3/table2.js";

const TYPE_TAG_JAVASCRIPT_NUMBER = 'javascript_number';

function is_javascript_number(contents) {
    return "number" === typeof contents;
}

// 1，标签系统
function attach_tag(type_tag, contents) {
    return TYPE_TAG_JAVASCRIPT_NUMBER === type_tag && is_javascript_number(contents)
        ? contents
        : pair(type_tag, contents);
}

function type_tag(datum) {
    return is_pair(datum)
        ? head(datum)
        : is_javascript_number(datum)
            ? TYPE_TAG_JAVASCRIPT_NUMBER
            : error(datum, "Bad tagged datum -- type-tag");
}

function contents(datum) {
    return is_pair(datum)
        ? tail(datum)
        : is_javascript_number(datum)
            ? datum
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
    if (!is_undefined(fun)) {
        return apply_in_underlying_javascript(fun, map(contents, args));
    }
    // 两个参数情况，尝试做类型转换
    if (length(args) === 2) {
        const type1 = head(type_tags);
        const type2 = head(tail(type_tags));
        const arg1 = head(args);
        const arg2 = head(tail(args));

        const t1_to_t2 = get_coercion(type1, type2);
        console.log('t1_to_t2', t1_to_t2);
        if (!is_undefined(t1_to_t2)) {
            return apply_generic(op, list(t1_to_t2(arg1), arg2));
        }
        const t2_to_t1 = get_coercion(type2, type1);
        console.log('t2_to_t1', t2_to_t1);
        if (!is_undefined(t2_to_t1)) {
            return apply_generic(op, list(arg1, t2_to_t1(arg2)));
        }
    }

    return error(list(op, type_tags), "no method for these types -- apply_generic");
}

// 强制类型转换
const OP_COERCION = "coercion";

function put_coercion(type1, type2, func) {
    put(OP_COERCION, list(type1, type2), func);
}

function get_coercion(type1, type2) {
    return get(OP_COERCION, list(type1, type2));
}

export {
    apply_generic,
    attach_tag,
    contents,
    type_tag,
    get,
    put,
    TYPE_TAG_JAVASCRIPT_NUMBER,
    put_coercion,
    get_coercion,
}
