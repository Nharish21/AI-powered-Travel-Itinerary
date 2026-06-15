document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const msgInput = document.getElementById("contactMessage");
    const btn = document.getElementById("contactBtn");
    const output = document.getElementById("outputMsg");

    btn.addEventListener("click", function () {
        const name = nameInput.value;
        const email = emailInput.value;
        const message = msgInput.value;

        if (name && email && message) {
            output.textContent = `Thank you, ${name}! We received your message.`;
        } else {
            output.textContent = "Please fill all fields.";
        }
    });
});
