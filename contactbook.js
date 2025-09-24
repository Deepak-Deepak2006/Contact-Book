const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function saveContacts() {
localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts() {
  contactList.innerHTML = "";
  contacts.forEach((contact, index) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "contact-info";
    info.innerHTML = `
      <strong>${contact.name}</strong><br>
      ${contact.phone}<br>
      ${contact.email}
    `;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      contacts.splice(index, 1);
      saveContacts();
      renderContacts();
    };

    li.appendChild(info);
    li.appendChild(deleteBtn);
    contactList.appendChild(li);
  });
}

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (name && phone && email) {
    contacts.push({ name, phone, email });
    saveContacts();
    renderContacts();
    contactForm.reset();
  }
});

renderContacts();
