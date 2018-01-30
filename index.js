let rectangleBtn;
let rectangleWidthText;
let rectangleHeightText;
let squareBtn;
let squareLengthText;
let circleBtn;
let circleRadiusText;
let triangleBtn;
let triangleHeightText;
let mainCanvas;
let sidePanel;
let elementCreated;
let pi = Math.PI;
//let currentOptionObject;


class Shape{
    constructor(type, dimensions = {height: "N/A", width: "N/A", radius: "N/A"}){
        this.type = type;
        this.dimensions = dimensions;
    }

    render(){

    }

    showInfo(){
        clearElement(sidePanel);
        for(let key in this.dimensions){
            appendTextToElement(sidePanel, `<p class="info-text">${key}: ${this.dimensions[key]}</p>`);
        }

        // switch(String(this.type)){
        // }
        
        //console.log(this.dimensions);
        
    }
}

class Rectangle extends Shape{
    constructor(dimensions){
        dimensions.area = roundUp(dimensions.width)*roundUp(dimensions.height);
        dimensions.radius = "N/A";
        dimensions.perimeter = 2*(roundUp(dimensions.width) + roundUp(dimensions.height));
        super("Rectangle", dimensions);
    }

}

class Square extends Shape{
    constructor(dimensions){
        dimensions.area = roundUp(dimensions.width)**2;
        dimensions.radius = "N/A";
        dimensions.perimeter = 4*roundUp(dimensions.width);
        super("Square", dimensions);
    }
}

class Circle extends Shape{
    constructor(dimensions){
        dimensions.width = "N/A";
        dimensions.height = "N/A";
        dimensions.area = roundUp(pi*(roundUp(dimensions.radius)**2));
        dimensions.perimeter = roundUp(2*pi*(roundUp(dimensions.radius)**2));
        super("Circle", dimensions);
    }
}

class Triangle extends Shape{
    constructor(dimensions){
        dimensions.width = "N/A";
        dimensions.radius = "N/A";
        dimensions.area = 0.5*roundUp(dimensions.height)*roundUp(dimensions.height);
        dimensions.perimeter = 2 * roundUp(dimensions.height)*roundUp(Math.sqrt(2 * roundUp(dimensions.height) * roundUp(dimensions.height)));
        super("Triangle", dimensions);
    }
}

const initializeMainElements = () => {

    rectangleBtn = $("#rectangle-btn");
    rectangleWidthText = $("#rectangle-width");
    rectangleHeightText = $("#rectangle-height");
    squareBtn = $("#square-btn");
    squareLengthText = $("#square-length");
    circleBtn = $("#circle-btn");
    circleRadiusText = $("#circle-radius");
    triangleBtn = $("#triangle-btn");
    triangleHeightText = $("#triangle-height");
    mainCanvas = $("#main-canvas");
    sidePanel = $("#info-div");

    console.log(rectangleBtn);
    console.log(rectangleWidthText);
    console.log(rectangleHeightText);
    console.log(squareBtn);
    console.log(squareLengthText);
    console.log(circleBtn);
    console.log(circleRadiusText);
    console.log(triangleBtn);
    console.log(triangleHeightText);
    console.log(mainCanvas);
    console.log(sidePanel);

}

let getTextFromInput = (inputElement) => {
    let inputToreturn = inputElement.val();

    return inputElement.val();
}

const clearTextElement = (textElement) => {
    textElement.val('');
}

const clearElement = (elementToClear) => {
    elementToClear.empty();
}

const appendTextToElement = (elementToAppendTo, textToAppend) => {
    elementToAppendTo.append(textToAppend);
}

const rectangleBtnHandler = function(event){
    let currentWidth = getTextFromInput(rectangleWidthText);
    let curentHeight = getTextFromInput(rectangleHeightText);

    let rectangleObject = new Rectangle({width: currentWidth, height: curentHeight});

    rectangleObject.showInfo();
}

const squareBtnHandler = function(event){
    let currentWidth = getTextFromInput(squareLengthText);

    let squareObject = new Rectangle({width: currentWidth, height: currentWidth});


    squareObject.showInfo();
}

const circleBtnHandler = function(event){
    let currentRadius = getTextFromInput(circleRadiusText);

    let circleObject = new Circle({radius: currentRadius});

    circleObject.showInfo();
}

const triangleBtnHandler = function(event){
    let currentHeight = getTextFromInput(triangleHeightText);

    let triangleObject = new Triangle({height: currentHeight});

    triangleObject.showInfo();
}

let roundUp= (numberToRound) => {
    return Math.round(numberToRound);
}

$(document).ready(() => {
    initializeMainElements();
    console.log("fire");

    rectangleBtn.on("click", rectangleBtnHandler);
    squareBtn.on("click", squareBtnHandler);
    circleBtn.on("click", circleBtnHandler);
    triangleBtn.on("click", triangleBtnHandler);

});

// position: relative;