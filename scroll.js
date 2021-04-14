
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");
var categories = {
    mName: "M",
    pName: "P",
    sName: "S"
}
var major = {
    
    a: "not set",
    rel: "not set",
    b: "not set",
    shading: "not set",
    shadingColour: "not set",
    explaination: "NEED AN EXPLAINATION",
    aName: "not set",
    bName: "not set",
    get: function () {
        return this.a + this.rel + this.b;
    },
    toString: function () {
        let part1 = document.getElementById("p1.1").value;
        let part3 = document.getElementById("p1.3").value;
        return `${part1} ${this.aName} ${part3} ${this.bName}`;

    },
    set: function () {
        let part1 = document.getElementById("p1.1").value;
        let part2 = document.getElementById("p1.3").value;

        if (document.getElementById("p1.2").value == categories.mName) {
            this.a = "M"
            this.aName = categories.mName;
            this.b = "P"
            this.bName = categories.pName;
        }
        else {
            this.a = "P"
            this.aName = categories.pName;
            this.b = "M"
            this.bName = categories.mName;
        }

        if ((part1 == "All" && part2 == "are") || (part1 == "No" && part2 == "are not")) {
            this.rel = "a";
            this.shading = "uninhabited";
            this.explaination = `nothing can be ${this.aName} but not ${this.bName}`;
        }
        else if ((part1 == "No" && part2 == "are") || (part1 == "All" && part2 == "are not")) {
            this.rel = "e";
            this.shading = "uninhabited";
            this.explaination = `nothing can be both ${this.aName} and ${this.bName}`;
        }
        else if (part1 == "Some" && part2 == "are") {
            this.rel = "i";
            this.shading = "inhabited";
            this.explaination = `something is both ${this.aName} and ${this.bName}`;
        }
        else if (part1 == "Some" && part2 == "are not") {
            this.rel = "o";
            this.shading = "inhabited";
            this.explaination = `something is ${this.aName} but not ${this.bName}`;
        }

        if (this.shading == "uninhabited") {
            this.shadingColour = "grey";
        }
        else {
            this.shadingColour = inhabitedColour;
        }


        console.log("major has been set to " + this.a + this.rel + this.b);
        // console.log(this.shading);
        // console.log("names are " + this.aName + this.bName);  
    }
}

var minor = {
    a: "not set",
    rel: "not set",
    b: "not set",
    shading: "not set",
    shadingColour: "not set",
    explaination: "NEED AN EXPLAINATION",
    aName: "not set",
    bName: "not set",
    get: function () {
        return this.a + this.rel + this.b;
    },
    toString: function () {
        let part1 = document.getElementById("p2.1").value;
        let part3 = document.getElementById("p2.3").value;
        if (this.a == "S") {
            return `${part1} ${categories.sName} ${part3} ${categories.mName}`;
        }
        else {
            return `${part1} ${categories.mName} ${part3} ${categories.sName}`;
        }
    },
    set: function () {
        let part1 = document.getElementById("p2.1").value;
        let part2 = document.getElementById("p2.3").value;


        if (document.getElementById("p2.2").value == categories.mName) {
            this.a = "M"
            this.aName = categories.mName;
            this.b = "S"
            this.bName = categories.sName;
        }
        else if (document.getElementById("p2.2").value == categories.sName) {
            this.a = "S"
            this.aName = categories.sName;
            this.b = "M"
            this.bName = categories.mName;
        }

        if ((part1 == "All" && part2 == "are") || (part1 == "No" && part2 == "are not")) {
            this.rel = "a";
            this.shading = "uninhabited";
            this.explaination = `nothing can be ${this.aName} but not ${this.bName}`;
        }
        else if ((part1 == "No" && part2 == "are") || (part1 == "All" && part2 == "are not")) {
            this.rel = "e";
            this.shading = "uninhabited";
            this.explaination = `nothing can be both ${this.aName} and ${this.bName}`;
        }
        else if (part1 == "Some" && part2 == "are") {
            this.rel = "i";
            this.shading = "inhabited";
            this.explaination = `something is both ${this.aName} and ${this.bName}`;
        }
        else if (part1 == "Some" && part2 == "are not") {
            this.rel = "o";
            this.shading = "inhabited";
            this.explaination = `something is ${this.aName} but not ${this.bName}`;
        }
        if (this.shading == "uninhabited") {
            this.shadingColour = "grey";
        }
        else {
            this.shadingColour = inhabitedColour;
        }


        console.log("minor has been set to " + this.a + this.rel + this.b);
    }
}
var isValid = "";

