function currency(amount, decimal) {
    if (decimal == null) { decimal = 2 };
    return parseFloat(amount, 10).toFixed(decimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').toString();
}