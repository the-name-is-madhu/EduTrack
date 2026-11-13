(() => {
  const session = localStorage.getItem('edutrack_session');
  if (!session) window.location.replace('login.html');
})();
