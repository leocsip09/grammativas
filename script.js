document.addEventListener('DOMContentLoaded', function () {
    const buttonGroups = document.querySelectorAll('.buttons');
    
    buttonGroups.forEach(group => {
        const buttons = group.querySelectorAll('button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                } else {
                    buttons.forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                }
            });
        });
    });

    const resultsButton = document.querySelector('.envio');
    resultsButton.addEventListener('click', function () {
        const results = [];
        buttonGroups.forEach(group => {
            const selectedButton = group.querySelector('.selected');
            if (selectedButton) {
                results.push(selectedButton.textContent);
            } else {
                results.push('No seleccionado');
            }
        });
        results.pop();

        if (results.every(result => result === 'No seleccionado')) {
            const resultsDiv = document.querySelector('.resultados');
            resultsDiv.innerHTML = '<p>No se encontraron coincidencias.</p>';
            return; 
        }
        
        for (let i = 0; i < results.length; i++) {
            if (results[i] === '+') {
                results[i] = '1';
            } else if (results[i] === '-') {
                results[i] = '0';
            } else if (results[i] === '+/-') {
                results[i] = '2';
            } else if (results[i] === 'No seleccionado') {
                results[i] = '';
            }
        }

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
        
        const resultsDiv = document.querySelector('.resultados');
        resultsDiv.innerHTML = '';

        let exactMatches = [];
        let partialMatches = [];

        for (let bacteria in bacteriaData) {
            let matchCount = 0;
            let totalCount = 0;

            for (let i = 0; i < results.length; i++) {
                if (results[i] !== '') {
                    if (results[i] === '2') {
                        matchCount++; // Considera a '2' como comodín :3
                    } else if (results[i] == bacteriaData[bacteria][i]) {
                        matchCount++;
                    }
                    totalCount++;
                }
            }

            let similarityPercentage = matchCount / totalCount;

            if (matchCount === totalCount) {
                exactMatches.push(bacteria);
            } else if (similarityPercentage > 0.8) {
                partialMatches.push(bacteria);
            }
        }

        if (exactMatches.length > 0) {
            if (exactMatches.length == 1){
                resultsDiv.innerHTML = `<p>Bacteria encontrada: ${exactMatches.join(', ')}</p>`;
            } else {
                resultsDiv.innerHTML = `<p>Bacterias encontradas: ${exactMatches.join(', ')}</p>`;
            }
            
        } else if (partialMatches.length > 0) {
            if (partialMatches.length == 1){
                resultsDiv.innerHTML = `<p>Posible bacteria encontrada: ${partialMatches.join(', ')}</p`;
            } else {
                resultsDiv.innerHTML = `<p>Posibles bacterias: ${partialMatches.join(', ')}</p>`;
            }
        } else {
            resultsDiv.innerHTML = '<p>No se encontraron coincidencias.</p>';
        }
    });
});
