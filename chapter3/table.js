import {equal, head, is_null, is_undefined, list, pair, set_tail, tail, error} from "sicp";
// 一维表是个list，表头是字符串，其他元素都是pair
// 二维表也是个list，表头是字符串，其他元素也是list,每个子list的表头是字符串，子list的其他元素是pair

// 新表只有个表头
function make_table() {
    return list("*table*");
}

// 仅接受表体
function assoc(key, contents) {
    return is_null(contents)
        ? undefined
        : equal(key, head(head(contents)))
            ? head(contents)
            : assoc(key, tail(contents));
}

// 去除表头，从表体中查找entry
function lookup(key, table) {
    const record = assoc(key, tail(table));
    return is_undefined(record)
        ? undefined
        : tail(record);
}

function insert(key, value, table) {
    const record = assoc(key, tail(table));
    if (is_undefined(record)) {
        set_tail(
            table,
            pair(pair(key, value), tail(table)));
    } else {
        set_tail(record, value);
    }
    return 'ok';
}

export {
    lookup,
    insert,
    assoc,
    make_table,
}
