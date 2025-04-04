import {display_list, equal, head, is_null, is_undefined, list, pair, set_tail, tail, error} from "sicp";
import {assoc} from "./table.js";


// 这里的table是二维表
function lookup2(key1, key2, table) {
    const sub_table = assoc(key1, tail(table));
    if (is_undefined(sub_table)) {
        return undefined;
    } else {
        const record = assoc(key2, tail(sub_table));
        return is_undefined(record)
            ? undefined
            : tail(record);
    }
}

function insert2(key1, key2, value, table) {
    const sub_table = assoc(key1, tail(table));
    if (is_undefined(sub_table)) {
        set_tail(table,
            pair(list(key1, pair(key2, value)), tail(table)));
    } else {
        const record = assoc(key2, tail(sub_table));
        if (is_undefined(record)) {
            set_tail(sub_table,
                pair(pair(key2, value), tail(sub_table)));
        } else {
            set_tail(record, value);
        }
    }
    return 'ok';
}

function make_table() {
    const local_table = list("*table*");

    function lookup(key1, key2) {
        return lookup2(key1, key2, local_table)
    }

    function insert(key1, key2, value) {
        return insert2(key1, key2, value, local_table)
    }

    function dispatch(m) {
        return m === 'lookup'
            ? lookup
            : m === 'insert'
                ? insert
                : error(m, 'unknown operation -- table');
    }

    return dispatch;
}

export {
    make_table,
    lookup2,
    insert2,
}