var syllName = "";
var existential = {
    bool: "not set",
    on: "not set",
    conclusion: "not set",
    name: "not set",
    get: function () {
        let str = "nothing existential here";
        if (this.bool == "true") {
            str = `Existential on ${this.on} gives ${this.name}, with conclusion ${this.conclusion}`;
        }
        return str;
    },
    set: function (on, conc, name) {
        this.on = on;
        this.conclusion = conc;
        this.name = name;
        this.bool = "true";
    },
    reset: function () {
        this.bool = "not set";
        this.on = "not set";
        this.conclusion = "not set";
        this.name = "not set";
        this.on = "not set";
    },
    getCat: function () {
        if (this.on == "S") {
            return categories.sName;
        }
        else if (this.on == "M") {
            return categories.mName;
        }
        else {
            return categories.pName;
        }
    }
}

var conclusion = {
    a: "not set",
    rel: "not set",
    b: "not set",
    get: function () {
        return this.a + this.rel + this.b;
    },
    set: function (val) {
        this.a = val[0];
        this.rel = val[1];
        this.b = val[2];
    },
    reset: function () {
        this.a = "not set";
        this.rel = "not set";
        this.b = "not set";
        //existential = "";
        syllName = "";
        isValid = "";
    },
    toString: function () {
        let w, x, y, z;
        //let b;
        if (this.a == "S") {
            x = categories.sName;
            z = categories.pName;
        }
        else {
            x = categories.pName;
            z = categories.sName;
        }
        if (this.rel == "a") {
            w = "all";
            y = "are";
        }
        else if (this.rel == "e") {
            w = "no";
            y = "are";
        }
        else if (this.rel == "i") {
            w = "some";
            y = "are";
        }
        else if (this.rel == "o") {
            w = "some";
            y = "are not";
        }
        else {
            return "INVALID";
        }

        str = `${w} ${x} ${y} ${z}`;
        return str;
    }
}
let emptyColour = "grey";
let inhabitedColour = "green";
let normalColour = "white";
let backgroundColour = "#f3f3f3";
var undoMe = "";

// initialize the scrollama
var scroller = scrollama();


// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.3);

    // this is a made up formula for text size. seems to work??
    var textSize = 0.8 * (window.innerWidth * 0.001 + stepH * 0.003);

    step.style("height", stepH + "px");
    step.style("font-size", textSize + "rem");
    var figureHeight = window.innerHeight * 0.9;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");



    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response);
    // response = { element, direction, index }

    // add color to current step only
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });

    // step by step on the scrolly
    if (response.index == 0) {
        if (response.direction == "down") {
            console.log("0, going down");
            mybutton.style.display = "block";
            major.set();
            minor.set();
            conclusion.reset();
            existential.reset();
            undoMe = "";
            findConclusion();
            updateText();
            showLines("MP");
        }
        else {
            console.log("0, going up");
            mybutton.style.display = "none";
            resetVenn();

        }


    }

    else if (response.index == 1) {
        if (response.direction == "down") {
            console.log("1, going down");
            majorUpdateVenn();
        }
        else {
            console.log("1, going up");
            hideLines("MS");
            showLines("MP");
        }
    }

    else if (response.index == 2) {
        if (response.direction == "down") {
            console.log("2, going down");
            hideLines("MP");
            showLines("MS");
        }
        else {
            console.log("2, going up");
            resetVenn();
            majorUpdateVenn();

        }
    }

    else if (response.index == 3) {
        if (response.direction == "down") {
            console.log("3, going down");
            updateVenn();
        }
        else {
            console.log("3, going up");
        }
    }

    else if (response.index == 4) {
        if (response.direction == "down") {
            hideLines("MS");
            showLines("SP");
            console.log("4, going down");
        }
        else {
            document.getElementById("answer").style.color = backgroundColour;
            document.getElementById("answer2").style.color = backgroundColour;
            console.log("4, going up");
        }
    }

    else if (response.index == 9) {
        if (response.direction == "down") {

            console.log("9, going down");
        }
        else {
            console.log("9, going up");
            if (undoMe != "") {
                document.getElementById(undoMe).style.fill = normalColour;
            }
        }
    }

    else if (response.index == 10) {
        if (response.direction == "down") {
            if (existential.on == "not set") {
                console.log("existential not set");
            }
            else {
                existentialUpdate(existential.on);
            }
            console.log("10, going down");
            console.log(existential.on);
        }
        else {
            console.log("10, going up");
        }
    }

    else if (response.index == 11) {
        if (response.direction == "down") {
            console.log("11, going down");
        }
        else {
            console.log("11, going up");
        }

    }
}

