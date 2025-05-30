export default (revievs) => {
    let res = 0;
    revievs.forEach(el => {
        res += el.rating;
    });
    return res;
}