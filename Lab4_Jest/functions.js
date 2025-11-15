function first(array, n) {
    if (array == null || n<=0)
    return [];
    if (n == null)
    return array[0];
    return array.slice(0, n);
}

function last(array, n) {
    if (array == null)
    return [];
    if (n == null)
    return array[array.length - 1];
    return array.slice(Math.max(array.length - n, 0));
}

function concat(){
    myColor = ["Red", "Green", "White", "Black"];
    console.log(myColor.toString()); console.log(myColor.join());
    console.log(myColor.join(''));
}

function chunk(array, size){
    var chunkedArr = [];
    var index = 0;
    while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index));
    index += size;
    }
    return chunkedArr;
}

module.exports = {first, last, concat, chunk};