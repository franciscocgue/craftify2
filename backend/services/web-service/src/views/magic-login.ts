export const magicLoginDummyHtml = () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Logging in...</title>
        <script>
            document.addEventListener("DOMContentLoaded", async function () {
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get("token");

                if (!token) {
                    console.error("No token found in URL.");
                    window.location.href = "/login"; // Redirect to login page if no token
                    return;
                }

                try {
                    const response = await fetch("/api/magic-login/"+token, {
                        method: "GET",
                        credentials: "include" // Ensures cookies are sent & received
                    });

                    const data = await response.json();

                    if (data.success) {
                        window.location.href = "/"; // Redirect to home page after login
                    } else {
                        alert("Invalid or expired magic link.");
                        window.location.href = "/login";
                    }
                } catch (error) {
                    console.error("Error during magic login:", error);
                    window.location.href = "/login";
                }
            });
        </script>
    </head>
    <body>
        <h1>Logging in...</h1>
    </body>
    </html>
`