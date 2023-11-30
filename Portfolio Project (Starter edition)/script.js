let contactButton = document.getElementById("contact-me-button");
let firstHiddenDiv = document.getElementById("first-to-hide");
let secondHiddenDiv = document.getElementById("second-to-hide");

firstHiddenDiv.style.visibility = "hidden";
secondHiddenDiv.style.visibility = "hidden";

contactButton.addEventListener("click", () => {
  firstHiddenDiv.style.visibility = "visible";
  secondHiddenDiv.style.visibility = "visible";
});
