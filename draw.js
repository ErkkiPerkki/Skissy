document.addEventListener("DOMContentLoaded", function(){

    // Variables
    const Canvas = document.getElementById("Canvas")
    const Context = Canvas.getContext("2d")
    const CANVAS_SCALING = 2
    const POINT_DISTANCE_THRESHOLD = 2
    var shared = window.SharedSpace
    var currentDrawing = []
    var currentSegment = []
    var isMouseDown = false
    var previousPoint = null

    //  Functions
    function ParseColor(){
        var color = shared.currentColor
        switch (color){
            case "Red":
                return "227, 94, 76"
            case "Green":
                return "98, 211, 58"
            case "Blue":
                return "76, 154, 227"

            default:
                return
        }
    }

    function ParseStrokeSize(){
        var strokeSize = shared.currentStrokeSize
        switch (strokeSize){
            case "Small":
                return 3
            case "Medium":
                return 5
            case "Large":
                return 7
            
            default:
                return
        }
    }

    function GetDistanceBetweenPoints(pointA, pointB){
        var deltaX = pointA.x - pointB.x
        var deltaY = pointA.y - pointB.y
        var distance = Math.hypot(deltaX, deltaY)
        return distance
    }

    function DrawPoint(pos){
        Context.fillStyle = `rgb(${ParseColor()})`
        Context.beginPath();
        Context.arc(pos.x * CANVAS_SCALING, pos.y * CANVAS_SCALING, 5 * CANVAS_SCALING, 0, Math.PI * 2)
        Context.fill()
        currentDrawing.push({x: pos.x, y: pos.y, r: 5 * CANVAS_SCALING})
    }

    function DrawLine(pos){
        if (!previousPoint){return}

        var strokeSize = ParseStrokeSize()
        var strokeColor = ParseColor()

        Context.beginPath();
        Context.moveTo(pos.x * CANVAS_SCALING, pos.y * CANVAS_SCALING)
        Context.lineTo(previousPoint.x * CANVAS_SCALING, previousPoint.y * CANVAS_SCALING)
        Context.lineWidth = strokeSize * CANVAS_SCALING
        Context.strokeStyle = `rgb(${strokeColor})`
        Context.stroke()
        currentSegment.push(pos)

        // Second Stroke with Less Opacity for Smoother Look
        Context.beginPath();
        Context.moveTo(pos.x * CANVAS_SCALING, pos.y * CANVAS_SCALING)
        Context.lineTo(previousPoint.x * CANVAS_SCALING, previousPoint.y * CANVAS_SCALING)
        Context.lineWidth = (strokeSize + 2) * CANVAS_SCALING
        Context.strokeStyle = `rgb(${strokeColor}, 0.75)`
        Context.stroke()
    }

    function LoadDrawing(){
        var points = currentDrawing
        currentDrawing = []
        points.forEach(segment => {
            segment.forEach(point => {
                DrawLine(point)
                previousPoint = point
            })
        });
        previousPoint = null
    }

    function ResizeCanvas(){
        Canvas.height = window.innerHeight * CANVAS_SCALING
        Canvas.width = window.innerWidth * CANVAS_SCALING
        LoadDrawing()
    }

    // Resize Canvas on Initialization
    ResizeCanvas()

    // Connections
    window.onresize = ResizeCanvas
    document.onmousemove = function(event){
        var mousePos = {x: event.x, y: event.y}

        if (isMouseDown){
            if (shared.toolSelected.id == "BrushTool"){
                DrawLine(mousePos)
                previousPoint = mousePos
            }
        }
    }

    document.onmousedown = function(){
        isMouseDown = true
    }
    document.onmouseup = function(){
        isMouseDown = false
        previousPoint = null
        currentDrawing.push(currentSegment)
        currentSegment = []
    }
})