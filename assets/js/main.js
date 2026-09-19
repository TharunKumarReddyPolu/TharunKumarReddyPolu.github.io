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
  const setMobileNavOpen = (open) => {
    const body = select('body')
    const toggle = select('.mobile-nav-toggle')
    const icon = toggle ? toggle.querySelector('i') : null
    if (!body || !toggle) return

    body.classList.toggle('mobile-nav-active', open)
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    if (icon) {
      icon.classList.toggle('bi-list', !open)
      icon.classList.toggle('bi-x', open)
    }
  }

  on('click', '.mobile-nav-toggle', function() {
    const isOpen = select('body').classList.contains('mobile-nav-active')
    setMobileNavOpen(!isOpen)
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        setMobileNavOpen(false)
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
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (typed && !prefersReducedMotion) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  } else if (typed && prefersReducedMotion) {
    const items = (typed.getAttribute('data-typed-items') || '').split(',')
    typed.textContent = items[0] ? items[0].trim() : typed.textContent
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
   * Certifications: render cards + category pills from
   * assets/js/certifications-data.js. GLightbox for these cards is created
   * at parse time (before DOMContentLoaded), so we reload it here to pick up
   * the generated links.
   */
  document.addEventListener('DOMContentLoaded', () => {
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
    const grid = document.getElementById('certifications-grid');
    const flters = document.getElementById('certifications-flters');
    if (flters && typeof CERT_TAGS !== 'undefined') {
      flters.innerHTML =
        '<li>Tags: </li>' +
        '<li data-filter="*" class="filter-active">All</li>' +
        CERT_TAGS.map((tag) =>
          `<li data-filter=".filter-${esc(tag.slug)}">${esc(tag.label)}</li>`
        ).join('');
    }
    if (!grid || typeof CERTIFICATIONS === 'undefined') return;

    const validSlugs = typeof CERT_TAGS !== 'undefined' ? CERT_TAGS.map((t) => t.slug) : [];
    grid.innerHTML = CERTIFICATIONS.map((cert) => {
      const tags = Array.isArray(cert.tags) ? cert.tags.filter((t) => {
        if (validSlugs.length && !validSlugs.includes(t)) {
          console.warn(`Certification "${cert.title}" has unknown tag "${t}" — add it to CERT_TAGS.`);
          return false;
        }
        return true;
      }) : [];
      const title = esc(cert.title);
      const tagClasses = tags.map((t) => `filter-${esc(t)}`).join(' ');
      const credLink = cert.url && cert.url !== '#'
        ? `\n                  <a target="_blank" rel="noopener noreferrer" href="${esc(cert.url)}" data-glightbox="type: external" title="certifications Details"><i class="bx bx-link"></i></a>`
        : '';
      return `
          <div class="col-lg-4 col-md-6 certifications-item ${tagClasses}">
            <div class="certifications-wrap">
              <img loading="lazy" src="${esc(cert.img)}" class="img-fluid" alt="${title} certificate">
              <div class="certifications-info">
                <h4>${title}</h4>
                <p>${esc(cert.issuer || '')}</p>
                <div class="certifications-links">
                  <a href="${esc(cert.img)}" data-gallery="certificationsGallery"
                    class="certifications-lightbox" title="Zoom in"><i class='bx bx-zoom-in'></i></a>${credLink}
                </div>
              </div>
            </div>
          </div>`;
    }).join('');

    if (typeof certificationsLightbox !== 'undefined' && certificationsLightbox.reload) {
      try { certificationsLightbox.reload(); } catch (e) { /* noop */ }
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
   * Testimonials slides — generated synchronously here (NOT on
   * DOMContentLoaded like the other sections) because the Swiper init
   * directly below runs at parse time and needs slides to already exist.
   * Data comes from two files:
   *   - MENTEE_TESTIMONIALS (assets/js/peer-mentorship-data.js) → the
   *     "What Mentees Say" slider in the Peer Mentorship (#facts) section
   *   - TESTIMONIALS (assets/js/testimonials-data.js) → the slider in the
   *     main Testimonials (#testimonials) section
   */
  (function renderTestimonials() {
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
    const slide = (t) => `
            <div class="swiper-slide">
              <div class="testimonial-item">
                <img loading="lazy" src="${esc(t.img)}" class="testimonial-img" alt="">
                <h3>${esc(t.name)}</h3>
                <h4>${esc(t.role)}</h4>
                <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  ${esc(t.quote)}
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                </p>
              </div>
            </div><!-- End testimonial item -->`;
    const mount = (wrapperEl, data, label) => {
      if (!wrapperEl) return;
      if (!Array.isArray(data)) {
        console.warn(`${label} is missing or not an array — check assets/js/testimonials-data.js.`);
        return;
      }
      wrapperEl.innerHTML = data.map(slide).join('');
    };
    document.querySelectorAll('.testimonials-slider .swiper-wrapper').forEach((wrapper) => {
      // The slider inside the main #testimonials section uses TESTIMONIALS;
      // the other one ("What Mentees Say" in the Topmate section) uses MENTEE_TESTIMONIALS.
      const isMain = !!wrapper.closest('#testimonials');
      mount(wrapper, isMain ? TESTIMONIALS : MENTEE_TESTIMONIALS,
        isMain ? 'TESTIMONIALS' : 'MENTEE_TESTIMONIALS');
    });
  })();

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
  const contactForm = document.getElementById('contact-form')
  if (contactForm) {
    const loadingEl = contactForm.querySelector('.loading')
    const errorEl = contactForm.querySelector('.error-message')
    const sentEl = contactForm.querySelector('.sent-message')
    const submitBtn = contactForm.querySelector('button[type="submit"]')

    const resetFormStatus = () => {
      if (loadingEl) loadingEl.classList.remove('d-block')
      if (errorEl) {
        errorEl.classList.remove('d-block')
        errorEl.textContent = ''
      }
      if (sentEl) {
        sentEl.classList.remove('d-block')
        sentEl.textContent = ''
      }
      if (submitBtn) {
        submitBtn.disabled = false
        submitBtn.removeAttribute('aria-busy')
      }
    }

    const sendEmail = (e) => {
      e.preventDefault()
      resetFormStatus()

      if (loadingEl) loadingEl.classList.add('d-block')
      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.setAttribute('aria-busy', 'true')
      }

      emailjs.sendForm('service_5wfiny6', 'template_gsx9en1', '#contact-form', 'iR4cVRwdc3xjdn0cT')
        .then(() => {
          if (loadingEl) loadingEl.classList.remove('d-block')
          if (sentEl) {
            sentEl.textContent = 'Your message has been sent. Thank you!'
            sentEl.classList.add('d-block')
          }
          if (submitBtn) {
            submitBtn.disabled = false
            submitBtn.removeAttribute('aria-busy')
          }
          contactForm.reset()
          setTimeout(() => {
            if (sentEl) {
              sentEl.classList.remove('d-block')
              sentEl.textContent = ''
            }
          }, 5000)
        })
        .catch(() => {
          if (loadingEl) loadingEl.classList.remove('d-block')
          if (errorEl) {
            errorEl.textContent = 'Sorry, something went wrong. Please try again or email me directly.'
            errorEl.classList.add('d-block')
          }
          if (submitBtn) {
            submitBtn.disabled = false
            submitBtn.removeAttribute('aria-busy')
          }
        })
    }

    contactForm.addEventListener('submit', sendEmail)
  }



  /**
   * Projects: render cards + filter pills from assets/js/projects-data.js.
   * Registered before the filter/See-More init below so the cards exist
   * by the time those listeners query the DOM.
   */
  document.addEventListener('DOMContentLoaded', () => {
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
    const grid = document.getElementById('projects-grid');
    const flters = document.getElementById('projects-flters');
    if (flters && typeof PROJECT_TAGS !== 'undefined') {
      flters.innerHTML =
        '<li>Tags: </li>' +
        '<li data-filter="*" class="filter-active">All</li>' +
        PROJECT_TAGS.map((tag) =>
          `<li data-filter=".filter-${esc(tag.slug)}">${esc(tag.label)}</li>`
        ).join('');
    }
    if (!grid || typeof PROJECTS === 'undefined') return;

    const validSlugs = typeof PROJECT_TAGS !== 'undefined' ? PROJECT_TAGS.map((t) => t.slug) : [];
    grid.innerHTML = PROJECTS.map((project) => {
      const tags = Array.isArray(project.tags) ? project.tags.filter((t) => {
        if (validSlugs.length && !validSlugs.includes(t)) {
          console.warn(`Project "${project.title}" has unknown tag "${t}" — add it to PROJECT_TAGS.`);
          return false;
        }
        return true;
      }) : [];
      const title = esc(project.title);
      const tagClasses = tags.map((t) => `filter-${esc(t)}`).join(' ');
      const linksHtml = (project.links || []).map((link) =>
        `<a target="_blank" rel="noopener noreferrer" href="${esc(link.url)}" class="projects-details-lightbox" data-glightbox="type: external" title="${esc(link.title || '')}"><i class='bx ${esc(link.icon)}'></i></a>`
      ).join('\n                  ');
      return `
          <div class="col-lg-4 col-md-6 projects-item ${tagClasses}">
            <div class="projects-wrap">
              <img loading="lazy" src="${esc(project.cover)}" class="img-fluid" alt="${title} project thumbnail">
              <div class="projects-info">
                <h4>${title}</h4>
                <div class="projects-links">
                  ${linksHtml}
                </div>
              </div>
            </div>
          </div>`;
    }).join('');
  });

  /**
   * Blogs: render cards + filter pills from assets/js/blogs-data.js.
   */
  document.addEventListener('DOMContentLoaded', () => {
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
    const grid = document.getElementById('blogs-grid');
    const flters = document.getElementById('blog-flters');
    if (flters && typeof BLOG_TAGS !== 'undefined') {
      flters.innerHTML =
        '<li>Tags: </li>' +
        '<li data-filter="*" class="filter-active">All</li>' +
        BLOG_TAGS.map((tag) =>
          `<li data-filter=".filter-${esc(tag.slug)}">${esc(tag.label)}</li>`
        ).join('');
    }
    if (!grid || typeof BLOGS === 'undefined') return;

    const validSlugs = typeof BLOG_TAGS !== 'undefined' ? BLOG_TAGS.map((t) => t.slug) : [];
    grid.innerHTML = BLOGS.map((post) => {
      const tags = Array.isArray(post.tags) ? post.tags.filter((t) => {
        if (validSlugs.length && !validSlugs.includes(t)) {
          console.warn(`Blog post "${post.title}" has unknown tag "${t}" — add it to BLOG_TAGS.`);
          return false;
        }
        return true;
      }) : [];
      const title = esc(post.title);
      const url = esc(post.url || '#');
      const tagClasses = tags.map((t) => `filter-${esc(t)}`).join(' ');
      return `
            <div class="col-lg-4 col-md-6 blog-item ${tagClasses}">
              <div class="blog-info">
                <a target="_blank" rel="noopener noreferrer" href="${url}">
                  <img src="${esc(post.cover)}" class="img-responsive" alt="${title} blog cover image">
                </a>
                <div class="blog-txt">
                  <h4>${title}</h4>
                  <p class="separator">${esc(post.blurb || '')}</p>
                </div>
                <div class="read-more-btn-container">
                  <a target="_blank" rel="noopener noreferrer" href="${url}">
                    <button class="blogs-read-more-btn btn btn-primary btn-outlined"> Read More <i class='bx bx-link-external'></i></button>
                  </a>
                </div>
              </div>
            </div>`;
    }).join('');
  });

  /**
   * Projects See More Button and Filtering
   */
  document.addEventListener('DOMContentLoaded', () => {
    const INITIAL_PROJECTS = 6;
    const PROJECTS_STEP = 3;
    const projectsSeeMoreBtn = document.getElementById('projects-see-more-btn');
    const projectsFollowMessage = document.getElementById('projects-follow-message');
    const projectsContainer = document.querySelector('.projects-container');
    let visibleProjects = INITIAL_PROJECTS;

    function updateProjectsSeeMoreButton(filteredItems) {
      if (filteredItems.length === 0) {
        projectsSeeMoreBtn.style.display = 'none';
        projectsFollowMessage.innerHTML = '<p>No projects in this category yet — more coming soon!</p>';
      } else if (filteredItems.length <= INITIAL_PROJECTS) {
        projectsSeeMoreBtn.style.display = 'none';
        projectsFollowMessage.innerHTML = '';
      } else {
        const visibleCount = Array.from(filteredItems).filter(item =>
          item.classList.contains('visible')).length;

        if (visibleCount >= filteredItems.length) {
          projectsSeeMoreBtn.style.display = 'none';
          projectsFollowMessage.innerHTML = `
            <p>You've reached the end of the projects. Follow me on <a href="https://github.com/TharunKumarReddyPolu" target="_blank"><i class='bx bx-link-external'></i> Github</a> for more updates!</p>
          `;
        } else {
          projectsSeeMoreBtn.style.display = 'block';
          projectsFollowMessage.innerHTML = '';
        }
      }
    }

    function showInitialProjects(items) {
      Array.from(items).forEach((item, index) => {
        if (index < visibleProjects) {
          item.classList.add('visible');
        } else {
          item.classList.remove('visible');
        }
      });
    }

    const allProjectItems = document.querySelectorAll('.projects-item');
    showInitialProjects(allProjectItems);
    updateProjectsSeeMoreButton(allProjectItems);

    if (projectsContainer) {
      let projectsFilters = document.querySelectorAll('#projects-flters li');

      projectsFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
          e.preventDefault();

          projectsFilters.forEach(el => {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          let filterValue = this.getAttribute('data-filter');
          let projectsItems = document.querySelectorAll('.projects-item');

          visibleProjects = INITIAL_PROJECTS;

          projectsItems.forEach(item => {
            item.classList.remove('visible', 'filter-hide', 'filter-show');

            if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
              item.classList.add('filter-show');
            } else {
              item.classList.add('filter-hide');
            }
          });

          const filteredItems = Array.from(projectsItems).filter(item =>
            filterValue === '*' || item.classList.contains(filterValue.substring(1))
          );

          showInitialProjects(filteredItems);
          updateProjectsSeeMoreButton(filteredItems);
        });
      });
    }

    if (projectsSeeMoreBtn) projectsSeeMoreBtn.addEventListener('click', () => {
      const activeFilter = document.querySelector('#projects-flters li.filter-active');
      const filterValue = activeFilter.getAttribute('data-filter');
      const projectsItems = document.querySelectorAll('.projects-item');

      const filteredItems = Array.from(projectsItems).filter(item =>
        filterValue === '*' || item.classList.contains(filterValue.substring(1))
      );

      const currentVisible = visibleProjects;
      visibleProjects += PROJECTS_STEP;

      filteredItems.forEach((item, index) => {
        if (index >= currentVisible && index < visibleProjects) {
          item.classList.add('visible');
        }
      });

      updateProjectsSeeMoreButton(filteredItems);
    });
  });

  /**
   * Blogs See More Button and Filtering
   */
  document.addEventListener('DOMContentLoaded', () => {
    const INITIAL_BLOGS = 3;
    const BLOGS_STEP = 3;
    const blogsSeeMoreBtn = document.getElementById('blogs-see-more-btn');
    const blogsFollowMessage = document.getElementById('blogs-follow-message');
    const blogContainer = document.querySelector('.blog-container');
    let visibleBlogs = INITIAL_BLOGS;

    function updateSeeMoreButton(filteredItems) {
      if (!blogsSeeMoreBtn || !blogsFollowMessage) return;
      if (filteredItems.length === 0) {
        blogsSeeMoreBtn.style.display = 'none';
        blogsFollowMessage.innerHTML = '<p>No posts in this tag yet — more coming soon!</p>';
      } else if (filteredItems.length <= INITIAL_BLOGS) {
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
    if (blogsSeeMoreBtn) blogsSeeMoreBtn.addEventListener('click', () => {
      const activeFilter = document.querySelector('#blog-flters li.filter-active');
      const filterValue = activeFilter.getAttribute('data-filter');
      const blogItems = document.querySelectorAll('.blog-item');
      
      // Get currently filtered items
      const filteredItems = Array.from(blogItems).filter(item => 
        filterValue === '*' || item.classList.contains(filterValue.substring(1))
      );

      const currentVisible = visibleBlogs;
      visibleBlogs += BLOGS_STEP;

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
   * Books: render cards from assets/js/books-data.js (BOOKS array).
   * Registered before the filter/See-More init below so the cards exist
   * by the time those listeners query the DOM.
   */
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof BOOKS === 'undefined') {
      console.warn('books-data.js missing or BOOKS not defined — bookshelf will be empty.');
      return;
    }
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
    const grid = document.getElementById('books-grid');
    const booksFlters = document.getElementById('books-flters');

    // Tag pills from BOOK_TAGS (All first, then one pill per tag).
    if (booksFlters && typeof BOOK_TAGS !== 'undefined') {
      booksFlters.innerHTML =
        '<li>Tags: </li>' +
        '<li data-filter="*" class="filter-active">All</li>' +
        BOOK_TAGS.map((tag) =>
          `<li data-filter=".filter-${esc(tag.slug)}">${esc(tag.label)}</li>`
        ).join('');
    }

    if (!grid) return;

    const validSlugs = typeof BOOK_TAGS !== 'undefined' ? BOOK_TAGS.map((t) => t.slug) : [];
    grid.innerHTML = BOOKS.map((book) => {
      const tags = Array.isArray(book.tags) ? book.tags.filter((t) => {
        if (validSlugs.length && !validSlugs.includes(t)) {
          console.warn(`Book "${book.title}" has unknown tag "${t}" — add it to BOOK_TAGS.`);
          return false;
        }
        return true;
      }) : [];
      if (!tags.length) {
        console.warn(`Book "${book.title}" has no valid tags — it will only show under All.`);
      }
      const link = esc(book.goodreads || '#');
      const title = esc(book.title);
      const tagClasses = tags.map((t) => `filter-${esc(t)}`).join(' ');
      // Local cover is primary; if the file is missing, onerror swaps in the
      // remote fallback (e.g. Open Library) before the retry ladder takes over.
      const onerror = book.coverFallback
        ? ` onerror="this.onerror=null;this.src='${esc(book.coverFallback)}';" data-cover-fallback="${esc(book.coverFallback)}"`
        : '';
      return `
          <div class="col-lg-4 col-md-6 books-item ${tagClasses}">
            <div class="books-wrap">
              <div class="books-cover">
                <img loading="lazy" src="${esc(book.cover)}"${onerror} class="img-fluid" alt="${title} book cover">
                <div class="books-info">
                  <h4>${title}</h4>
                  <div class="books-links">
                    <a target="_blank" rel="noopener noreferrer" href="${link}" title="View on Goodreads"><i class='bx bx-book-open'></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    }).join('');
  });

  /**
   * Books See More Button and Filtering
   */
  document.addEventListener('DOMContentLoaded', () => {
    const INITIAL_BOOKS = 6;
    const BOOKS_STEP = 3;
    const booksSeeMoreBtn = document.getElementById('books-see-more-btn');
    const booksFollowMessage = document.getElementById('books-follow-message');
    const booksContainer = document.querySelector('.books-container');
    let visibleBooks = INITIAL_BOOKS;

    function updateBooksSeeMoreButton(filteredItems) {
      if (!booksSeeMoreBtn) return;
      if (filteredItems.length === 0) {
        booksSeeMoreBtn.style.display = 'none';
        if (booksFollowMessage) {
          booksFollowMessage.innerHTML = `
            <p>No books in this tag yet — more coming soon!</p>
          `;
        }
      } else if (filteredItems.length <= INITIAL_BOOKS) {
        booksSeeMoreBtn.style.display = 'none';
        if (booksFollowMessage) booksFollowMessage.innerHTML = '';
      } else {
        const visibleCount = Array.from(filteredItems).filter(item =>
          item.classList.contains('visible')).length;

        if (visibleCount >= filteredItems.length) {
          booksSeeMoreBtn.style.display = 'none';
          if (booksFollowMessage) {
            booksFollowMessage.innerHTML = `
              <p>You've reached the end of the bookshelf. More books coming soon!</p>
            `;
          }
        } else {
          booksSeeMoreBtn.style.display = 'block';
          if (booksFollowMessage) booksFollowMessage.innerHTML = '';
        }
      }
    }

    function showInitialBooks(items) {
      Array.from(items).forEach((item, index) => {
        if (index < visibleBooks) {
          item.classList.add('visible');
        } else {
          item.classList.remove('visible');
        }
      });
    }

    const allBookItems = document.querySelectorAll('.books-item');
    showInitialBooks(allBookItems);
    updateBooksSeeMoreButton(allBookItems);

    if (booksContainer) {
      let booksFilters = document.querySelectorAll('#books-flters li');

      booksFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
          e.preventDefault();

          booksFilters.forEach(el => {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          let filterValue = this.getAttribute('data-filter');
          let bookItems = document.querySelectorAll('.books-item');

          visibleBooks = INITIAL_BOOKS;

          bookItems.forEach(item => {
            item.classList.remove('visible', 'filter-hide', 'filter-show');

            if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
              item.classList.add('filter-show');
            } else {
              item.classList.add('filter-hide');
            }
          });

          const filteredItems = Array.from(bookItems).filter(item =>
            filterValue === '*' || item.classList.contains(filterValue.substring(1))
          );

          showInitialBooks(filteredItems);
          updateBooksSeeMoreButton(filteredItems);

          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        });
      });
    }

    if (booksSeeMoreBtn) {
      booksSeeMoreBtn.addEventListener('click', () => {
        const activeFilter = document.querySelector('#books-flters li.filter-active');
        const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : '*';
        const bookItems = document.querySelectorAll('.books-item');

        const filteredItems = Array.from(bookItems).filter(item =>
          filterValue === '*' || item.classList.contains(filterValue.substring(1))
        );

        const currentVisible = visibleBooks;
        visibleBooks += BOOKS_STEP;

        filteredItems.forEach((item, index) => {
          if (index >= currentVisible && index < visibleBooks) {
            item.classList.add('visible');
          }
        });

        updateBooksSeeMoreButton(filteredItems);
      });
    }
  });

  /**
   * Retry book covers that fail or stall. Applies to remote URLs (Open
   * Library redirects can hang on a bad archive.org node) and to local files
   * that have a remote coverFallback in books-data.js (e.g. the file was
   * never committed). Each retry re-requests with a cache buster so the
   * browser can land on a different node; the last retry also swaps the large
   * cover (-L) for the medium one (-M), a different backend file that is
   * visually identical at card size. Covers without a fallback are untouched.
   */
  document.addEventListener('DOMContentLoaded', () => {
    const MAX_COVER_RETRIES = 3;
    // If a cover is displaying the medium (-M) fallback, quietly re-fetch the
    // large (-L) file in the background and swap it in once ready: -M is only
    // ~180px wide and looks soft stretched to the ~342px card. If the large
    // file can't be fetched, the medium one simply stays — no broken image.
    const upgradeToLarge = (img) => {
      const src = img.getAttribute('src') || '';
      if (!src.includes('covers.openlibrary.org') || !/-M\.jpg/.test(src)) return;
      const large = src.replace('-M.jpg', '-L.jpg');
      const probe = new Image();
      probe.onload = () => { img.src = large; };
      probe.src = large;
    };
    Array.from(document.querySelectorAll('.books-cover img'))
      .filter((img) => {
        const src = img.getAttribute('src') || '';
        return /^https?:\/\//.test(src) || img.hasAttribute('data-cover-fallback');
      })
      .forEach((img) => {
        if (img.complete && img.naturalWidth > 0) return;
        let retries = 0;
        const originalSrc = img.getAttribute('src');
        const isOpenLibrary = originalSrc.includes('covers.openlibrary.org');
        const bust = () => {
          if (retries >= MAX_COVER_RETRIES) return;
          retries += 1;
          // A local primary that failed or stalled: switch to the remote
          // fallback first (e.g. the file was never committed).
          if (retries === 1 && img.hasAttribute('data-cover-fallback')) {
            img.src = img.getAttribute('data-cover-fallback');
            return;
          }
          if (!isOpenLibrary) {
            // Other CDNs (e.g. O'Reilly) may reject unknown query params —
            // a plain re-request is the safe retry there.
            img.src = originalSrc;
            return;
          }
          let base = originalSrc;
          if (retries === MAX_COVER_RETRIES && /-L\.jpg/.test(base)) {
            base = base.replace('-L.jpg', '-M.jpg');
          }
          img.src = base + (base.includes('?') ? '&' : '?') + '_r=' + retries + '-' + Date.now();
        };
        img.addEventListener('error', bust);
        img.addEventListener('load', () => upgradeToLarge(img));
        const kick = setInterval(() => {
          if ((img.complete && img.naturalWidth > 0) || retries >= MAX_COVER_RETRIES) {
            clearInterval(kick);
            return;
          }
          bust();
        }, 6000);
      });
  });

  /**
   * Skills: render boxes + category pills from assets/js/skills-data.js.
   * Runs on DOMContentLoaded, before the filter wiring below on window load.
   */
  document.addEventListener('DOMContentLoaded', () => {
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
    const grid = document.getElementById('skills-grid');
    const flters = document.getElementById('skills-flters');
    if (flters && typeof SKILL_TAGS !== 'undefined') {
      flters.innerHTML =
        '<li>Categories: </li>' +
        '<li data-filter="*" class="filter-active">All</li>' +
        SKILL_TAGS.map((tag) =>
          `<li data-filter=".filter-${esc(tag.slug)}">${esc(tag.label)}</li>`
        ).join('');
    }
    if (!grid || typeof SKILLS === 'undefined') return;

    const validSlugs = typeof SKILL_TAGS !== 'undefined' ? SKILL_TAGS.map((t) => t.slug) : [];
    grid.innerHTML = SKILLS.map((skill) => {
      const tags = Array.isArray(skill.tags) ? skill.tags.filter((t) => {
        if (validSlugs.length && !validSlugs.includes(t)) {
          console.warn(`Skill "${skill.name}" has unknown tag "${t}" — add it to SKILL_TAGS.`);
          return false;
        }
        return true;
      }) : [];
      const name = esc(skill.name);
      const tagClasses = tags.map((t) => `filter-${esc(t)}`).join(' ');
      return `
          <div class="skills_box ${tagClasses}">
            <img loading="lazy" src="${esc(skill.img)}" alt="${name}" class="skills_img">
            <span class="skills_name">${name}</span>
          </div>`;
    }).join('');
  });

  /**
   * Skills filter by category
   */
  window.addEventListener('load', () => {
    let skillsContent = document.querySelector('.skills_content');
    if (skillsContent) {
      let skillsFilters = document.querySelectorAll('#skills-flters li[data-filter]');

      skillsFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
          e.preventDefault();

          skillsFilters.forEach(el => {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          let filterValue = this.getAttribute('data-filter');
          let skillsItems = document.querySelectorAll('.skills_box');

          skillsItems.forEach(item => {
            if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
              item.classList.remove('filter-hide');
              item.classList.add('filter-show');
            } else {
              item.classList.remove('filter-show');
              item.classList.add('filter-hide');
            }
          });

          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        });
      });
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    AOS.init({
      duration: reduceMotion ? 0 : 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      disable: reduceMotion
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Theme toggle (light / dark)
   * - Reads current theme from <html data-theme> (set by inline head script)
   * - Persists choice to localStorage
   * - Mirrors to data-bs-theme so Bootstrap components follow
   * - Syncs the LeetCard embed src (theme=default <-> theme=dark)
   */
  const syncLeetCardTheme = (theme) => {
    const cards = document.querySelectorAll('.leetcode-card-embed');
    cards.forEach((el) => {
      const current = el.getAttribute('src');
      if (!current) return;
      let next = current;
      if (theme === 'dark') {
        next = current.replace(/([?&])theme=[^&]*/, '$1theme=dark');
        if (next === current && !/[?&]theme=/.test(current)) {
          next = current + (current.includes('?') ? '&' : '?') + 'theme=dark';
        }
      } else {
        next = current.replace(/([?&])theme=[^&]*/, '$1theme=default');
      }
      if (next !== current) el.setAttribute('src', next);
    });
  };

  const applyTheme = (theme) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-bs-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
    syncLeetCardTheme(theme);
  };

  const initTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const active = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = active === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('theme', next); } catch (e) {}
        applyTheme(next);
      });
    }

    // If the user hasn't explicitly chosen, follow OS-level changes live.
    if (window.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = (e) => {
        let stored = null;
        try { stored = localStorage.getItem('theme'); } catch (err) {}
        if (stored) return;
        applyTheme(e.matches ? 'dark' : 'light');
      };
      if (mql.addEventListener) mql.addEventListener('change', onChange);
      else if (mql.addListener) mql.addListener(onChange);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

})()