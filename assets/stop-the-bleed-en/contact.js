(() => {
  'use strict';
  const email = 'stop@h-core.edu.pl';

  function fallbackCopy() {
    const field = document.createElement('textarea');
    field.value = email;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;top:0;left:-9999px;';
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0, email.length);
    try {
      return document.execCommand('copy');
    } finally {
      field.remove();
    }
  }

  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', async () => {
      const status = document.getElementById(button.getAttribute('aria-describedby'));
      status.textContent = '';
      let copied = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
          copied = true;
        }
      } catch (_) {
        // Older browsers or blocked clipboard access can use the fallback.
      }
      if (!copied) {
        try { copied = fallbackCopy(); } catch (_) { copied = false; }
        button.focus({ preventScroll: true });
      }
      status.textContent = copied
        ? 'Email address copied.'
        : 'Unable to copy automatically. Please select and copy: ' + email;
    });
  });
})();
