document.addEventListener("DOMContentLoaded", () => {
    const chatToggle = document.querySelector(".chat-toggle");
    const chatbot = document.querySelector(".chatbot");
    const closeChat = document.querySelector(".close-chat");
    const chatBody = document.querySelector(".chat-body");
    const chatInput = document.getElementById("chat-input");

    chatToggle.addEventListener("click", () => {
        chatbot.style.display = "flex";
    });

    closeChat.addEventListener("click", () => {
        chatbot.style.display = "none";
    });

    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let userMessage = chatInput.value.trim();
            if (userMessage) {
                addMessage("user", userMessage);
                chatInput.value = "";
                getBotReply(userMessage);
            }
        }
    });

    function addMessage(sender, message) {
        let messageDiv = document.createElement("div");
        messageDiv.classList.add(sender + "-message");
        messageDiv.textContent = message;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function getBotReply(userMessage) {
        addMessage("bot", "Thinking...");
        
        const apiKey = "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";  // Replace with your OpenAI API key
        const url = "https://api.openai.com/v1/chat/completions";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;
        
        document.querySelector(".bot-message:last-child").textContent = botReply;
    }
});