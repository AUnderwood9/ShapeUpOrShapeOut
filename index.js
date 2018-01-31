"use strict";

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
let circleRadius;
let squareLength;
let triangleHeight;

class Shape{
    constructor(type, dimensions = {shapeName: "N/A", height: "N/A", width: "N/A", radius: "N/A"}){
        this.type = type;
        this.dimensions = dimensions;
    }

    render(){
        let randomPosition = getRandomPosition(mainCanvas);
        switch(String(this.type)){
            case "Rectangle":
                this.shapeToAdd = $(`<div class="rectangle"></div>`);
                this.shapeToAdd.css({"width": `${this.dimensions.width}`, "height": `${this.dimensions.height}`, "top": `${randomPosition.height}px`, "left": `${randomPosition.width}px`});
                this.shapeToAdd.on("click", this, onClickHandler).on("dblclick", onDblClickHandler);
                mainCanvas.append(this.shapeToAdd);
                break;
            case "Circle": 
                this.shapeToAdd = $(`<div class="circle"></div>`);
                this.shapeToAdd.css({"width" : `${2*this.dimensions.radius}px`, "height": `${2*this.dimensions.radius}px`, "top": `${randomPosition.height}px`, "left": `${randomPosition.width}px`});
                this.shapeToAdd.on("click", this, onClickHandler).on("dblclick", onDblClickHandler);
                mainCanvas.append(this.shapeToAdd);
                break;
            case "Square":
                this.shapeToAdd = $(`<div class="square"></div>`);
                this.shapeToAdd.css({"width": `${this.dimensions.width}`, "height": `${this.dimensions.width}`, "top": `${randomPosition.height}px`, "left": `${randomPosition.width}px`});
                this.shapeToAdd.on("click", this, onClickHandler).on("dblclick", onDblClickHandler);
                mainCanvas.append(this.shapeToAdd);
                break;
            case "Triangle":
                this.shapeToAdd = $(`<div class="triangle"></div>`);
                this.shapeToAdd.css({"border-width": `${this.dimensions.height}px`, "top": `${randomPosition.height}px`, "left": `${randomPosition.width}px`});
                this.shapeToAdd.on("click", this, onClickHandler).on("dblclick", onDblClickHandler);
                mainCanvas.append(this.shapeToAdd);
                break;
            default:
                break;
        }
    }

    showInfo(){
        clearElement(sidePanel);
        for(let key in this.dimensions){
            if(key === "shapeName")
                appendTextToElement(sidePanel, `<p class="info-text">Shape Name: ${this.dimensions[key]}</p>`);
            else
            appendTextToElement(sidePanel, `<p class="info-text">${key}: ${this.dimensions[key]}</p>`);
        }
        
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
        dimensions.perimeter = roundUp(2*pi*(roundUp(dimensions.radius)));
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

    let rectangleObject = new Rectangle({shapeName: "Rectangle", width: currentWidth, height: curentHeight});
    rectangleObject.render();
}

const squareBtnHandler = function(event){
    let currentWidth = getTextFromInput(squareLengthText);

    let squareObject = new Square({shapeName: "Square", width: currentWidth, height: currentWidth});
    squareObject.render();
}

const circleBtnHandler = function(event){
    let currentRadius = getTextFromInput(circleRadiusText);

    let circleObject = new Circle({shapeName: "Circle", radius: currentRadius});
    circleObject.render();
}

const triangleBtnHandler = function(event){
    let currentHeight = getTextFromInput(triangleHeightText);

    let triangleObject = new Triangle({shapeName: "Triangle", height: currentHeight});
    triangleObject.render();
}

const onClickHandler = function(event){
    event.data.showInfo();
}

const onDblClickHandler = function(event){
    event.target.remove();
    clearElement(sidePanel);
}

let roundUp = (numberToRound) => {
    return Math.round(numberToRound);
}

let getRandomPosition = (element) => {
    const x = element.height();
    const y = element.width();
	const randomX = Math.floor(Math.random()*x);
	const randomY = Math.floor(Math.random()*y);
	return {height: randomX, width: randomY};
}

$(document).ready(() => {
    initializeMainElements();

    rectangleBtn.on("click", rectangleBtnHandler);
    squareBtn.on("click", squareBtnHandler);
    circleBtn.on("click", circleBtnHandler);
    triangleBtn.on("click", triangleBtnHandler);

});