import { icapps } from "../../declarations/icapps";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with icapps actor, calling the greet method
  const greeting = await icapps.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
