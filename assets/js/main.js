(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  document.addEventListener('DOMContentLoaded', () => {
    let skillsContent = document.querySelector('.skills_content');
    if (skillsContent) {
      new Waypoint({
        element: skillsContent,
        offset: '80%',
        handler: function(direction) {
          let skillsBoxes = document.querySelectorAll('.skills_box');
          skillsBoxes.forEach((box) => {
            box.classList.add('visible');
          });
        }
      });
    }
  });

  /**
   * Projects isotope and filter
   */
  window.addEventListener('load', () => {
    let certificationsContainer = select('.certifications-container');
    if (certificationsContainer) {
      let certificationsIsotope = new Isotope(certificationsContainer, {
        itemSelector: '.certifications-item'
      });

      let certificationsFilters = select('#certifications-flters li', true);

      on('click', '#certifications-flters li', function(e) {
        e.preventDefault();
        certificationsFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        certificationsIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        certificationsIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate certifications lightbox 
   */
  const certificationsLightbox = GLightbox({
    selector: '.certifications-lightbox'
  });

  /**
   * Initiate certifications details lightbox 
   */
  const certificationsDetailsLightbox = GLightbox({
    selector: '.certifications-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * certifications details slider
   */
  new Swiper('.certifications-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Email JS
   */
  const contactForm = document.getElementById('contact-form');
  const contactMessage = document.getElementById('sent-message');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_5wfiny6', 'template_gsx9en1', '#contact-form', 'iR4cVRwdc3xjdn0cT')
      .then(() => {
        contactMessage.textContent = "Your message has been sent. Thank you!"

        setTimeout(() => {
          contactMessage.textContent = ''
        }, 5000)

        contactForm.reset();
      })
  }

  contactForm.addEventListener('submit', sendEmail);



  /**
   * Projects See More Button
   */
  document.addEventListener('DOMContentLoaded', () => {
    const projectsSeeMoreBtn = document.getElementById('projects-see-more-btn');
    const projectsItems = document.querySelectorAll('.projects-item');
    const projectsFollowMessage = document.getElementById('projects-follow-message');
    let visibleProjects = 6;
  
    // Initially display the first 6 projects
    for (let i = 0; i < visibleProjects; i++) {
      if (projectsItems[i]) {
        projectsItems[i].classList.add('visible');
      }
    }
  
    projectsSeeMoreBtn.addEventListener('click', () => {
      const currentVisible = visibleProjects;
      visibleProjects += 3;
  
      for (let i = currentVisible; i < visibleProjects; i++) {
        if (projectsItems[i]) {
          projectsItems[i].classList.add('visible');
        } else {
          projectsSeeMoreBtn.style.display = 'none';
          projectsFollowMessage.innerHTML = `
          <p>You've reached the end of the projects. Follow me on <a href="https://github.com/TharunKumarReddyPolu" target="_blank"><i class='bx bx-link-external'></i> Github</a> for more updates!</p>
        `;
          break;
        }
      }
    });
  });

  /**
   * Blogs See More Button and Filtering
   */
  document.addEventListener('DOMContentLoaded', () => {
    const blogsSeeMoreBtn = document.getElementById('blogs-see-more-btn');
    const blogsFollowMessage = document.getElementById('blogs-follow-message');
    const blogContainer = document.querySelector('.blog-container');
    let visibleBlogs = 3;

    function updateSeeMoreButton(filteredItems) {
      if (filteredItems.length <= 3) {
        blogsSeeMoreBtn.style.display = 'none';
        blogsFollowMessage.innerHTML = '';
      } else {
        const visibleCount = Array.from(filteredItems).filter(item => 
          item.classList.contains('visible')).length;
        
        if (visibleCount >= filteredItems.length) {
          blogsSeeMoreBtn.style.display = 'none';
          blogsFollowMessage.innerHTML = `
            <p>You've reached the end of the blogs. Follow me on <a href="https://medium.com/@TharunKumarReddyPolu" target="_blank"><i class='bx bx-link-external'></i> Medium</a> for more updates!</p>
          `;
        } else {
          blogsSeeMoreBtn.style.display = 'block';
          blogsFollowMessage.innerHTML = '';
        }
      }
    }

    function showInitialBlogs(items) {
      Array.from(items).forEach((item, index) => {
        if (index < visibleBlogs) {
          item.classList.add('visible');
        } else {
          item.classList.remove('visible');
        }
      });
    }

    // Initial setup for "All" filter
    const allBlogItems = document.querySelectorAll('.blog-item');
    showInitialBlogs(allBlogItems);
    updateSeeMoreButton(allBlogItems);

    // Blog filtering
    if (blogContainer) {
      let blogFilters = document.querySelectorAll('#blog-flters li');
      
      blogFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
          e.preventDefault();
          
          blogFilters.forEach(el => {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
          
          let filterValue = this.getAttribute('data-filter');
          let blogItems = document.querySelectorAll('.blog-item');
          
          // Reset visible count when changing filters
          visibleBlogs = 3;
          
          blogItems.forEach(item => {
            // Remove all visibility classes first
            item.classList.remove('visible', 'filter-hide', 'filter-show');
            
            // Show/hide based on filter
            if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
              item.classList.add('filter-show');
            } else {
              item.classList.add('filter-hide');
            }
          });

          // Get filtered items
          const filteredItems = Array.from(blogItems).filter(item => 
            filterValue === '*' || item.classList.contains(filterValue.substring(1))
          );

          // Show initial set of filtered items
          showInitialBlogs(filteredItems);
          
          // Update See More button visibility
          updateSeeMoreButton(filteredItems);
        });
      });
    }

    // See More button click handler
    blogsSeeMoreBtn.addEventListener('click', () => {
      const activeFilter = document.querySelector('#blog-flters li.filter-active');
      const filterValue = activeFilter.getAttribute('data-filter');
      const blogItems = document.querySelectorAll('.blog-item');
      
      // Get currently filtered items
      const filteredItems = Array.from(blogItems).filter(item => 
        filterValue === '*' || item.classList.contains(filterValue.substring(1))
      );

      const currentVisible = visibleBlogs;
      visibleBlogs += 3;

      // Show next set of items
      filteredItems.forEach((item, index) => {
        if (index >= currentVisible && index < visibleBlogs) {
          item.classList.add('visible');
        }
      });

      updateSeeMoreButton(filteredItems);
    });
  });  

  /**
   * Blog isotope and filter
   */
  window.addEventListener('load', () => {
    let blogContainer = document.querySelector('.blog-container');
    if (blogContainer) {
      let blogFilters = document.querySelectorAll('#blog-flters li');
      
      blogFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
          e.preventDefault();
          
          blogFilters.forEach(el => {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
          
          let filterValue = this.getAttribute('data-filter');
          
          let blogItems = document.querySelectorAll('.blog-item');
          blogItems.forEach(item => {
            if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
              item.classList.remove('filter-hide');
              item.classList.add('filter-show');
            } else {
              item.classList.remove('filter-show');
              item.classList.add('filter-hide');
            }
          });
        });
      });
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()