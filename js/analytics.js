import { DAFTAR_KELAS, RUBRIK_PENILAIAN } from './rubrik-data.js';

/**
 * Helper function: Calculates the total score for a given class ID based on the rubric.
 * @param {string} classId The ID of the class.
 * @param {object} classScoresData The full classScoresData object from localStorage.
 * @returns {number} The calculated total score (0-100).
 */
function calculateTotalScoreInternal(classId, classScoresData) {
    const classData = classScoresData[classId];
    if (!classData || !classData.scores) {
        return 0;
    }

    let totalWeightedScore = 0;
    let totalPossibleWeightedScore = 0;

    RUBRIK_PENILAIAN.forEach(category => {
        const categoryWeight = category.bobotPersen / 100;
        category.kriteriaList.forEach(criterion => {
            const score = classData.scores[criterion.id] || 0;
            totalWeightedScore += (score / 4) * categoryWeight;
            totalPossibleWeightedScore += (4 / 4) * categoryWeight;
        });
    });

    if (totalPossibleWeightedScore === 0) return 0;
    return (totalWeightedScore / totalPossibleWeightedScore) * 100;
}

/**
 * Generates a summary of all class scores, including calculated total scores and judgment status.
 * @param {object} classScoresData The full classScoresData object from localStorage.
 * @returns {Array<object>} An array of class summary objects, sorted by score (descending).
 */
export function getOverallClassSummary(classScoresData) {
    const summary = DAFTAR_KELAS.map(kelas => {
        const score = calculateTotalScoreInternal(kelas.id, classScoresData);
        const hasBeenJudged = classScoresData[kelas.id] && Object.keys(classScoresData[kelas.id].scores || {}).length > 0;
        return {
            id: kelas.id,
            nama: kelas.nama,
            tingkat: kelas.tingkat,
            waliKelas: kelas.waliKelas,
            zona: kelas.zona,
            score: hasBeenJudged ? parseFloat(score.toFixed(1)) : 0,
            hasBeenJudged: hasBeenJudged
        };
    });
    return summary.sort((a, b) => b.score - a.score);
}

/**
 * Calculates average scores per grade level.
 * @param {object} classScoresData The full classScoresData object.
 * @returns {object} An object where keys are grade levels ('7', '8', '9') and values are their average scores.
 */
export function getAverageScoresPerGrade(classScoresData) {
    const gradeScores = { '7': [], '8': [], '9': [] };
    DAFTAR_KELAS.forEach(kelas => {
        const score = calculateTotalScoreInternal(kelas.id, classScoresData);
        if (score > 0) {
            gradeScores[kelas.tingkat].push(score);
        }
    });

    const averages = {};
    for (const grade in gradeScores) {
        if (gradeScores[grade].length > 0) {
            const sum = gradeScores[grade].reduce((acc, s) => acc + s, 0);
            averages[grade] = parseFloat((sum / gradeScores[grade].length).toFixed(1));
        } else {
            averages[grade] = 0;
        }
    }
    return averages;
}

/**
 * Generates a detailed breakdown of scores for a specific class per criterion.
 * @param {string} classId The ID of the class.
 * @param {object} classScoresData The full classScoresData object.
 * @returns {Array<object>} An array of objects representing criteria scores.
 */
export function getCriterionBreakdownForClass(classId, classScoresData) {
    const classData = classScoresData[classId];
    if (!classData || !classData.scores) {
        return [];
    }

    const breakdown = [];
    RUBRIK_PENILAIAN.forEach(category => {
        category.kriteriaList.forEach(criterion => {
            const score = classData.scores[criterion.id] || 0;
            breakdown.push({
                categoryId: category.id,
                categoryName: category.namaKategori,
                criterionId: criterion.id,
                criterionName: criterion.nama,
                score: score,
                maxScore: 4,
                description: criterion.skala[score] || 'Belum dinilai'
            });
        });
    });
    return breakdown;
}

/**
 * Generates a CSV string of the overall class summary.
 * @param {object} classScoresData The full classScoresData object.
 * @returns {string} The CSV content.
 */
export function exportToCSV(classScoresData) {
    const summary = getOverallClassSummary(classScoresData);

    let csvContent = "Peringkat,Kelas,Tingkat,Wali Kelas,Zona,Skor Akhir,Status Penilaian\n";

    summary.forEach((data, index) => {
        const rank = data.score > 0 ? index + 1 : '-';
        const status = data.hasBeenJudged ? 'Dinilai' : 'Belum Dinilai';
        csvContent += `${rank},"${data.nama}",${data.tingkat},"${data.waliKelas}","${data.zona}",${data.score > 0 ? data.score.toFixed(1) : '-'},"${status}"\n`;
    });

    return csvContent;
}