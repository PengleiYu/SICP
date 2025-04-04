import {apply_in_underlying_javascript, error, head, is_pair, is_undefined, list, map, pair, tail} from 'sicp'
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
    return !is_undefined(fun)
        ? apply_in_underlying_javascript(fun, map(contents, args))
        : error(list(op, type_tags), "no method for these types -- apply_generic");
}

export {
    apply_generic,
    attach_tag,
    contents,
    type_tag,
    get,
    put,
    TYPE_TAG_JAVASCRIPT_NUMBER,
}
