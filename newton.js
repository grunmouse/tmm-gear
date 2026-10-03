/**
 * Функция высшего порядка для создания обратной функции методом Ньютона-Рафсона.
 * 
 * @param {Function} f - Исходная функция, для которой ищется обратная.
 * @param {Function} df - Производная исходной функции f'(x).
 * @param {number} maxIter - Максимальное количество итераций (по умолчанию 20).
 * @param {number} tol - Точность вычислений (по умолчанию 1e-12).
 * @returns {Function} Функция вида (y, x0) => x, где y - целевое значение, x0 - начальное приближение.
 */
function createInverseNewton(f, df, maxIter = 20, tol = 1e-12) {
    return function(y, x0) {
        let x = x0;

        for (let i = 0; i < maxIter; i++) {
            const fx = f(x) - y; // Ищем корень уравнения f(x) - y = 0
            const dfx = df(x);

            // Защита от деления на ноль, если производная занулилась
            const denominator = Math.abs(dfx) < 1e-15 ? 1e-15 : dfx;
            
            const delta = fx / denominator;
            x -= delta;

            // Если шаг стал ничтожно мал, прекращаем итерации
            if (Math.abs(delta) < tol) {
                return x;
            }
        }

        return x; // Возвращаем лучшее найденное значение
    };
}

// ==========================================
// ПРИМЕР ПРИМЕНЕНИЯ ДЛЯ ОБРАТНОЙ ИНВОЛЮТЫ
// ==========================================

// 1. Задаем прямую функцию инволюты: inv(alpha) = tg(alpha) - alpha
const involute = (alpha) => Math.tan(alpha) - alpha;

// 2. Задаем её производную: inv'(alpha) = tg^2(alpha)
const dInvolute = (alpha) => Math.pow(Math.tan(alpha), 2);

// 3. Создаем обратную функцию высшего порядка
const inverseInvolute = createInverseNewton(involute, dInvolute);

// 4. Тестируем для theta > 1 (возьмем theta = 2.5)
const thetaTarget = 2.5;

// Рассчитываем начальное приближение (первый член ряда Ченга)
const initialGuess = Math.cbrt(3.0 * thetaTarget); 

// Вызываем сгенерированную функцию
const alphaResult = inverseInvolute(thetaTarget, initialGuess);

console.log(`Целевой theta: ${thetaTarget}`);
console.log(`Найденный угол alpha (рад): ${alphaResult}`);
console.log(`Найденный угол alpha (град): ${(alphaResult * 180 / Math.PI).toFixed(4)}°`);
console.log(`Проверка (inv(alpha)): ${involute(alphaResult)}`);
