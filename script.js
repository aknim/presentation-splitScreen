document.addEventListener('DOMContentLoaded', () => {
    const floatingBox = document.getElementById('floating-box');

    let isDragging = false;
    let offsetX, offsetY;

    // Start dragging
    floatingBox.addEventListener('mousedown', (e) => {
        isDragging = true;

        offsetX = e.clientX - floatingBox.getBoundingClientRect().left;
        offsetY = e.clientY - floatingBox.getBoundingClientRect().top;

        // Apply a visual cue for dragging
        floatingBox.style.cursor = 'grabbing';
    });

    // Drag the box
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newLeft = e.clientX - offsetX;
            const newTop = e.clientY - offsetY;

            floatingBox.style.left = `${newLeft}px`;
            floatingBox.style.top = `${newTop}px`;
        }
    });

    // Stop dragging
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            // Reset the cursor style
            floatingBox.style.cursor = 'grab';
        }
    })

    // Set the initial cursor style
    floatingBox.style.cursor = 'grab';

    const leftPanel = document.getElementById('left-panel');
    const presentationModeCheckBox = document.getElementById('presentation-mode');
    const presentationBox = document.getElementById('presentation-box');
    const forwardBtn = document.getElementById('forward-btn');
    const backwardBtn = document.getElementById('backward-btn');

    let isPresentationMode = false;
    let currentLines = [];
    let currentIndex = -1;

    presentationModeCheckBox.addEventListener('change', (e) => {
        isPresentationMode = e.target.checked;
        if(!isPresentationMode) {
            currentLines = [];
            currentIndex = -1;
            presentationBox.value = '';
        }
    });

    // left panel text box - click
    leftPanel.addEventListener('click', (e) => {
        if (isPresentationMode && e.target.tagName === 'TEXTAREA'){
            const content = e.target.value;
            currentLines = content.split('\n');
            currentIndex = -1;
            presentationBox.value = '';
        }
    });

    // Navigate to the next line
    forwardBtn.addEventListener('click', () => {
        if (currentLines.length > 0 && currentIndex < currentLines.length - 1) {
            currentIndex++;
            presentationBox.value = currentLines[currentIndex];
        }
    });

    // Navigate to the previous line
    backwardBtn.addEventListener('click', () => {
        if (currentLines.length > 0 && currentIndex > 0) {
            currentIndex--;
            presentationBox.value = currentLines[currentIndex];
        }
    });

    function makeDraggable(element) {
        let offsetX = 0;
        let offsetY = 0;

        element.addEventListener('mousedown', (e) => {

            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;

            function moveAt(event) {
                element.style.left = `${event.clientX - offsetX}px`;
                element.style.top = `${event.clientY - offsetY}px`;
            }

            function stopDrag() {
                document.removeEventListener('mousemove', moveAt);
                document.removeEventListener('mouseup', stopDrag);
            }

            document.addEventListener('mousemove',moveAt);
            document.addEventListener('mouseup', stopDrag);
        });
    }

    // Double click to create new box
    leftPanel.addEventListener('dblclick', (e) => {
        const newBox = document.createElement('textarea');
        newBox.classList.add('draggable');
        newBox.style.left = `${e.clientX}px`;
        newBox.style.top = `${e.clientY}px`;

        makeDraggable(newBox);

        leftPanel.appendChild(newBox);
    });
});