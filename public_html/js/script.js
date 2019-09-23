/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function analyze(){
    //initilizing an array with the characters to be checked
    var vowels = ["a", "e", "i","o","u"];
    /*loading the content of the textarea and changing the case, as to 
     * migitate case sensitivity
     */
    var values = document.getElementById("layout").value.toLowerCase();
    //removes all 3 types of line breaks and spaces
    values = values.replace(/ /g,"");
    values = values.replace(/(\r\n|\n|\r)/gm,"");
    
    //Declare Variables for use
    var largestFound = 0; //Keeps track of the largest vowel occurrences
    var FoundCount = 0;   //Stores the occurrence count
    var total_found = 0;  //Keep track of total vowel found
    
    //Clear all values if user does not reload browser
    clearValues(vowels);
    
    //Loops through each vowel character in the array
    for (var i in vowels) {
        
        //Call found find Matches that returns the occurrences found
        found = findMatches(vowels[i],values);
        
        /* checks if the value returned is great than the previously found 
         * value and if so, sets it as the new largest value found
         */
        if(found > FoundCount){
            largestFound = vowels[i];
            FoundCount = found;
        }
        //Iterate vowels found
        total_found += found;
        
        //Add occurrences found to the input text box
        document.getElementById(vowels[i]).value = found;
    }
    
    //Calculates and displays the vowel to content entered percentage
    document.getElementById('vowel-percentage').value = percentage(total_found,values.length).toFixed(2)+"%";
    
    //This function calculates and prints the vowel to content for each checked
    percentageEach(vowels,values.length);
    
    /*Checks if the largest found is greater than zero and if so, 
     * set the backgound to yellow. If not alerts the user that no vowel was
     * found.
     */
    if(FoundCount > 0)
        document.getElementById(largestFound).style.backgroundColor = "yellow";
    else
        alert('No Vowels Found!!');
    
    
    document.body.className = 'night';
 
}

function findMatches(needle,hackstack){
    var count = 0;
    
    //Iterates through the hackstack to find the needle
    //Latter in this case is the vowel and the former the content entered
    for(var x=count=0; x<hackstack.length; count+=+(needle===hackstack[x++]));
    
    //Return the number of match found;
    return count;
}

/*This function calculate the percentage of the match found against the total
 * total number of content entered
 */
function percentage(found,total){
    if (total > 0)
        return (found/total)*100;
    else
        return 0;
}

//This function prints the percentage of each vowell found
function percentageEach(needles,total){
    for (var i in needles) {
        var value = document.getElementById(needles[i]).value;
        var percentage_value = percentage(value,total);
        
        document.getElementById('div-' + needles[i]).innerHTML = ''+ percentage_value.toFixed(2) + '%';       
    } 
}

//This function clears all the fields that data was added to via JAVASCRIPT
function clearValues(needles){
    for (var i in needles) {
       document.getElementById(needles[i]).removeAttribute("style"); 
       document.getElementById('div-' + needles[i]).innerHTML = '';
    } 
}

/*This function calculates and displays the number of character a user types
 * if it is at the accepted count, it activates the button. if not the button
 * is disabled.
 */

function word_counter(TextAreaContent){
    
    //removes all 3 types of line breaks and spaces
    var unwanted = TextAreaContent.replace(/ /g,"");
    unwanted = unwanted.replace(/(\r\n|\n|\r)/gm,"");
    
    document.getElementById('word-count').value = unwanted.length;
    
    if(unwanted.length >= 10)
        document.getElementById('analysis').removeAttribute("disabled");
    else
        document.getElementById('analysis').setAttribute("disabled","disabled");
    
}
