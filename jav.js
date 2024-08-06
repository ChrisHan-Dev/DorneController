document.addEventListener("DOMContentLoaded", function() {
    // Initialize the joystick
    var joystick = new JoyStick("joystick-container", {
        internalFillColor: "#00AA00",
        internalStrokeColor: "#003300",
        externalStrokeColor: "#008000"
    });

    // Handle slider change
    const slider = document.getElementById("slider");
    slider.addEventListener("input", function() {
        console.log("Slider value:", slider.value);
        // Placeholder: Send the slider value to the drone
        sendSliderValueToDrone(slider.value);
    });

    // Handle emergency button click
    const emergencyButton = document.getElementById("emergency-button");
    emergencyButton.addEventListener("click", function() {
        console.log("Emergency stop triggered!");
        // Placeholder: Send emergency stop command to the drone
        sendEmergencyStopToDrone();
    });

    // Placeholder functions for drone communication
    function sendSliderValueToDrone(value) {
        // Implement the actual communication logic here
        console.log("Sending slider value to drone:", value);
    }

    function sendEmergencyStopToDrone() {
        // Implement the actual communication logic here
        console.log("Sending emergency stop to drone");
    }
});

// Joystick implementation
var JoyStick = function(containerId, options) {
    options = options || {};
    var title = options.title || "joystick",
        width = options.width || 150,
        height = options.height || 150,
        internalFillColor = options.internalFillColor || "#00AA00",
        internalLineWidth = options.internalLineWidth || 2,
        internalStrokeColor = options.internalStrokeColor || "#003300",
        externalLineWidth = options.externalLineWidth || 2,
        externalStrokeColor = options.externalStrokeColor || "#008000",
        container = document.getElementById(containerId),
        canvas = document.createElement("canvas");

    canvas.id = title;
    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);

    var context = canvas.getContext("2d"),
        pressed = false,
        radius = canvas.width / 2 - 20,
        centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        knobX = centerX,
        knobY = centerY;

    function drawJoystick() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw external circle
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.lineWidth = externalLineWidth;
        context.strokeStyle = externalStrokeColor;
        context.stroke();

        // Draw internal circle
        context.beginPath();
        context.arc(knobX, knobY, radius / 2, 0, Math.PI * 2);
        var gradient = context.createRadialGradient(knobX, knobY, 5, knobX, knobY, 100);
        gradient.addColorStop(0, internalFillColor);
        gradient.addColorStop(1, internalStrokeColor);
        context.fillStyle = gradient;
        context.fill();
        context.lineWidth = internalLineWidth;
        context.strokeStyle = internalStrokeColor;
        context.stroke();
    }

    canvas.addEventListener("mousedown", function(event) {
        pressed = true;
    });

    canvas.addEventListener("mousemove", function(event) {
        if (pressed) {
            var rect = canvas.getBoundingClientRect();
            knobX = event.clientX - rect.left;
            knobY = event.clientY - rect.top;
            drawJoystick();
        }
    });

    canvas.addEventListener("mouseup", function() {
        pressed = false;
        knobX = centerX;
        knobY = centerY;
        drawJoystick();
    });

    canvas.addEventListener("mouseleave", function() {
        pressed = false;
        knobX = centerX;
        knobY = centerY;
        drawJoystick();
    });

    drawJoystick();
};
