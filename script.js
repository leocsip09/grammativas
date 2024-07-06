document.addEventListener('DOMContentLoaded', function () {
    const buttonGroups = document.querySelectorAll('.buttons');
    
    buttonGroups.forEach(group => {
        const buttons = group.querySelectorAll('button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                buttons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });
});

const bacteriaData = {
    "Escherichia coli": [1, 1, 0, 0, 0, 0, 2, 2, 1, 0, 1, 1, 2, 0, 0, 0, 0],
    "Shigella": [2, 1, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    "Salmonella": [0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 2, 0, 0],
    "Citrobacter freundii": [0, 1, 0, 1, 1, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 0, 0],
    "Citrobacter koseri": [1, 1, 0, 1, 0, 2, 1, 1, 0, 0, 1, 1, 2, 2, 1, 0, 0],
    "Enterobacter": [1, 1, 0, 0, 2, 0, 1, 2, 1, 0, 1, 2, 0, 2, 0, 0, 0],
    "Klebsiella pneumoniae": [0, 2, 1, 1, 0, 2, 0, 0, 2, 0, 1, 1, 1, 2, 2, 0, 0],
    "Klebsiella oxytoca": [1, 2, 1, 1, 0, 2, 0, 0, 1, 0, 1, 1, 1, 1, 2, 0, 0],
    "Enterobacter aerogenes": [0, 0, 1, 1, 0, 2, 1, 1, 0, 0, 1, 1, 1, 1, 2, 0, 0],
    "Enterobacter cloacae": [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0],
    "Hatnia": [0, 2, 2, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 2, 0, 0],
    "Serratia": [0, 2, 1, 1, 0, 2, 1, 1, 1, 0, 1, 2, 0, 1, 0, 2, 0],
    "Proteus vulgaris": [1, 1, 0, 2, 1, 1, 1, 0, 0, 1, 1, 2, 0, 1, 0, 0, 0],
    "Proteus mirabilis": [0, 1, 2, 2, 1, 1, 1, 1, 0, 1, 1, 1, 0, 2, 0, 0, 0],
    "Morganella morganii": [1, 1, 0, 0, 2, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0],
    "Providencia": [1, 1, 0, 1, 0, 2, 2, 0, 0, 1, 1, 0, 0, 2, 0, 0, 0],
    "Yersinia enterocolitica": [2, 1, 2, 0, 0, 2, 2, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    "Plesiomonas shigelloides": [1, 2, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1]
};

function getBacteriaData(bacteria) {
    return bacteriaData[bacteria] || [];
}
document.addEventListener('DOMContentLoaded', function () {
    const buttonGroups = document.querySelectorAll('.buttons');
    const selections = [];

    buttonGroups.forEach((group, index) => {
        const buttons = group.querySelectorAll('button');

        buttons.forEach((button, buttonIndex) => {
            button.addEventListener('click', function () {
                buttons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                selections[index] = buttonIndex; 
            });
        });
    });

    const enviarButton = document.querySelector('.envio');
    enviarButton.addEventListener('click', function () {
        const resultadosDiv = document.querySelector('.test .resultados');
        resultadosDiv.innerHTML = '';

        function compararSeleccion() {
            let coincidencias = [];
            Object.keys(bacteriaData).forEach(bacteria => {
                const data = bacteriaData[bacteria];
                let coincide = true;
                for (let i = 0; i < selections.length; i++) {
                    if (selections[i] === 0 && data[i] !== 0) {
                        coincide = false;
                        break;
                    } else if (selections[i] === 1 && data[i] !== 1) {
                        coincide = false;
                        break;
                    } else if (selections[i] === 2 && (data[i] !== 0 && data[i] !== 1)) {
                        coincide = false;
                        break;
                    }
                }
                if (coincide) {
                    coincidencias.push(bacteria);
                }
            });

            return coincidencias;
        }

        const coincidencias = compararSeleccion();

        if (coincidencias.length > 0) {
            const resultadosHTML = `<p>Resultados: ${coincidencias.join(', ')}</p>`;
            resultadosDiv.innerHTML = resultadosHTML;
        } else {
            resultadosDiv.innerHTML = '<p>No se encontraron coincidencias con ninguna bacteria conocida.</p>';
        }
    });
});