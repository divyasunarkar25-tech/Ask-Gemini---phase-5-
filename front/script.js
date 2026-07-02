const space = document.getElementById("space");
const input = document.querySelector("input");
const button = document.getElementById("send");

// 🎯 Send message function
async function sendMessage() { 
    
    const text = input.value.trim(); // ✅ remove extra spaces

    if (text === "") {
        alert("Ask something!");
        return;
    }

    // ================= USER MESSAGE =================
    const userMsg = document.createElement("div");
    userMsg.classList.add("user-message");
    userMsg.innerText = text;
    space.appendChild(userMsg);

    // auto scroll to bottom
    space.scrollTop = space.scrollHeight;

    // clear input
    input.value = "";

    // ================= LOADING MESSAGE =================
    const loading = document.createElement("div");
    loading.classList.add("ai-message");
    loading.innerText = "Thinking...";
    space.appendChild(loading);

    space.scrollTop = space.scrollHeight;

    try {
        // ================= API CALL =================
        const response = await fetch("http://localhost:5000/api/gemini/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: text
            })
        });

        const data = await response.json();
        
        // remove loading
        loading.remove();
        
        
        // ================= AI MESSAGE =================
        const aiMsg = document.createElement("div");
        aiMsg.classList.add("ai-message");
        aiMsg.innerHTML = marked.parse(data.answer || "No response received!");
        space.appendChild(aiMsg);

        space.scrollTop = space.scrollHeight;

    } catch (error) {
        console.log(error);

        loading.remove();

        const errorMsg = document.createElement("div");
        errorMsg.classList.add("ai-message");
        errorMsg.innerText = "⚠️ Error: Unable to connect to server.";
        space.appendChild(errorMsg);
    }
}

// ================= CLICK EVENT =================
button.addEventListener("click", sendMessage);

// ================= ENTER KEY SUPPORT =================
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});