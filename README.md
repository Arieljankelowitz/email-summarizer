# Email Summarizer 📬

This is a Google Apps Script that summarizes your unread Gmail messages from the last 7 days using OpenAI's GPT model and sends a daily summary to your inbox.

## ✨ Features

- Fetch unread Gmail threads from the past week
- Summarize using OpenAI (via `UrlFetchApp`)
- Prioritize tasks and email the summary to yourself

## 🚀 Setup Instructions

1. Clone this project using `clasp` or `git`
2. Set your OpenAI API key in the script project:
   - Open **Apps Script** editor
   - Go to **Project Settings → Script Properties**
   - Add: `OPENAI_API_KEY = your-key-here`

3. (Optional) Set up a time-based trigger to run `summarizeUnreadEmails` daily

## 🔐 Notes

- API keys are **not stored in code** – they go in script properties
- `.clasp.json`, backups, and other sensitive files are listed in `.gitignore`

## 🛠 Tech Used

- Google Apps Script (GmailApp, UrlFetchApp)
- OpenAI GPT-3.5 / GPT-4
- Git and clasp

## 📁 Project Structure


