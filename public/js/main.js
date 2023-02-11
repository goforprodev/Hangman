// UI - Sign in
let sigUsername = document.getElementById("signin_email");
let sigPassword = document.getElementById("signin_password");
let sigForm = document.querySelector("#signin_form");
// let sigSubmit = document.querySelector("signin_submit")

// eventlistener
sigForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = sigUsername.value.split("@")[0];
  if (sigUsername.value && sigPassword.value) {
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password: sigPassword.value,
      }),
    }).then(async (res) => {
      await res.json().then((res) => {
        console.log(res);
      });
    });
  }
});
