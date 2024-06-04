function calculateCheckDigit(label) {
    const weights = [8, 6, 4, 2, 3, 5, 9, 7];
    let sum = 0;

    for (let i = 0; i < weights.length; i++) {
        sum += parseInt(label.charAt(i)) * weights[i];
    }

    let remainder = sum % 11;
    let checkDigit = 11 - remainder;

    if (checkDigit === 10) {
        checkDigit = 0;
    } else if (checkDigit === 11) {
        checkDigit = 5;
    }

    return checkDigit;
}

function generateLabels() {
    const tipoPostal = document.getElementById('tipoPostal').value;
    const nuEtiquetaInicial = document.getElementById('nuEtiquetaInicial').value;
    const nuEtiquetaFinal = document.getElementById('nuEtiquetaFinal').value;

    const startNumber = parseInt(nuEtiquetaInicial);
    const endNumber = parseInt(nuEtiquetaFinal);
    const labels = [];

    for (let i = startNumber; i <= endNumber; i++) {
        const label = String(i).padStart(8, '0');
        const checkDigit = calculateCheckDigit(label);
        labels.push(`${tipoPostal}${label}${checkDigit}BR`);
    }

    const outputElement = document.getElementById('output');
    outputElement.textContent = labels.join('\n');

    // Exibe o botão de rolar para o topo quando as etiquetas são geradas
    document.getElementById('scrollButton').style.display = 'block';
}

function exportCSV() {
    const tipoPostal = document.getElementById('tipoPostal').value;
    const nuEtiquetaInicial = document.getElementById('nuEtiquetaInicial').value;
    const nuEtiquetaFinal = document.getElementById('nuEtiquetaFinal').value;

    const startNumber = parseInt(nuEtiquetaInicial);
    const endNumber = parseInt(nuEtiquetaFinal);
    const labels = [];

    for (let i = startNumber; i <= endNumber; i++) {
        const label = String(i).padStart(8, '0');
        const checkDigit = calculateCheckDigit(label);
        labels.push(`${tipoPostal}${label}${checkDigit}BR`);
    }

    const csvContent = "data:text/csv;charset=utf-8," + labels.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "etiquetas.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function () {
    const scrollButton = document.getElementById('scrollButton');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
};
