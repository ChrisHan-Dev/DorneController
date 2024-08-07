document.addEventListener("DOMContentLoaded", function() {
    // Initialize the joystick
    var joystick = new JoyStick("joystick-container", {
        internalFillColor: "#000000", // Blue color for the joystick
        internalStrokeColor: "#ffffff",
        externalStrokeColor: "#52e36e"
    });

    // Initialize the slider to 0
    const slider = document.getElementById("slider");
    const sliderValueDisplay = document.getElementById("slider-value");
    slider.value = 0; // Ensure slider starts at 0

    // Handle slider change
    slider.addEventListener("input", function() {
        console.log("Slider value:", slider.value);
        sliderValueDisplay.textContent = "Value: " + slider.value; // Update the display value
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
        width = options.width || 200,
        height = options.height || 200,
        internalFillColor = options.internalFillColor || "#000000", // Change internal fill color here
        internalLineWidth = options.internalLineWidth || 2,
        internalStrokeColor = options.internalStrokeColor || "#C70039", // Change internal stroke color here
        externalLineWidth = options.externalLineWidth || 2,
        externalStrokeColor = options.externalStrokeColor || "#900C3F", // Change external stroke color here
        externalFillColor = options.externalFillColor || "#52e36e", // New external fill color
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
         context.fillStyle = externalFillColor; // Set external fill color
         context.fill(); // Fill the external circle
 
         // Draw internal circle
         context.beginPath();
         context.arc(knobX, knobY, radius / 2, 0, Math.PI * 2);
         var gradient = context.createRadialGradient(knobX, knobY, 5, knobX, knobY, 100);
         gradient.addColorStop(0, internalFillColor);
        //  gradient.addColorStop(1, internalStrokeColor); 
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
            var dx = event.clientX - rect.left - centerX;
            var dy = event.clientY - rect.top - centerY;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > radius) {
                var angle = Math.atan2(dy, dx);
                dx = radius * Math.cos(angle);
                dy = radius * Math.sin(angle);
            }

            knobX = centerX + dx;
            knobY = centerY + dy;
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
