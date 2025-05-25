import { useState } from "react";
import QuestionStep from "./components/QuestionStep";
import MovieResult from "./components/MovieResult";
import movies from "./data/movies.json";
import "./styles.css";

const questions = [
  {
    key: "mood",
    question: "Як твій настрій сьогодні?",
    options: ["🤪", "😊","😕"]
  },
  
  {
    key: "genre",
  question: "Який жанр хочеш переглянути?",
  options: [
    "Бойовик", "Пригоди", "Анімація", "Комедія", "Кримінал",
    "Документальний", "Драма", "Сімейний", "Фантастика", "Історичний",
    "Жахи", "Музика", "Мелодрама", "Фантазія", "Трилер",
    "Військовий", "Вестерн", "Телевізійний фільм", "Детектив"
  ]
  },
  {
    key: "length",
    question: "Яка бажана тривалість фільму?",
    options: ["До 90 хв", "90–120 хв", "Понад 2 години"]
  },
  {
    key: "era",
    question: "Фільм має бути старий чи новий?",
    options: ["Класика (до 2000)", "Середній період (2000–2015)", "Сучасний (2015+)"]
  }
];
;

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const handleSelect = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setFinished(false);
  };

  return (
    
<div className="main-panel">  
    
    <div className="container">
      <nav className="navbar">
      <h2>Мій Кіногід</h2>
  <div className="nav-links">
  <a href="https://uakino.me/find/year/2025/f/p.cat=1/sort=rating;desc/" target="_blank" rel="noopener noreferrer">
    ТОП фільмів 2025
  </a>
    <a href="https://www.facebook.com" target="_blank">Facebook</a>
    <a href="https://www.instagram.com" target="_blank">Instagram</a>
    <a href="https://www.youtube.com" target="_blank">YouTube</a>
  </div>
</nav>

      <h1>Що подивитися сьогодні?</h1>

      {!finished ? (
        <QuestionStep stepData={{ ...questions[step], index: step }} onSelect={handleSelect} />

      ) : (
        <MovieResult answers={answers} movies={movies} onRestart={restart} />
      )}
      <footer className="footer">
  <p>Наш сервіс — це швидкий спосіб знайти фільм, який підійде саме вам. Всім знайомо, як буває важко обрати щось на вечір, особливо коли не хочеться витрачати пів години на гортання стрімінгів і ловити рекламу.

Дайте відповідь на кілька простих питань — і фільм буде підібрано під ваш настрій, бажаний жанр та інші вподобання. Ніяких реєстрацій, ніяких платних підписок і лівого контенту.

Усі дані про фільми отримано з бази <a href="https://www.themoviedb.org/" target="_blank">The Movie Database (TMDB)</a>, що є однією з найнадійніших і найповніших баз фільмів у світі.

Сайт створено, щоб економити ваш час і нерви. Мінімум кліків — максимум задоволення. Тут все просто: настрій → вибір → перегляд.

Дивіться якісне та найкраще вже зараз, натиснувши "Почати".</p>
</footer>

    </div>
    </div>
  );
}

export default App;
