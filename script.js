document.addEventListener("DOMContentLoaded", function() {
    const tshirtDesign = document.getElementById("tshirt-design");
    const tshirtColor = document.getElementById("tshirt-color");
    const tshirtPart = document.getElementById("tshirt-part");
    const tshirtCustomPicture = document.getElementById("tshirt-custompicture");
    const tshirtView = document.getElementById("tshirt-view");
    const tshirt = document.getElementById("tshirt");
    const tshirtFront = document.getElementById("tshirt-front");
    const tshirtBack = document.getElementById("tshirt-back");
    const canvas = document.getElementById("tshirt-canvas");
    const ctx = canvas.getContext("2d");
    const canvasBack = document.getElementById("tshirt-canvas-back");
    const ctxBack = canvasBack.getContext("2d");

    let currentView = 'front';
    let currentPart = 'body';
    let colors = {
        front: { body: '#fff', sleeves: '#fff', hands: '#fff' },
        back: { body: '#fff', sleeves: '#fff', hands: '#fff' }
    };

    let rotateInterval = null;
    const rotationStep = 5; // Adjust the rotation step as needed

    // Keyboard rotation start
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft' && !rotateInterval) {
            rotateInterval = setInterval(() => {
                rotateTshirt(-rotationStep);
            }, 50); // Adjust the interval as needed
        } else if (event.key === 'ArrowRight' && !rotateInterval) {
            rotateInterval = setInterval(() => {
                rotateTshirt(rotationStep);
            }, 50); // Adjust the interval as needed
        }
    });

    // Keyboard rotation stop
    document.addEventListener('keyup', function(event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            clearInterval(rotateInterval);
            rotateInterval = null;
        }
    });

    function rotateTshirt(degrees) {
        tshirt.style.transform += ` rotateY(${degrees}deg)`;
    }

    // Change T-Shirt view
    tshirtView.addEventListener("change", function() {
        currentView = this.value;
        tshirt.classList.toggle("flipped", currentView === 'back');
        updateTshirtColor();
    });

    // Change T-Shirt color
    tshirtColor.addEventListener("change", function() {
        colors[currentView][currentPart] = this.value;
        updateTshirtColor();
    });

    // Change T-Shirt part
    tshirtPart.addEventListener("change", function() {
        currentPart = this.value;
        updateTshirtColor();
    });

    // Change T-Shirt design
    tshirtDesign.addEventListener("change", function() {
        const design = new Image();
        design.src = this.value;
        design.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(design, 0, 0, canvas.width, canvas.height);
        };

        const designBack = new Image();
        designBack.src = this.value;
        designBack.onload = function() {
            ctxBack.clearRect(0, 0, canvasBack.width, canvasBack.height);
            ctxBack.drawImage(designBack, 0, 0, canvasBack.width, canvasBack.height);
        };
    });

    // Upload custom design
    tshirtCustomPicture.addEventListener("change", function(event) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const customImage = new Image();
            customImage.src = e.target.result;
            customImage.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(customImage, 0, 0, canvas.width, canvas.height);
            };

            const customImageBack = new Image();
            customImageBack.src = e.target.result;
            customImageBack.onload = function() {
                ctxBack.clearRect(0, 0, canvasBack.width, canvasBack.height);
                ctxBack.drawImage(customImageBack, 0, 0, canvasBack.width, canvasBack.height);
            };
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    function updateTshirtColor() {
        const bodyColor = colors[currentView].body;
        const sleevesColor = colors[currentView].sleeves;
        const handsColor = colors[currentView].hands;

        tshirtFront.style.background = `linear-gradient(${bodyColor} 70%, ${sleevesColor} 30%)`;
        tshirtBack.style.background = `linear-gradient(${bodyColor} 70%, ${sleevesColor} 30%)`;

        // Update body and sleeves colors
        const bodyElements = document.querySelectorAll('.tshirt-side');
        bodyElements.forEach(side => {
            side.style.backgroundColor = bodyColor;
        });

        // Apply hands color separately
        const handsElements = document.querySelectorAll('.hand');
        handsElements.forEach(hand => {
            hand.style.backgroundColor = handsColor;
        });
    }

    // Initialize
    updateTshirtColor();
});
