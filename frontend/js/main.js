// frontend/js/main.js

// 1️⃣ Replace this with your actual Function URL:
const functionApi = "https://tsazureresumefunc.azurewebsites.net/api/getresumecounter?code=k85Aa-eDEn0eGgBOIEKg-p2lHO3O8IQEqHzJ-Mwr_CjrAzFu1biK6Q%3D%3D";

window.addEventListener('DOMContentLoaded', () => {
  getVisitCount();
});

function getVisitCount() {
  // (optional) show a loader or default
  let count = '…';
  document.getElementById('counter').innerText = count;

  fetch(functionApi, {
    method: 'POST'
  })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();         // if your function returns JSON like { count: 123 }
      // return response.text();      // alternatively, if it returns plain text
    })
    .then(data => {
      console.log('Function returned:', data);
      // if JSON:  
      count = data.count;
      // if text:  
      // count = data;
      document.getElementById('counter').innerText = count;
    })
    .catch(err => {
      console.error('Visitor counter error:', err);
      document.getElementById('counter').innerText = '—';
    });
}