function setupStickyfill() {
    d3.selectAll(".sticky").each(function () {
        Stickyfill.add(this);
    });
}

function init() {
    setupStickyfill();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.5,
            debug: false
        })
        .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener("resize", handleResize);
}

// kick things off
init();



// updates S M P values whenever changed
function updateCategories() {
    // get user input
    if (document.getElementById("cat1").value.length > 0) {
        categories.mName = document.getElementById("cat1").value;

    }
    if (document.getElementById("cat2").value.length > 0) {
        categories.pName = document.getElementById("cat2").value;
    }
    if (document.getElementById("cat3").value.length > 0) {
        categories.sName = document.getElementById("cat3").value;
    }


    // updates displayed categories
    for (let i = 1; i <= 5; i++) {
        document.getElementById("opt1." + i).innerHTML = categories.mName;
    }
    for (let i = 1; i <= 5; i++) {
        document.getElementById("opt2." + i).innerHTML = categories.pName;
    }
    for (let i = 1; i <= 5; i++) {
        document.getElementById("opt3." + i).innerHTML = categories.sName;
    }

    // repositions given different string length
    var mlength = document.getElementById("opt1.5").getComputedTextLength();
    document.getElementById("opt1.5").setAttribute('x', 149 - (mlength * 0.5));

    var plength = document.getElementById("opt2.5").getComputedTextLength();
    document.getElementById("opt2.5").setAttribute('x', 197 - (plength * 0.5));

    var slength = document.getElementById("opt3.5").getComputedTextLength();
    document.getElementById("opt3.5").setAttribute('x', 100 - (slength * 0.5));

    // updates the first text
    document.getElementById("text0").innerText = `Let's start with the major premise, which tells us about the relationship between ${categories.mName} and ${categories.pName}`;

}
// functions to autocomplete premises, and stop illegal input
function updateMajor1() {
    if (document.getElementById("p1.2").selectedIndex == 0) {
        document.getElementById("p1.4").selectedIndex = 1;
    }
    else {
        document.getElementById("p1.4").selectedIndex = 0;
    }
}
function updateMajor2() {
    if (document.getElementById("p1.4").selectedIndex == 0) {
        document.getElementById("p1.2").selectedIndex = 1;
    }
    else {
        document.getElementById("p1.2").selectedIndex = 0;
    }
}
function updateMinor1() {
    if (document.getElementById("p2.2").selectedIndex == 0) {
        document.getElementById("p2.4").selectedIndex = 2;
    }
    else {
        document.getElementById("p2.4").selectedIndex = 0;
    }
}
function updateMinor2() {
    if (document.getElementById("p2.4").selectedIndex == 0) {
        document.getElementById("p2.2").selectedIndex = 2;
    }
    else {
        document.getElementById("p2.2").selectedIndex = 0;
    }
}

function randomise() {
    document.getElementById("p1.1").selectedIndex = Math.floor(Math.random() * 3);
    document.getElementById("p1.2").selectedIndex = Math.floor(Math.random() * 2);
    document.getElementById("p1.3").selectedIndex = Math.floor(Math.random() * 2);
    document.getElementById("p2.1").selectedIndex = Math.floor(Math.random() * 3);
    i = Math.floor(Math.random() * 2);
    if (i == 0) {
        document.getElementById("p2.2").selectedIndex = i;
    }
    else {
        document.getElementById("p2.2").selectedIndex = 2;
    }

    document.getElementById("p2.3").selectedIndex = Math.floor(Math.random() * 2);
    updateMajor1();
    updateMinor1();


}

// takes too long to update diaram
function resetVenn() {
    document.getElementById("M").style.fill = 
    document.getElementById("P").style.fill = 
    document.getElementById("S").style.fill = 
    document.getElementById("SP").style.fill = 
    document.getElementById("SM").style.fill = 
    document.getElementById("MP").style.fill = 
    document.getElementById("SMP").style.fill = normalColour;
    
}

