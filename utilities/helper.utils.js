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

/**
 * @description This function is used to defined a date range from two date strings passed as arguements. If none are provided it will default to todays date as the start and tomorrows date as the end. 
 * 
 * @param {Date | Date-String | undefined} startDate This is the starting of the range. 
 * @param {Date | Date-String | undefined} endDate This is the end of the range.
 * @returns An object with the formatted Date. 
 */
function getDateRange(startDate, endDate){
    let startRange = parseDateToInputField(new Date());
    let tomo = new Date().setDate(new Date().getDate() + 1)
    let endRange = parseDateToInputField(new Date(tomo));
    if(startDate){
        startRange = parseDateToInputField(new Date(startDate));
    }
    if(endDate){
        endRange = parseDateToInputField(new Date(endDate));
    }
    console.log("in getDateRange startRange: ", startRange);
    console.log("in getDateRange endRange: ", endRange);

    return {startRange, endRange}

}


module.exports = {
    parseDateToInputField,
    getDateRange
}