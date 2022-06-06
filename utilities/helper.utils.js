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
   
    return {startRange, endRange}

}

/**
 * @description Finds the starting of the week if the date isnt the starting then it will go back until the last Sunday.  
 * @param {Date | Date-String} startDate Day of the week
 * @returns {Object<{startDate, endDate}>} Object which contains the end date as well as the start date
 */
 function findStartWeek(startDate){
    startDate = new Date(startDate);
    while(true){

        if(startDate.getDay() == 0){
            let endDate = new Date(startDate);
            endDate = new Date(endDate.setDate(endDate.getDate() + 7));
            return {startDate, endDate};
        }
        startDate = new Date(startDate.setDate(startDate.getDate() - 1));
    }

}


module.exports = {
    parseDateToInputField,
    getDateRange,
    findStartWeek,
}