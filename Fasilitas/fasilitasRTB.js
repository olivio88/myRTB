// JavaScript
const pinjamCws = document.getElementById('pinjam-cws')
const pinjamCuci = document.getElementById('pinjam-cuci')
const pinjamKomunal = document.getElementById('pinjam-komunal')
const pinjamSergun = document.getElementById('pinjam-sergun')
const pinjamDapur = document.getElementById('pinjam-dapur')

document.addEventListener('DOMContentLoaded', ()=>{
  const username = sessionStorage.getItem('username');
  console.log('Username: ' + username);
  if(username && username !== ''){
      // SEND DATA PEMINJAMAN
      pinjamCws.addEventListener('click', ()=>{
          sessionStorage.setItem('natan', "CWS");
          // console.log(sessionStorage)
          window.location.href = 'peminjaman.html';
      })
      pinjamCuci.addEventListener('click', ()=>{
          sessionStorage.setItem('natan', "cuci");
          window.location.href = 'peminjaman.html';
      })
      pinjamSergun.addEventListener('click', ()=>{
          sessionStorage.setItem('natan', "sergun");
          window.location.href = 'peminjaman.html';
      })
      pinjamDapur.addEventListener('click', ()=>{
          sessionStorage.setItem('natan', "dapur");
          window.location.href = 'peminjaman.html';
      })
      pinjamKomunal.addEventListener('click', ()=>{
          sessionStorage.setItem('natan', "komunal");
          window.location.href = 'peminjaman.html';
      })
  } else {
      pinjamCws.addEventListener('click', (event)=>{
          event.stopPropagation();
          confirmRedirection();
      });
      pinjamCuci.addEventListener('click', (event)=>{
          event.stopPropagation();
          confirmRedirection();
      });
      pinjamSergun.addEventListener('click', (event)=>{
          event.stopPropagation();
          confirmRedirection();
      });
      pinjamKomunal.addEventListener('click', (event)=>{
          event.stopPropagation();
          confirmRedirection();
      });
      pinjamDapur.addEventListener('click', (event)=>{
          event.stopPropagation();
          confirmRedirection();
      });
  }
})

function confirmRedirection(){
  if(confirm('Cannot access this page as guest. Do you want to login?')){
      window.location.href = './login.html'
  }
}

// Get the element to animate
const element = document.querySelector(".main-content");

// Define the options for the Intersection Observer
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

// Create a new Intersection Observer
const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    // If element is in viewport, add the 'show' class to trigger the animation
    if (entry.isIntersecting) {
      element.classList.add("show");
    } else {
      element.classList.remove("show");
    }
  });
}, options);

// Start observing the element
observer.observe(element);