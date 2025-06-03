const quizData = [
    {
        question: "Apa itu prinsip 3R dalam pengelolaan sampah?",
        options: [
            "Reduce, Reuse, Recycle",
            "Remove, Replace, Rebuild",
            "Repair, Restore, Renew",
            "Run, Rest, Repeat"
        ],
        correct: 0
    },
    {
        question: "Manakah yang bukan merupakan contoh Reduce?",
        options: [
            "Membawa tas belanja sendiri",
            "Menggunakan botol minum isi ulang",
            "Membuat kerajinan dari sampah",
            "Mengurangi penggunaan plastik sekali pakai"
        ],
        correct: 2
    },
    {
        question: "Cara terbaik menghemat energi di rumah adalah...",
        options: [
            "Mematikan lampu saat tidak digunakan",
            "Menggunakan AC 24 jam",
            "Membiarkan peralatan elektronik standby",
            "Menggunakan lampu pijar"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const optionsHtml = question.options.map((option, index) => `
        <div class="option cursor-pointer p-3 bg-white rounded border hover:bg-gray-50" data-index="${index}">
            ${option}
        </div>
    `).join('');
    
    document.getElementById('options').innerHTML = optionsHtml;
    document.getElementById('result').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');

    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', checkAnswer);
    });
}

function checkAnswer(e) {
    const selectedIndex = parseInt(e.target.dataset.index);
    const question = quizData[currentQuestion];
    
    document.querySelectorAll('.option').forEach(option => {
        option.classList.add('pointer-events-none');
    });

    if (selectedIndex === question.correct) {
        e.target.classList.add('bg-green-100');
        score++;
        document.getElementById('result').textContent = 'Benar!';
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('result').classList.add('text-green-600');
    } else {
        e.target.classList.add('bg-red-100');
        document.getElementById('result').textContent = 'Maaf, jawaban kurang tepat.';
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('result').classList.add('text-red-600');
    }

    if (currentQuestion < quizData.length - 1) {
        document.getElementById('next-btn').classList.remove('hidden');
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    document.getElementById('score').textContent = `Skor Akhir: ${score} dari ${quizData.length}`;
    document.getElementById('score').classList.remove('hidden');
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
});

loadQuestion();