function showLines(x) {
   // document.getElementById("layer1").style.strokeOpacity = 1;
    document.getElementById("layer" + x[0]).style.display = "inline";
    document.getElementById("layer" + x[1]).style.display = "inline";
}

function hideLines(x) {
    //document.getElementById("layer1").style.strokeOpacity = 1;
    document.getElementById("layer" + x[0]).style.display = "none";
    document.getElementById("layer" + x[1]).style.display = "none";
}


// updates the diagram in full
function updateVenn() {
    
    if (major.rel == "i") {
        document.getElementById("MP").style.fill = inhabitedColour;
        document.getElementById("SMP").style.fill = inhabitedColour;
    }

    if (minor.rel == "i") {
        document.getElementById("SM").style.fill = inhabitedColour;
        document.getElementById("SMP").style.fill = inhabitedColour;
    }

    if (major.rel == "o") {
        document.getElementById(major.a).style.fill = inhabitedColour;
        document.getElementById("S" + major.a).style.fill = inhabitedColour;
    }

    if (minor.rel == "o") {
        document.getElementById(minor.a).style.fill = inhabitedColour;
        document.getElementById(minor.a + "P").style.fill = inhabitedColour;
    }


    if (major.rel == "a") {
        document.getElementById(major.a).style.fill = emptyColour;
        document.getElementById("S" + major.a).style.fill = emptyColour;
    }

    if (major.rel == "e") {
        document.getElementById("SMP").style.fill = emptyColour;
        document.getElementById("MP").style.fill = emptyColour;
    }

    if (minor.rel == "a") {
        document.getElementById(minor.a).style.fill = emptyColour;
        document.getElementById(minor.a + "P").style.fill = emptyColour;
    }

    if (minor.rel == "e") {
        document.getElementById("SMP").style.fill = emptyColour;
        document.getElementById("SM").style.fill = emptyColour;
    }




}
// only updates the major premise
function majorUpdateVenn() {
    if (major.rel == "i") {
        document.getElementById("MP").style.fill = inhabitedColour;
        document.getElementById("SMP").style.fill = inhabitedColour;
    }
    else if (major.rel == "o") {
        document.getElementById(major.a).style.fill = inhabitedColour;
        document.getElementById("S" + major.a).style.fill = inhabitedColour;
    }
    else if (major.rel == "a") {
        document.getElementById(major.a).style.fill = emptyColour;
        document.getElementById("S" + major.a).style.fill = emptyColour;

    }
    else if (major.rel == "e") {
        document.getElementById("SMP").style.fill = emptyColour;
        document.getElementById("MP").style.fill = emptyColour;
    }
}

// updates for the existential assumption
function existentialUpdate(cat) {
   console.log("we're in the existential");
   console.log("cat");
   console.log(document.getElementById("SMP").style.fill);

   if (document.getElementById("SMP").style.fill == normalColour) {
    document.getElementById("SMP").style.fill = inhabitedColour;
    undoMe = "SMP";
    }

    else if ((cat == "M" || cat == "S") && document.getElementById("SM").style.fill == normalColour) {
        document.getElementById("SM").style.fill = inhabitedColour;
        undoMe = "SM";
    }
    
    else if ((cat == "M" || cat == "P") && document.getElementById("MP").style.fill == normalColour) {
        document.getElementById("MP").style.fill = inhabitedColour;
        undoMe = "MP";
    }

    else if ((cat == "P" || cat == "S") && document.getElementById("SP").style.fill == normalColour) {
        document.getElementById("SP").style.fill = inhabitedColour;
        undoMe = "SP";
    }

    else if (cat == "S" && document.getElementById("S").style.fill == normalColour) {
        document.getElementById("S").style.fill = inhabitedColour;
        undoMe = "S";
    }

    else if (cat == "M" && document.getElementById("M").style.fill == normalColour) {
        document.getElementById("M").style.fill = inhabitedColour;
        undoMe = "M";
    }
    else if (cat == "P" && document.getElementById("P").style.fill == normalColour) {
        document.getElementById("P").style.fill = inhabitedColour;
        undoMe = "P";
    }
    

}

