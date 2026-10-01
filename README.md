# GREEN-API Chat

Веб-приложение для отправки и получения сообщений WhatsApp через GREEN-API. Реализовано на React + TypeScript с long polling для получения входящих сообщений в реальном времени.

## Live Demo
🔗 [Live Demo](https://твой-проект.vercel.app)

## Функционал
- Отправка текстовых сообщений в WhatsApp
- Получение входящих сообщений в реальном времени (long polling)
- Отображение истории сообщений
- Обработка ошибок при отправке и получении

## Стек
- React 18
- TypeScript
- Vite
- CSS Modules
- GREEN-API (WhatsApp API)

## Инструкция по запуску
1. Клонировать репозиторий:
```bash
git clone https://github.com/albina-sar/green-api-chat.git
```
2. Установить зависимости:
```bash
npm install
```
3. Создать файл .env в корне проекта:
```env
VITE_GREEN_API_ID=твой_id
VITE_GREEN_API_TOKEN=твой_токен
```
Файл `.env` добавлен в `.gitignore` — токен не попадает в репозиторий.

4. Запустить проект:
```bash
npm run dev
```
## Структура проекта
```
src/
├── api/          # функции для работы с GREEN-API
├── UI/           # компоненты интерфейса
├── App.tsx       # главный компонент
└── main.tsx      # точка входа
```

## Как работает получение сообщений

Проект использует **long polling** для получения входящих сообщений:
1. При монтировании `App` запускается `useEffect`.
2. Внутри — бесконечный цикл, который вызывает `receiveNotification`.
3. Если пришло уведомление — проверяется тип (`incomingMessageReceived`).
4. Если это текстовое сообщение — добавляется в чат.
5. Уведомление удаляется через `deleteNotification`.
6. Цикл останавливается при размонтировании компонента (cleanup).

## Автор

Альбина Саркитова
- GitHub: [@albina-sar](https://github.com/albina-sar)
- Email: albina.sarkitova@yandex.ru