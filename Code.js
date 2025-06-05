function summarizeUnreadEmails() {
  var emails = getUnreadEmails();
  var emailContent = formatEmailPrompt(emails);
  
  console.log(`Email content to be summarized:\n\n${emailContent}`);

  var summary = summarizeUsingOpenAI(emailContent);
  
  console.log(`AI-generated summary:\n\n${summary}`);

  sendSummaryToSelf(summary);
}

function getUnreadEmails() {
  var messages = [];
  var unreadThreads = GmailApp.search("is:unread newer_than:7d", 0, 10); // Fetch first 10 unread threads

  for (var i = 0; i < unreadThreads.length; i++) {
    var threadMessages = unreadThreads[i].getMessages();

    for (var j = 0; j < threadMessages.length; j++) {
      var message = threadMessages[j];

      if (message.isUnread()) {
        var emailData = {
          subject: message.getSubject(),
          body: message.getPlainBody().substring(0, 500)
        };
        messages.push(emailData);
      }
    }
  }
  return messages;
}
function formatEmailPrompt(messages) {
  var emailString = "";
  for (var i = 0; i < messages.length; i++) {
    emailString += "Subject: " + messages[i].subject + "\n";
    emailString += "Body: " + messages[i].body + "\n\n";
  }
  return emailString;
}

function sendSummaryToSelf(summary) {
  var recipient = Session.getActiveUser().getEmail(); // Get your Google account email
  var subject = "Daily Email Summary";
  var body = "Here is your summary of unread emails from the last 7 days:\n\n" + summary;

  GmailApp.sendEmail(recipient, subject, body);
}

function summarizeUsingOpenAI(emailContent) {
  var apiKey = PropertiesService.getScriptProperties().getProperty("OPENAI_API_KEY");

  var url = "https://api.openai.com/v1/chat/completions"; // Use the correct endpoint for chat models

  var prompt = "Summarize the following emails and provide a task priority list for the day:\n\n" + emailContent;

  var options = {
    method: "POST",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer " + apiKey
    },
    payload: JSON.stringify({
      model: "gpt-3.5-turbo", // Use GPT-4 if available
      messages: [
        {
          role: "system",
          content: "You are an assistant that summarizes emails and organizes tasks."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 200, // Adjust as needed
      temperature: 0.7
    })
  };

  var response = UrlFetchApp.fetch(url, options);
  var json = JSON.parse(response.getContentText());

  return json.choices[0].message.content.trim();
}
