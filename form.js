var categories = {
    mName: "M",
    pName: "P",
    sName: "S"
}

var major = {
    a: "not set",
    rel: "not set",
    b: "not set",
    toString : function() {
        return this.a + this.rel + this.b;
    }
}

var minor = {
    a: null,
    rel: null,
    b: null,
    toString : function() {
        return this.a + this.rel + this.b;
    }
}

var isValid = "";

var syllName = "";

var conclusion = {
    a: "not set",
    rel: "not set",
    b: "not set",
    get: function() {
              return this.a + this.rel + this.b;
          },
    set: function(val) {
              this.a = val[0];
              this.rel = val[1];
              this.b = val[2];
          },
    reset: function(){
        this.a = "not set";
        this.rel = "not set";
        this.b = "not set";
    }, 
    toString: function(){
        let w, x, y, z;
        //let b;
        if (this.a == "S"){
            x = categories.sName;
            z = categories.pName;
        }
        else {
            x = categories.pName;
            z = categories.sName;
        }
        if (this.rel == "a"){
            w = "all";
            y = "are";
        }
        else if (this.rel == "e"){
            w = "no";
            y = "is";
        }
        else if (this.rel == "i"){
            w = "some";
            y = "are";
        }
        else if (this.rel == "o"){
            w = "some";
            y = "are not";
        }
       
        str = `${w} ${x} ${y} ${z}`;
        return str;
    }  
  }
   

let emptyColour = "grey";
let inhabitedColour = "red";
let possibleColour = "red";
let normalColour = "white";

 // updates S M P values whenever changed
 function updateCategories() {
    // get user input
    if (document.getElementById("cat1").value.length > 0){
        categories.mName = document.getElementById("cat1").value;

    }
    if (document.getElementById("cat2").value.length > 0 ){
        categories.pName = document.getElementById("cat2").value;
    }
    if (document.getElementById("cat3").value.length > 0 ){
        categories.sName = document.getElementById("cat3").value;
    }
    

    // updates displayed categories
    for(let i = 1; i<=5; i++){
        document.getElementById("opt1." + i).innerHTML = categories.mName;
    }
    for(let i = 1; i<=5; i++){
        document.getElementById("opt2." + i).innerHTML = categories.pName;
    }
    for(let i = 1; i<=5; i++){
        document.getElementById("opt3." + i).innerHTML = categories.sName;
    }
    
    // repositions given different string length
    var mlength = document.getElementById("opt1.5").getComputedTextLength();
    document.getElementById("opt1.5").setAttribute('x', 149 -(mlength*0.5));

    var plength = document.getElementById("opt2.5").getComputedTextLength();
    document.getElementById("opt2.5").setAttribute('x', 197 -(plength*0.5));

    var slength = document.getElementById("opt3.5").getComputedTextLength();
    document.getElementById("opt3.5").setAttribute('x', 100 -(slength*0.5));

    //reposition();
    //majorPremise();
    //minorPremise();
    
}


// functions to autocomplete premises, and stop illegal input
function updateMajor1(){
    if (document.getElementById("p1.2").selectedIndex == 0){
        document.getElementById("p1.4").selectedIndex = 1;
    }
    else {
        document.getElementById("p1.4").selectedIndex = 0;
    }
}

function updateMajor2(){
if (document.getElementById("p1.4").selectedIndex == 0){
    document.getElementById("p1.2").selectedIndex = 1;
}
else {
    document.getElementById("p1.2").selectedIndex = 0;
}
}

function updateMinor1(){
if (document.getElementById("p2.2").selectedIndex == 0){
    document.getElementById("p2.4").selectedIndex = 2;
}
else {
    document.getElementById("p2.4").selectedIndex = 0;
}   
}

function updateMinor2(){
if (document.getElementById("p2.4").selectedIndex == 0){
    document.getElementById("p2.2").selectedIndex = 2;
}
else {
    document.getElementById("p2.2").selectedIndex = 0;
}   
}

// update major and minor variables
function majorPremise(){
    let part1 = document.getElementById("p1.1").value;
    let part2 = document.getElementById("p1.3").value;
    if ((part1 == "All" && part2 == "are") || (part1 == "No" && part2 == "are not")){
        major.rel = "a";
    }
    else if ((part1 == "No" && part2 == "are") || (part1 == "All" && part2 == "are not")){
        major.rel = "e";
    }
    else if (part1 == "Some" && part2 == "are"){
        major.rel = "i";
    }
    else if (part1 == "Some" && part2 == "are not"){
        major.rel = "o";
    }

    if (document.getElementById("p1.2").value == categories.mName){
        major.a = "M"
        major.b = "P"
    }
    else {
        major.a = "P"
        major.b = "M"
    }
}

