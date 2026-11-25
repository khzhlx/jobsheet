
    const btnToggle = document.getElementById('themeToggleBtn');
    const body = document.body;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
      body.classList.add('dark-theme');
      btnToggle.textContent = "Switch to Light Mode";
    }

    btnToggle.addEventListener('click', () => {
      body.classList.toggle('dark-theme');

      if (body.classList.contains('dark-theme')) {
        btnToggle.textContent = "Switch to Light Mode";
      } else {
        btnToggle.textContent = "Switch to Dark Mode";
      }
    });
  