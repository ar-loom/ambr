function drawRoom() {
    // Get input values
    const roomSize = parseInt(document.getElementById('roomSize').value);
    const numPeople = parseInt(document.getElementById('numPeople').value);
    const personHeight = parseInt(document.getElementById('personHeight').value);

    // Calculate room dimensions (assuming square room for simplicity)
    const roomSide = Math.sqrt(roomSize);

    // Remove previous scene if any
    const oldCanvas = document.querySelector('#canvas-container canvas');
    if (oldCanvas) {
        oldCanvas.remove();
    }

    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 600);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.PointLight(0xFFFFFF);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Add the room (a simple cube)
    const roomGeometry = new THREE.BoxGeometry(roomSide, roomSide, roomSide);
    const roomMaterial = new THREE.MeshBasicMaterial({color: 0xFFBF00, wireframe: true});
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    scene.add(room);

    // Add people (spheres)
    const personGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const personMaterial = new THREE.MeshBasicMaterial({color: 0xFFBF00});
    for (let i = 0; i < numPeople; i++) {
        const angle = (i / numPeople) * 2 * Math.PI;
        const personX = (roomSide / 2 - 1) * Math.cos(angle);
        const personZ = (roomSide / 2 - 1) * Math.sin(angle);
        const person = new THREE.Mesh(personGeometry, personMaterial);
        person.position.set(personX, personHeight / 2, personZ);
        scene.add(person);
    }

    // Position the camera
    camera.position.z = roomSide * 1.5;

    // Render the scene
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}
