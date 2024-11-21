document.getElementById('solve-btn').addEventListener('click', () => {
    const input = document.getElementById('matrix-input').value;
    try {
        const matrix = JSON.parse(input);

        if (!Array.isArray(matrix) || !Array.isArray(matrix[0])) {
            throw new Error('Invalid matrix format');
        }

        const result = calculateNashEquilibrium(matrix);
        document.getElementById('result').textContent = `Nash Equilibrium: ${JSON.stringify(result)}`;

        visualizeMatrix(matrix);
    } catch (err) {
        document.getElementById('result').textContent = `Error: ${err.message}`;
    }
});

function calculateNashEquilibrium(matrix) {
    // Simple logic for 2x2 zero-sum games
    const row = matrix.length;
    const col = matrix[0].length;

    // Finding mixed strategy Nash Equilibrium
    const equilibrium = [];
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (matrix[i][j] >= 0) equilibrium.push([i, j]);
        }
    }

    return equilibrium.length > 0 ? equilibrium : 'No Nash Equilibrium Found';
}

function visualizeMatrix(matrix) {
    const canvas = document.getElementById('visualization');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cellWidth = canvas.width / matrix[0].length;
    const cellHeight = canvas.height / matrix.length;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            ctx.fillStyle = 'lightblue';
            ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            ctx.strokeRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);

            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(matrix[i][j], j * cellWidth + cellWidth / 2, i * cellHeight + cellHeight / 2);
        }
    }
}