function minorPremise(){
    let part1 = document.getElementById("p2.1").value;
    let part2 = document.getElementById("p2.3").value;
    if ((part1 == "All" && part2 == "are") || (part1 == "No" && part2 == "are not")){
        minor.rel = "a";
    }
    else if ((part1 == "No" && part2 == "are") || (part1 == "All" && part2 == "are not")){
        minor.rel = "e";
    }
    else if (part1 == "Some" && part2 == "are"){
        minor.rel = "i";
    }
    else if (part1 == "Some" && part2 == "are not"){
        minor.rel = "o";
    }

    if (document.getElementById("p2.2").value == categories.mName){
        minor.a = "M"
        minor.b = "S"
    }
    else if (document.getElementById("p2.2").value == categories.sName){
        minor.a = "S"
        minor.b = "M"
    }
}

// takes too long to update diaram
function resetVenn(){
    
    document.getElementById("M").style.fill = normalColour;
    document.getElementById("P").style.fill = normalColour;
    document.getElementById("S").style.fill = normalColour;
    document.getElementById("SP").style.fill = normalColour;
    document.getElementById("SM").style.fill = normalColour;
    document.getElementById("MP").style.fill = normalColour;
    document.getElementById("SMP").style.fill = normalColour;
    
    document.getElementById("P").style.strokeOpacity = "1";
    document.getElementById("S").style.strokeOpacity = "1";
    document.getElementById("P").style.fillOpacity = "1";
    document.getElementById("S").style.fillOpacity = "1";
}

// does everything in one go, need to split
function updateVenn(){
    // need to reset colours on each submission
    resetVenn();
    majorPremise();
    minorPremise();
    //alert(major.a + major.rel + major.b);
    if (major.rel == "i"){
        document.getElementById("MP").style.fill = possibleColour;
        document.getElementById("SMP").style.fill = possibleColour; 
    }

    if (minor.rel == "i"){
        document.getElementById("SM").style.fill = possibleColour;
        document.getElementById("SMP").style.fill = possibleColour; 
    }

    if (major.rel == "o"){
        document.getElementById(major.a).style.fill = possibleColour;
        document.getElementById("S" + major.a).style.fill = possibleColour;
    }

    if (minor.rel == "o"){
        document.getElementById(minor.a).style.fill = possibleColour;
        document.getElementById(minor.a + "P").style.fill = possibleColour;
    }
    

    if (major.rel == "a"){
        document.getElementById(major.a).style.fill = emptyColour;
        document.getElementById("S" + major.a).style.fill = emptyColour;
    }
    
    if (major.rel == "e"){
        document.getElementById("SMP").style.fill = emptyColour;
        document.getElementById("MP").style.fill = emptyColour;
    }

    if (minor.rel == "a"){
        document.getElementById(minor.a).style.fill = emptyColour;
        document.getElementById(minor.a + "P").style.fill = emptyColour;
    }
  
    if (minor.rel == "e"){
        document.getElementById("SMP").style.fill = emptyColour;
        document.getElementById("SM").style.fill = emptyColour;
    }

  


}

// updates text for scrolly boxes
function updateText(){
   //conclusion = "";
   conclusion.reset();
   document.getElementById("text1").innerText = majorToString() + "\n explain the venn a little";
   document.getElementById("text3").innerText = minorToString() + "\n explain the venn a little";
   
   document.getElementById("text5").innerText = "this syllogisms is called " + syllogToString();
   document.getElementById("text4").innerText = "can conclude that " + conclusion.toString();
}

// tostring functions, these can be cut down later
function majorToString(){
    let part1 = document.getElementById("p1.1").value;
    let part3 = document.getElementById("p1.3").value;
    if (major.a == "M"){
        return `${part1} ${categories.mName} ${part3} ${categories.pName}`;    
    }
    else {
        return  `${part1} ${categories.pName} ${part3} ${categories.mName}`;
    }

}


function minorToString(){
    let part1 = document.getElementById("p2.1").value;
    let part3 = document.getElementById("p2.3").value;
    if (minor.a == "S"){
        return `${part1} ${categories.sName} ${part3} ${categories.mName}`;    
    }
    else {
        return  `${part1} ${categories.mName} ${part3} ${categories.sName}`;
    }

}


