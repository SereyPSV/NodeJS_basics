document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;

    const newValue = prompt(
      "Введите новое значение",
      event.target.closest("li").firstChild.textContent.trim()
    ) || event.target.closest("li").firstChild.textContent.trim();
    edit(id, newValue).then(() => {
        event.target.closest("li").firstChild.replaceWith(newValue)
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newValue) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ title: newValue }),
  });
}