// updates text for scrolly boxes
function updateText() {
    //conclusion = "";

    document.getElementById("text1").innerText = `"${major.toString()}" means that ${major.explaination}. As a result, the ${major.shadingColour} area is ${major.shading}. `;
    document.getElementById("text2").innerText = `Now we'll take a look at the minor premise, which tells us about the relationship between ${categories.mName} and ${categories.sName}.`;
    document.getElementById("text3").innerText = `"${minor.toString()}" means that ${minor.explaination}. As a result, the ${minor.shadingColour} area is ${minor.shading}.`;
    document.getElementById("text4").innerText = `Given this information, what can we say about the relationship between ${categories.sName} and ${categories.pName}?`;
    document.getElementById("SaP").innerText = `All ${categories.sName} are ${categories.pName}`;
    document.getElementById("SiP").innerText = `Some ${categories.sName} are ${categories.pName}`;
    document.getElementById("SeP").innerText = `No ${categories.sName} are ${categories.pName}`;
    document.getElementById("SoP").innerText = `Some ${categories.sName} are not ${categories.pName}`;
    document.getElementById("SaP2").innerText = `All ${categories.sName} are ${categories.pName}`;
    document.getElementById("SiP2").innerText = `Some ${categories.sName} are ${categories.pName}`;
    document.getElementById("SeP2").innerText = `No ${categories.sName} are ${categories.pName}`;
    document.getElementById("SoP2").innerText = `Some ${categories.sName} are not ${categories.pName}`;




    // explainations, based on what the conclision is
    if (conclusion.get() == "SaP") {
        document.getElementById("text5").innerText = `The only region of ${categories.sName} that can be inhabited overlaps with ${categories.pName}, so we conclude that ${conclusion.toString()}.`;
    }
    else if (conclusion.get() == "SiP") {
        document.getElementById("text5").innerText = `Part of the intersection of ${categories.sName} and ${categories.pName} must be inhabited, so we conclude that ${conclusion.toString()}.`;
    }
    else if (conclusion.get() == "SeP") {
        document.getElementById("text5").innerText = `The intersection of ${categories.sName} and ${categories.pName} is uninhabited, so we conclude that ${conclusion.toString()}.`;
    }
    else if (conclusion.get() == "SoP") {
        document.getElementById("text5").innerText = `A region of ${categories.sName} that does not ovelap with ${categories.pName} is inhabited, so we conclude that ${conclusion.toString()}.`;
    }
    else {
        document.getElementById("text5").innerText = `We cannot conclude anything about the relationship between ${categories.sName} and ${categories.pName} from the diagram.`;
    }



    //if (isValid == "false"){
    //  document.getElementById("extra").style.display = "inline";

    //}

    // currently just hiding step 6, bc may or may not want to show syllogism name
    document.getElementById("text6").style.display = "none";

    if (existential.bool == "true") {
        document.getElementById("existential").style.display = "inline";
        document.getElementById("existential1").innerHTML = `For this Syllogism, we can draw a different conclusion under the existential assumption`;
        document.getElementById("existential1").innerHTML = `If we made the existential assumption on ${existential.getCat()}, (we know for certain that ${existential.getCat()} is inhabited), what could we then conclude?`;
    }
    else {
        document.getElementById("existential").style.display = "none";
    }


}