function syllogToString(){
    if (major.toString() == "MaP"){
        if (minor.toString() == "SaM") {
            conclusion.set("SaP");
            syllName = "Barbara";
        }

        else if (minor.toString() == "MiS") {
            conclusion.set("SiP");
            syllName = "Datisi";
        }

        else if (minor.toString() == "SiM"){
            conclusion.set("SiM");
            syllName = "Darii";
        }

        else {
            conclusion.set("xxx");
            syllName = "nothing for now";
        }
    }
    else if (major.toString() == "MeP") {
        if (minor.toString() == "SaM"){
            conclusion.set("SeP");
            syllName = "Celarent";
        }
        else if (minor.toString() == "MiS"){
            conclusion.set("SoP");
            syllName = "Ferison";
        }
        else if (minor.toString() == "SiM"){
            conclusion.set("SoP");
            syllName =  "Ferio";
        }
        else {
            conclusion.set("xxx");
            syllName = "nothing for now";
        }
    }

    else if (major.toString() == "PeM") {
        if (minor.toString() == "SaM"){
            conclusion.set("SeP");
            syllName = "Cesare";
        }
        else if (minor.toString() == "SiM"){
            conclusion.set("SoP");
            syllName =  "Festino";
        }
        else if (minor.toString() == "MiS"){
            conclusion.set("SoP");
            syllName =  "Fresison";
        }
        else {
            conclusion.set("xxx");
            syllName =  "nothing for now";
        }
    }

    else if (major.toString() == "PaM") {
        if (minor.toString() == "SeM"){
            conclusion.set = "SeP";
            syllName =  "Camestres";
        }
        else if (minor.toString() == "MeS"){
            conclusion.set("SeP");
            syllName = "calemes";
        }
        else if (minor.toString() == "SoM"){
            conclusion.set("SoP");
            syllName =  "Baroco";
        }
        else {
            conclusion.set("xxx");
            syllName =  "nothing for now";
        }
    }

    else if (major.toString() == "MoP" && minor.toString() == "MaS") {
            conclusion.set("SoP");
            syllName =  "Bocardo";
        }
        
    else if (major.toString() == "MiP" && minor.toString() == "MaS"){
            conclusion.set("SiP");
            syllName =  "Disamis";
    }

    else if (major.toString() == "PiM" && minor.toString() == "MaS"){
            conclusion.set("SiP");
            syllName = "Dimatis";
    }

    else {
        conclusion.set("xxx");
        syllName = "not set... need to sort this";
    }

    console.log("conclusion is " + conclusion.get());
    console.log(conclusion.toString());
    return syllName;
  
}




//does first update
function updateVenn0(){
    resetVenn();
    majorPremise();
    minorPremise();
    updateText();
    document.getElementById("S").style.fillOpacity = "0";
    document.getElementById("S").style.strokeOpacity = "0.9";
    
}

function updateVenn1(){
    updateVenn0();
    majorPremise(); // this can get deleted later
    if (major.rel == "i"){
        document.getElementById("MP").style.fill = possibleColour;
        document.getElementById("SMP").style.fill = possibleColour; 
    }
    else if (major.rel == "o"){
        document.getElementById(major.a).style.fill = possibleColour;
        document.getElementById("S" + major.a).style.fill = possibleColour;
    }
    else if (major.rel == "a"){
        document.getElementById(major.a).style.fill = emptyColour;
        document.getElementById("S" + major.a).style.fill = emptyColour;
       
    }
    
    else if (major.rel == "e"){
        document.getElementById("SMP").style.fill = emptyColour;
        document.getElementById("MP").style.fill = emptyColour;
      
    }
    
}

function updateVenn2(){
    updateVenn1();
    document.getElementById("P").style.fillOpacity = "0.5";
    document.getElementById("P").style.strokeOpacity = "0.9";
    document.getElementById("S").style.fillOpacity = "1";
    document.getElementById("S").style.strokeOpacity = "1";
}

function updateVenn3(){
    minorPremise(); // delete later

    if (major.rel == "i"){
        document.getElementById("MP").style.fill = possibleColour;
        document.getElementById("SMP").style.fill = possibleColour; 
    }

    if (minor.rel == "i"){
        document.getElementById("SM").style.fill = possibleColour;
        document.getElementById("SMP").style.fill = possibleColour; 
    }

    if (major.rel == "o"){
        document.getElementById(major.a).style.fill = possibleColour;
        document.getElementById("S" + major.a).style.fill = possibleColour;
    }

    if (minor.rel == "o"){
        document.getElementById(minor.a).style.fill = possibleColour;
        document.getElementById(minor.a + "P").style.fill = possibleColour;
    }
    

    if (major.rel == "a"){
        document.getElementById(major.a).style.fill = emptyColour;
        document.getElementById("S" + major.a).style.fill = emptyColour;
    }
    
    if (major.rel == "e"){
        document.getElementById("SMP").style.fill = emptyColour;
        document.getElementById("MP").style.fill = emptyColour;
    }

    if (minor.rel == "a"){
        document.getElementById(minor.a).style.fill = emptyColour;
        document.getElementById(minor.a + "P").style.fill = emptyColour;
    }
  
    if (minor.rel == "e"){
        document.getElementById("SMP").style.fill = emptyColour;
        document.getElementById("SM").style.fill = emptyColour;
    }

}

function updateVenn4(){
    document.getElementById("P").style.fillOpacity = "1";
    document.getElementById("P").style.strokeOpacity = "1";
}


// repositions labels on venn diagram, using container width and string length
function reposition() {
    
    var mlength = document.getElementById("opt1.5").getComputedTextLength();
    document.getElementById("opt1.5").setAttribute('x', 149 -(mlength*0.5));

    var plength = document.getElementById("opt2.5").getComputedTextLength();
    document.getElementById("opt2.5").setAttribute('x', 197 -(plength*0.5));

    var slength = document.getElementById("opt3.5").getComputedTextLength();
    document.getElementById("opt3.5").setAttribute('x', 100 -(slength*0.5));
 
}


document.addEventListener('DOMContentLoaded', ()=>{
    


    let element;
    for(let i = 1; i <= 3; i++){
        element = document.getElementById("cat"+i);
        element.addEventListener('change', updateCategories);
        
        } 
    
});  


