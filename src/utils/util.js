export const isNumeric = (nmbr) => {
    return !isNaN(nmbr);
}
export const range = (start, end) => {
    let array = [];
    for (let i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}