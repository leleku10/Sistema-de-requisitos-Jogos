const performanceRanking = {
    "Intel i3": 1,
    "Intel i5": 2,
    "Intel i7": 3,
    "AMD Ryzen 3": 1,
    "AMD Ryzen 5": 2,
    "AMD Ryzen 7": 3,
    "NVIDIA GTX 750": 1,
    "NVIDIA GTX 1060": 2,
    "NVIDIA GTX 1070": 3,
    // Adicione mais modelos conforme necessário
};

const getPerformanceRank = (component) => {
    return performanceRanking[component] || 0; // Retorna 0 se não houver classificação
};

const compareRequirements = (pcRequirements, gameRequirements) => {
    const result = {
        meetsRequirements: true,
        missingRequirements: []
    };

    // Defina quais chaves são relevantes para a comparação
    const relevantKeys = ['processador', 'memoria', 'armazenamento', 'placaVideo'];

    for (const key of relevantKeys) {
        const requiredValue = gameRequirements[key];
        const pcValue = pcRequirements[key];

        if (!pcValue || getPerformanceRank(pcValue) < getPerformanceRank(requiredValue)) {
            result.meetsRequirements = false;
            result.missingRequirements.push({
                requirement: key,
                required: requiredValue,
                found: pcValue || 'N/A'
            });
        }
    }

    return result;
};

module.exports = { compareRequirements };
