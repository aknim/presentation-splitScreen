document.addEventListener('DOMContentLoaded', () => {
    const leftPanel = document.getElementById('left-panel');

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