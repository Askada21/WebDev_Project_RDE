"use strict";

const carFilters = document.getElementById("car-filters");

if (carFilters) {
  // The existing cards are the source of truth; no fictional cars or locations.
  const cards = Array.from(document.querySelectorAll(".car-card"));
  const make = document.getElementById("car-make");
  const model = document.getElementById("car-model");
  const price = document.getElementById("car-price");
  const results = document.getElementById("car-results");

  function setOptions(select, placeholder, values) {
    select.replaceChildren(new Option(placeholder, ""));
    [...new Set(values)].sort().forEach(value => select.add(new Option(value, value)));
  }

  function updateModels() {
    const previous = model.value;
    const models = cards
      .filter(card => !make.value || card.dataset.make === make.value)
      .map(card => card.dataset.model);
    setOptions(model, "Any model", models);
    if (models.includes(previous)) model.value = previous;
  }

  function filterCars() {
    const range = price.value ? price.value.split("-").map(Number) : null;
    let count = 0;
    cards.forEach(card => {
      const cost = Number(card.dataset.price);
      const matches = (!make.value || card.dataset.make === make.value)
        && (!model.value || card.dataset.model === model.value)
        && (!range || (cost >= range[0] && cost <= range[1]));
      card.hidden = !matches;
      if (matches) count += 1;
    });
    results.textContent = count
      ? `${count} car${count === 1 ? "" : "s"} found.`
      : "No cars match your filters. Try another selection or reset the filters.";
  }

  setOptions(make, "Any make", cards.map(card => card.dataset.make));
  updateModels();
  [make, model, price, ...carFilters.querySelectorAll("button")].forEach(control => {
    control.disabled = false;
  });
  make.addEventListener("change", updateModels);
  carFilters.addEventListener("submit", event => {
    event.preventDefault();
    filterCars();
    const target = cards.find(card => !card.hidden) || results;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "start"
    });
  });
  carFilters.addEventListener("reset", event => {
    event.preventDefault();
    make.value = "";
    model.value = "";
    price.value = "";
    updateModels();
    filterCars();
  });
  filterCars();
}

const contactForm = document.getElementById("ContactForm");

if (contactForm) {
  const fields = Array.from(contactForm.querySelectorAll("input, select, textarea"));
  const status = document.getElementById("contact-status");
  const requiredMessages = {
    fname: "Enter your first name.",
    lname: "Enter your last name.",
    email: "Enter your email address.",
    "query-type": "Select a reason for your inquiry.",
    message: "Enter your query."
  };

  // Handle validation here so whitespace and errors can be checked together.
  contactForm.noValidate = true;
  contactForm.addEventListener("submit", event => {
    // This is a local demo: never navigate, transmit, or claim delivery.
    event.preventDefault();
    let firstInvalid = null;
    fields.forEach(field => {
      field.value = field.value.trim();
      let error = field.value ? "" : requiredMessages[field.id];
      if (!error && !field.checkValidity()) {
        error = field.id === "email" ? "Enter a valid email address." : "Check this value.";
      }
      document.getElementById(`${field.id}-error`).textContent = error;
      if (error) {
        field.setAttribute("aria-invalid", "true");
        firstInvalid ??= field;
      } else {
        field.removeAttribute("aria-invalid");
      }
    });
    status.textContent = firstInvalid
      ? "Please correct the highlighted fields. No message has been sent."
      : "Your details are valid. This demo has no message delivery service; nothing has been sent or saved.";
    if (firstInvalid) firstInvalid.focus();
  });
  fields.forEach(field => {
    field.addEventListener("input", () => {
      field.removeAttribute("aria-invalid");
      document.getElementById(`${field.id}-error`).textContent = "";
      status.textContent = "";
    });
  });
  contactForm.querySelector("button[type='submit']").disabled = false;
}
