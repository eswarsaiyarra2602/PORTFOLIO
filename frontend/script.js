
var typed = new Typed('.dynamic-text', {
    strings: ["Eshwar sai Yarra", "Web Developer"],
    typeSpeed: 80, 
    backSpeed: 50, 
    loop: true,
});
AOS.init();


document.getElementById('contactForm').addEventListener('submit', async function (event) {
  event.preventDefault(); 
  const successMessage = document.getElementById('successMessage');
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  try {
      const response = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (response.ok) {
          showSuccessMessage(); 
          this.reset();
      } else {
          alert('Error sending email. Please try again later.');
      }
  } catch (error) {
      alert('Error sending email. Please try again later.');
      console.error(error);
  }
});

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('hidden');
    setTimeout(() => {
        closeSuccessMessage();
    }, 5000); 
}

function closeSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('hidden');
}