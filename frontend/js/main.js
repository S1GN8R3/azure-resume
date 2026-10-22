// Azure resume visitor counter. Public API only; no Function or Cosmos key.
const resumeCounterApi = 'https://tzac-resume-v2-99e0fcaa.azurewebsites.net/api';
window.addEventListener('DOMContentLoaded', getVisitCount);
async function getVisitCount() {
  const element = document.getElementById('counter');
  if (!element) return;
  element.textContent = '…';
  try {
    const response = await fetch(resumeCounterApi + '/RecordResumeVisit', {
      method: 'POST', credentials: 'include', cache: 'no-store'
    });
    if (!response.ok) throw new Error('Visit endpoint HTTP ' + response.status);
    const data = await response.json();
    if (!Number.isSafeInteger(data.count) || data.count < 0) throw new Error('Invalid count');
    element.textContent = String(data.count);
  } catch (error) {
    console.warn('Visitor event unavailable; trying read-only count', error);
    try {
      const response = await fetch(resumeCounterApi + '/GetResumeCount', {cache:'no-store'});
      if (!response.ok) throw new Error('Read endpoint HTTP ' + response.status);
      const data = await response.json();
      if (!Number.isSafeInteger(data.count) || data.count < 0) throw new Error('Invalid count');
      element.textContent = String(data.count);
    } catch (_) { element.textContent = 'N/A'; }
  }
}