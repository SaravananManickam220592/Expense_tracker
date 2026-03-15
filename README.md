# Expense Tracker

Offline-first mobile expense tracker built with React Native, Expo, SQLite, React Navigation, hooks, and Context API.

## Setup

1. Install dependencies with `npm install`
2. Start the app with `npm run start`
3. Run on a device or emulator from the Expo CLI

## Folder structure

- `App.tsx`: app entry point that wires providers, gesture handling, and navigation.
- `src/components`: reusable UI building blocks such as forms, cards, empty states, charts, and buttons.
- `src/context/ExpenseContext.tsx`: central Context API store and reusable `useExpenseTracker` hook.
- `src/database/sqlite.ts`: SQLite schema creation, seed data, and reusable CRUD functions.
- `src/navigation/AppNavigator.tsx`: stack navigation setup for dashboard, CRUD, and reports screens.
- `src/screens`: top-level screens for dashboard, expenses, categories, reports, and edit flows.
- `src/services/categoryService.ts`: category CRUD service wrapper used by the context layer.
- `src/services/expenseService.ts`: expense CRUD service wrapper used by the context layer.
- `src/services/reportService.ts`: reporting helpers for dashboard and analytics views.
- `src/utils/date.ts`: month and week grouping utilities for summaries and charts.
- `src/utils/format.ts`: shared currency and date formatting helpers.
- `src/utils/types.ts`: shared TypeScript models for categories, expenses, filters, and summaries.

## Features included

- Full SQLite-backed CRUD for expenses and categories
- Dashboard with monthly total, recent expenses, top categories, and quick add
- Filters for category, title search, and date range
- Reports with monthly summary, category totals, weekly spending, and simple chart bars
- Local seed data for first launch
- Delete confirmation and empty state handling

## SQLite API

The main database module exports these reusable functions:

- `initDatabase()`
- `insertExpense()`
- `updateExpense()`
- `deleteExpense()`
- `getExpenses()`
- `insertCategory()`
- `updateCategory()`
- `deleteCategory()`
- `getCategories()`

## Play Store build

This project is configured for Expo EAS Android builds.

1. Sign in to Expo: `npx eas login`
2. Initialize EAS for the project if needed: `npx eas init`
3. Replace `REPLACE_WITH_EAS_PROJECT_ID` in `app.json` with the real EAS project id after init
4. Change `android.package` in `app.json` to a unique package id you own before publishing
5. Build a release AAB: `npm run build:android:production`
6. Submit to Google Play: `npm run submit:android`

Notes:

- Google Play requires a unique Android package name and a Play Console account.
- Increment `android.versionCode` for every new Play Store upload.
- Add your own production app icon and splash assets before release.
- The production build profile outputs an Android App Bundle (`.aab`), which is the expected Play Store format.
