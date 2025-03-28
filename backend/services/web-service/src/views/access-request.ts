export const accessRequestHtml = (apiUrl: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craftify Access</title>
</head>
<body style="
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
">

    <div style="
        background: rgba(255, 255, 255, 0.1);
        padding: 30px;
        border-radius: 12px;
        text-align: center;
        width: 350px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
    ">
        <h2 style="margin-bottom: 10px;">🚀 Welcome to Craftify</h2>
        <p style="opacity: 0.9;">Access your account securely with a magic link.</p>

        <form id="magic-link-form" style="margin-top: 20px;">
            <label for="email" style="display: block; margin-bottom: 5px; font-weight: bold;">📩 Your Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required style="
                width: 100%;
                padding: 10px;
                border: none;
                border-radius: 6px;
                outline: none;
                font-size: 16px;
                margin-bottom: 15px;
            ">

            <button type="submit" style="
                background: #ff7b00;
                color: white;
                border: none;
                padding: 12px;
                font-size: 16px;
                border-radius: 6px;
                width: 100%;
                cursor: pointer;
                transition: 0.3s;
            " onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1">
                ✉️ Send Magic Link
            </button>
        </form>

        <p id="message" style="margin-top: 15px; font-size: 14px;"></p>

        <p style="margin-top: 15px; opacity: 0.8; font-size: 12px;">
            No passwords needed! Just check your email for the login link.
        </p>
    </div>

    <script>
        window.addEventListener("load", (event) => {
            window.history.replaceState(null, '', '/login');
        });

        document.getElementById("magic-link-form").addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const messageEl = document.getElementById("message");

            if (!email) {
                messageEl.innerHTML = "⚠️ Please enter a valid email.";
                messageEl.style.color = "yellow";
                return;
            }

            messageEl.innerHTML = "⏳ Sending magic link...";
            messageEl.style.color = "lightblue";

            fetch("${apiUrl}/api/request-access", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    messageEl.innerHTML = "✅ Magic link sent! Check your email.";
                    messageEl.style.color = "lightgreen";
                } else {
                    messageEl.innerHTML = "⚠️ Something went wrong. Try again.";
                    messageEl.style.color = "red";
                }
            })
            .catch(() => {
                messageEl.innerHTML = "❌ Server error. Please try later.";
                messageEl.style.color = "#FF4500";
            });
        });
    </script>

</body>
</html>`