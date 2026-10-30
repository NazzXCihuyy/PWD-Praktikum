document.addEventListener('DOMContentLoaded', () => {
    // Persiapkan elemen navigasi scroll dan status tampilannya
    const btnBackToTop = document.getElementById('btnBackToTop');
    const topHeader = document.getElementById('top-header');
    
    // Elemen indikator & progress bar tambahan untuk visualisasi
    const progressBar = document.getElementById('reading-progress-bar');
    const scrollValNav = document.getElementById('scroll-val');
    const statusScrollDepth = document.getElementById('status-scroll-depth');
    const statusBtnState = document.getElementById('status-btn-state');
    const sidebarProgressFill = document.getElementById('sidebar-progress-fill');

    // Pantau posisi scroll dan sinkronkan seluruh indikator
    function handleScroll() {
        // Ambil posisi vertikal secara lintas-browser
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // ======================================================================
        // Kontrol scroll ke atas: tampil setelah melewati 500px
        // ======================================================================
        if (scrollPosition > 500) {
            btnBackToTop.classList.add('show');
            
            // Perbarui keterangan tombol pada sidebar 
            if (statusBtnState) {
                statusBtnState.textContent = 'Visible (Opacity: 65%)';
                statusBtnState.className = 'badge-visible';
            }
        } else {
            btnBackToTop.classList.remove('show');
            
            // Perbarui keterangan tersembunyi pada sidebar 
            if (statusBtnState) {
                statusBtnState.textContent = 'Hidden (< 500px)';
                statusBtnState.className = 'badge-hidden';
            }
        }

        // ======================================================================
        // Tampilkan kedalaman scroll secara real-time
        // ======================================================================
        const roundedScroll = Math.round(scrollPosition);
        if (scrollValNav) scrollValNav.textContent = roundedScroll;
        if (statusScrollDepth) statusScrollDepth.textContent = `${roundedScroll} px`;

        // Kalkulasi persentase pembacaan halaman (0% - 100%)
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            const progressPercent = Math.min(100, Math.max(0, (scrollPosition / docHeight) * 100));
            if (progressBar) progressBar.style.width = `${progressPercent}%`;
            if (sidebarProgressFill) sidebarProgressFill.style.width = `${progressPercent}%`;
        }
    }

    // ==========================================================================
    // Saat diklik, arahkan halaman kembali ke area header
    // ==========================================================================
    btnBackToTop.addEventListener('click', (event) => {
        event.preventDefault();

        // Jalankan perpindahan ke atas dengan animasi halus
        if (topHeader) {
            topHeader.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // Pasang Event Listener 'scroll' pada window
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Panggil satu kali saat pertama kali dibuka untuk sinkronisasi awal
    handleScroll();
});

const projects = [
  {
    title: "Cv",
    category: "Web Design",
    description:
      "A modern visual identity and premium responsive website for a creative startup.",
    image: "img/project1.png",
    link: "https://growlatif-pwd.vercel.app/"
  },
  {
    title: "ISBN App",
    category: "ISBN Validator",
    description:
      "Designed to check if the ISBN Number & check digit on your books valid.",
    image: "img/project2.png",
    link: "https://github.com/NazzXCihuyy/ISBN"
  },
  {
    title: "Prototype Porto",
    category: "Development & Strategy",
    description:
      "This is my prototype porto design before i creates this one.",
    image: "img/project3.png",
    link: "https://growlatif-pwd-2.vercel.app/"
  }
];

const projectList = document.getElementById("project-list");

projects.forEach((project, index) => {
  const card = document.createElement("div");
  card.className = "project-card";

  card.innerHTML = `
   <div class="project-preview">
  <img src="${project.image}" alt="${project.title}">
</div>

    <p class="project-category">${project.category}</p>

    <h4 class="project-title">${project.title}</h4>

    <p class="project-description">
      ${project.description}
    </p>

    <button class="secondary-btn" onclick="window.open('${project.link}','_blank')">View Case Study</button>
  `;

  projectList.appendChild(card);
});


function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .slide-in-left, .bounce-in');
  
  elements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('animate');
    }
  });
}


const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      
      entry.target.classList.add('animate');
    } else {
    
      entry.target.classList.remove('animate');
    }
  });
}, observerOptions);


const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.05)';
    button.style.transition = 'transform 0.2s ease';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
  
  button.addEventListener('click', () => {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);
  });
});


window.addEventListener('load', () => {

  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hide');
    }, 500);
  }
  
  
  document.querySelectorAll('.fade-in, .slide-in-left, .bounce-in').forEach(el => {
    observer.observe(el);
  });
  

  animateOnScroll();
});


window.addEventListener('scroll', animateOnScroll);