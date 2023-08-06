export function setCookie(name, value, days) {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  var expires = "expires=" + expirationDate.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Usage: Set a cookie named "myCookie" with the value "example" that expires in 30 days
setCookie("myCookie", "example", 30);