// gets conclusion, names syllogism, and sets validity
function findConclusion() {
    isValid = "true";
    if (major.get() == "MaP") {
        if (minor.get() == "SaM") {
            conclusion.set("SaP");
            syllName = "Barbara";
            existential.set("S", "SiP", "Barbari");
        }

        else if (minor.get() == "MiS") {
            conclusion.set("SiP");
            syllName = "Datisi";
        }

        else if (minor.get() == "SiM") {
            conclusion.set("SiP");
            syllName = "Darii";

        }
        else if (minor.get() == "MaS") {
            conclusion.set("xxx");
            syllName = "nothing for now";
            isValid = "false";
            existential.set("M", "SiP", "Darapti");
        }
        else {
            conclusion.set("xxx");
            syllName = "nothing for now";
            isValid = "false";
        }


    }
    else if (major.get() == "MeP") {
        if (minor.get() == "SaM") {
            conclusion.set("SeP");
            syllName = "Celarent";
            existential.set("S", "SoP", "Celaront");

        }
        else if (minor.get() == "MiS") {
            conclusion.set("SoP");
            syllName = "Ferison";
        }
        else if (minor.get() == "SiM") {
            conclusion.set("SoP");
            syllName = "Ferio";

        }
        else if (minor.get() == "MaS") {
            conclusion.set("xxx");
            syllName = "nothing for now";
            isValid = "false";
            existential.set("M", "SoP", "Felapton");
        }

        else {
            conclusion.set("xxx");
            syllName = "nothing for now";
            isValid = "false";
        }
    }

    else if (major.get() == "PeM") {
        if (minor.get() == "SaM") {
            conclusion.set("SeP");
            syllName = "Cesare";
            existential.set("S", "SoP", "Cesaro");
        }
        else if (minor.get() == "SiM") {
            conclusion.set("SoP");
            syllName = "Festino";
        }
        else if (minor.get() == "MiS") {
            conclusion.set("SoP");
            syllName = "Fresison";
        }
        else if (minor.get() == "MaS") {
            conclusion.set("xxx");
            syllName = "nothing for now";
            isValid = "false";
            existential.set("M", "SoP", "Fesapo");
        }
        else {
            conclusion.set("xxx");
            syllName = "nothing for now";
            isValid = "false";
        }
    }

    else if (major.get() == "PaM") {
        if (minor.get() == "SeM") {
            conclusion.set("SeP");
            syllName = "Camestres";
            existential.set("S", "SoP", "Camestros");
        }
        else if (minor.get() == "MaS") {
            conclusion.set("xxx");
            syllName = "nothing for now";
            isValid = "false";
            existential.set("P", "SiP", "Bamalip");
        }
        else if (minor.get() == "MeS") {
            conclusion.set("SeP");
            syllName = "calemes";
            existential.set("S", "SoP", "Calemos");
        }
        else if (minor.get() == "SoM") {
            conclusion.set("SoP");
            syllName = "Baroco";
        }
        else {
            conclusion.set("xxx");
            syllName = "nothing for now";
            isValid = "false";
        }
    }

    else if (major.get() == "MoP" && minor.get() == "MaS") {
        conclusion.set("SoP");
        syllName = "Bocardo";
    }

    else if (major.get() == "MiP" && minor.get() == "MaS") {
        conclusion.set("SiP");
        syllName = "Disamis";
    }

    else if (major.get() == "PiM" && minor.get() == "MaS") {
        conclusion.set("SiP");
        syllName = "Dimatis";
    }

    else {
        conclusion.set("xxx");
        syllName = "not set... need to sort this";
        isValid = "false";
    }

    console.log("conclusion is " + conclusion.get());
    console.log(`${conclusion.toString()} ${isValid}`);
    console.log(existential.get());

    //return syllName;

}

// shows answer to MCQ

function showAnswer(x) {
    if (x == conclusion.get()) {
        document.getElementById("answer").innerText = "Correct";
        document.getElementById("answer").style.color = "green";

    }


    else {
        document.getElementById("answer").innerText = "Try again";
        document.getElementById("answer").style.color = "goldenrod";
        setTimeout(hideAnswer, 2000);
    }
}

function showAnswer2(x) {
    if (x == existential.conclusion) {
        document.getElementById("answer2").innerText = "Correct";
        document.getElementById("answer2").style.color = "green";

    }
    else {
        document.getElementById("answer2").innerText = "Try again";
        document.getElementById("answer2").style.color = "goldenrod";
        setTimeout(hideAnswer, 2000);
    }
}

function hideAnswer() {
    document.getElementById("answer").style.color = backgroundColour;
    document.getElementById("answer2").style.color = backgroundColour;
    //console.log("hiding answer");
}


//Get the button:
mybutton = document.getElementById("scrollBtn");

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    
   let jumpto =  document.getElementById("rand").offsetTop - (0.9*window.innerHeight );
    document.body.scrollTop = jumpto; // For Safari
    document.documentElement.scrollTop = jumpto; // For Chrome, Firefox, IE and Opera
}



// this scroll function seems to work... keep an eye on I feel it may break
window.addEventListener("scroll", () => {

    if (this.pageYOffset < 850) {
        hideLines("MP");
        step.classed("is-active", function (d, i) {
            this.style.fill = "black";
        });

    }
}),

    document.addEventListener('DOMContentLoaded', () => {
        let element;
        for (let i = 1; i <= 3; i++) {
            element = document.getElementById("cat" + i);
            element.addEventListener('change', updateCategories);
        }

    });





