// app.js или script.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((reg) => {
            console.log('Service Worker зарегистрирован успешно');
        })
        .catch((error) => {
            console.error('Ошибка регистрации Service Worker:', error);
        });
} else {
    console.log('Service Worker не поддерживается в этом браузере');
}