/**
 * @description The function is used to parse an input into a date in a format for the input field.  * 
 * @param {string | number | date} dateObj date | string | number to parse
 * @returns string
 */
function parseDateToInputField(dateObj){
    let date = new Date(dateObj);
    let dateArray = date.toLocaleDateString().split("/");
    let revArray = dateArray.reverse();
    return revArray.toString().replaceAll(",","-")

}


module.exports = {
    parseDateToInputField
}