// Define interface ExamResult
interface ExamResult {
  name: string;
  scores: [string, number][]; // tuple array: [subject, score]
  totalScore: number;
}

const examResult: ExamResult = {
  name: "Alice",
  scores: [
    ["Math", 85],
    ["Science", 92],
    ["History", 78]
  ],
  totalScore: 255
};

// Function to calculate and display average score
function displayAverageScore(result: ExamResult): void {
  const totalSubjects = result.scores.length;
  const totalScore = result.totalScore;
  const averageScore = totalScore / totalSubjects;

  console.log(`Average Score for ${result.name}: ${averageScore.toFixed(2)}`);
  alert(`Average Score for ${result.name}: ${averageScore.toFixed(2)}`);
}

// Display average score
displayAverageScore(examResult);
