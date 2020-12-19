export const notifier = (text, green = false) => {
  document.querySelector("#notify_cont").style = "display: flex;";
  document.querySelector("#notify_text").innerHTML = text;
  if (green) {
    document.querySelector("#notify_text").style =
      "display: flex; background-color: #2ecc71";
  }
};

export const closeNotifier = () => {
  document.querySelector("#notify_cont").style = "display: none;";
};
