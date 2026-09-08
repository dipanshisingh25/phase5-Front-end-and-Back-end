const btn = document.getElementById("btn");
const inp = document.querySelector(".inp");
const output = document.querySelector(".output");

btn.addEventListener("click", async () => {

    const input = inp.value;

    if (input === "") {
        alert("Fill the box");
        return;
    }

    output.innerText = "Working...";

    try {
        const response = await fetch("https://phase5-front-end-and-back-end-6.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ input })
        });

        const data = await response.json();

        output.innerText = data.output;

    } catch (error) {
        console.error(error);
        output.innerText = "Something went wrong...";
    }
});