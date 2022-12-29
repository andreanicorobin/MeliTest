
console.log("_______________________");

const mutantSequences = ["AAAA", "TTTT", "CCCC", "GGGG"];

//Verifica las secuencias verticales y las inserta en un array
const getDownLinesArray = (dna) => {
	let downLines = [];
	for(let i = 0; i < dna.length; i++) {
        let rowString = "";
        for(let j = 0; j < dna[i].length; j++) {
            rowString += dna[j][i];
        } 
    downLines.push(rowString);
    }

    return downLines;
};

//Secuencias Diagonales 
const getDiagonalArray = (dna, isForward = true) => {
	let rightDownLines = [];
    for(let x = 0; x < dna.length; x++) {
        for(let y = 0; y < dna[x].length; y++) {
            let newString = "";
            let [i, j] = [x, y];
            while(i < dna.length && j < dna.length) {
                if(dna[i] && dna[i][j]) {
                    newString += dna[i][j];
                    i++;
                    // Si está recorriendo el arreglo hacia abajo y a la
                    // derecha, entonces sumar 1, al indice de cada
                    // caracter. De lo contrario restarlo.
                    j = isForward ? j + 1 : j - 1;
                } else {
            break;
                }
            }
        rightDownLines.push(newString);
        }  
    }
    return rightDownLines;
}
//Valida la cantidad de secuencias encontradas en la matriz
const countSequences = (dna) => {
	let sequencesFound = 0;
	for(let i = 0; i < dna.length; i++) {
        mutantSequences.forEach(seq => {
            if(dna[i].includes(seq)) {
                sequencesFound++;    
            }
        });
    }

    return sequencesFound;
};


const isMutant = (dna) => {
	let downLines = getDownLinesArray(dna);
    let rightDownLines = getDiagonalArray(dna);
    let leftDownLines = getDiagonalArray(dna, false);

	const acrossSequences = countSequences(dna); 
    const downSequences = countSequences(downLines);
    const rigthDownSequences = countSequences(rightDownLines);
    const leftDownSequences = countSequences(leftDownLines);

    const totalSequences = acrossSequences + downSequences 
    + rigthDownSequences + leftDownSequences;
    return totalSequences > 1; 
}

//Unit Testing

const dnaTests = [
	{
    id: 1,
    dna: [
        "ATGCGA",
        "CAGTGC", 
        "TTATGT", 
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ],
    result: true
    },
    {
    id: 2,
    dna: [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCGGGG"
    ],
        result: true
    },
    {
    id: 3,
    dna: [
        "ATGCGA",
        "CAGTAC", 
        "TTATGT", 
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ],
    result: true
    },
    {
    id: 4,
    dna: [
        "ATGCGA",
        "CAGTGC", 
        "TTATGT", 
        "AGAAGG",
        "CTCCTA",
        "TCACTG"
    ],
    result: true
    },
    {
    id: 5,
    dna: [
        "ATGCGA",
        "CAGTAC", 
        "TTAAGT", 
        "AGAAGG",
        "CTCCTA",
        "TCACTG"
    ],
    result: true
    },
    {
    id: 6,
    dna: [
        "ATGCGA",
        "CAGTAC", 
        "TTATGT", 
        "AGAAGG",
        "CTCCTA",
        "TCACTG"
    ],
    result: false
    },
];

dnaTests.forEach(test => {
    console.log(isMutant(test.dna) === test.result ? `Test ${test.id} PASSED` : `Test ${test.id} FAILED!!!` );
});