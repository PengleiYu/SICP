import {display_list, error, head, is_number, is_pair, is_string, list, tail, equal, is_null, pair} from "sicp";

// 集合作为排序的表
function is_element_of_set(x, set) {
    return is_null(set)
        ? false
        : x === head(set)
            ? true
            : x < head(set)
                ? false
                : is_element_of_set(x, tail(set));
}

function intersection_set(set1, set2) {
    return is_null(set1) || is_null(set2)
        ? null
        : head(set1) === head(set2)
            ? pair(head(set1), intersection_set(tail(set1), tail(set2)))
            : head(set1) < head(set2)
                ? intersection_set(tail(set1), set2)
                : intersection_set(set1, tail(set2));
}

export {
    is_element_of_set,
    intersection_set,
}
