(function() {
  "use strict";

  const select = (el, all = false) => {
    const trimmed = el.trim();
    return all ? [...document.querySelectorAll(trimmed)] : document.querySelector(trimmed);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;

    if (all) {
      selectEl.forEach((item) => item.addEventListener(type, listener));
      return;
    }
    selectEl.addEventListener(type, listener);
  };

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  const scrollto = (el) => {
    const target = select(el);
    if (!target) return;
    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth"
    });
  };

  const initDataDrivenSections = () => {
    const data = window.PORTFOLIO_DATA;
    if (!data) return;

    const iconClassByTitle = {
      "Github Repo": "bxl-github",
      Website: "bx-world",
      Youtube: "bxl-youtube"
    };

    const projectsContainer = document.querySelector(".projects-container");
    if (projectsContainer && Array.isArray(data.projects) && data.projects.length > 0) {
      projectsContainer.innerHTML = data.projects.map((project) => {
        const links = (project.links || []).map((link) => {
          const iconClass = iconClassByTitle[link.title] || "bx-link-external";
          return `
                  <a target="_blank" rel="noopener noreferrer" href="${link.href}"
                    class="projects-details-lightbox" data-glightbox="type: external" title="${link.title}"><i
                      class='bx ${iconClass}'></i></a>`;
        }).join("");

        return `
          <div class="col-lg-4 col-md-6 projects-item">
            <div class="projects-wrap">
              <img loading="lazy" src="${project.image}" class="img-fluid" alt="Project thumbnail">
              <div class="projects-info">
                <h4>${project.title}</h4>
                <div class="projects-links">
${links}
                </div>
              </div>
            </div>
          </div>`;
      }).join("");
    }

    const blogContainer = document.querySelector(".blog-container");
    if (blogContainer && Array.isArray(data.blogs) && data.blogs.length > 0) {
      blogContainer.innerHTML = data.blogs.map((blog) => `
            <div class="col-lg-4 col-md-6 blog-item ${blog.filterClass}">
              <div class="blog-info">
                <a target="_blank" rel="noopener noreferrer" href="${blog.url}">
                  <img src="${blog.image}" class="img-responsive" alt="Blog cover image" loading="lazy" decoding="async">
                </a>
                <div class="blog-txt">
                  <h4>${blog.title}</h4>
                  <p class="separator">${blog.description}</p>
                </div>
                <div class="read-more-btn-container">
                  <a target="_blank" rel="noopener noreferrer" href="${blog.url}">
                    <span class="blogs-read-more-btn btn btn-primary btn-outlined"> Read More <i class='bx bx-link-external'></i></span>
                  </a>
                </div>
              </div>
            </div>
      `).join("");
    }

    const certificationsContainer = document.querySelector(".certifications-container");
    if (certificationsContainer && Array.isArray(data.certifications) && data.certifications.length > 0) {
      certificationsContainer.innerHTML = data.certifications.map((certification) => {
        const details = certification.detailsUrl
          ? `
                  <a target="_blank" rel="noopener noreferrer" href="${certification.detailsUrl}"
                    data-glightbox="type: external" title="certifications Details"><i class="bx bx-link"></i></a>`
          : certification.disabledDetails
            ? `
                  <span class="certifications-link-disabled" aria-label="Certification details unavailable"><i
                      class="bx bx-link"></i></span>`
            : "";

        return `
          <div class="col-lg-4 col-md-6 certifications-item ${certification.filterClass}">
            <div class="certifications-wrap">
              <img loading="lazy" src="${certification.image}" class="img-fluid" alt="Certification image">
              <div class="certifications-info">
                <h4>${certification.title}</h4>
                <p>${certification.org}</p>
                <div class="certifications-links">
                  <a href="${certification.image}" data-gallery="certificationsGallery"
                    class="certifications-lightbox" title="Zoom in"><i class='bx bx-zoom-in'></i></a>${details}
                </div>
              </div>
            </div>
          </div>`;
      }).join("");
    }
  };

  const initNavigation = () => {
    const navbarlinks = select("#navbar .scrollto", true);
    const navbarlinksActive = () => {
      const position = window.scrollY + 200;
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) return;
        const section = select(navbarlink.hash);
        if (!section) return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add("active");
        } else {
          navbarlink.classList.remove("active");
        }
      });
    };

    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);

    const backtotop = select(".back-to-top");
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add("active");
        } else {
          backtotop.classList.remove("active");
        }
      };
      window.addEventListener("load", toggleBacktotop);
      onscroll(document, toggleBacktotop);
    }

    on("click", ".mobile-nav-toggle", function() {
      select("body").classList.toggle("mobile-nav-active");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });

    on("click", ".scrollto", function(e) {
      if (!select(this.hash)) return;
      e.preventDefault();

      const body = select("body");
      if (body.classList.contains("mobile-nav-active")) {
        body.classList.remove("mobile-nav-active");
        const navbarToggle = select(".mobile-nav-toggle");
        navbarToggle.classList.toggle("bi-list");
        navbarToggle.classList.toggle("bi-x");
      }
      scrollto(this.hash);
    }, true);

    window.addEventListener("load", () => {
      if (window.location.hash && select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    });

    const preloader = select("#preloader");
    if (preloader) {
      window.addEventListener("load", () => {
        preloader.remove();
      });
    }
  };

  const initHeroTyped = () => {
    const typed = select(".typed");
    if (!typed) return;

    const typedStrings = (typed.getAttribute("data-typed-items") || "").split(",");
    new Typed(".typed", {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  };

  const initSkillsAnimation = () => {
    const skillsContent = document.querySelector(".skills_content");
    if (!skillsContent) return;

    new Waypoint({
      element: skillsContent,
      offset: "80%",
      handler: function() {
        const skillsBoxes = document.querySelectorAll(".skills_box");
        skillsBoxes.forEach((box) => {
          box.classList.add("visible");
        });
      }
    });
  };

  const initCertificationsFilter = () => {
    window.addEventListener("load", () => {
      const certificationsContainer = select(".certifications-container");
      if (!certificationsContainer) return;

      const certificationsIsotope = new Isotope(certificationsContainer, {
        itemSelector: ".certifications-item"
      });

      const certificationsFilters = select("#certifications-flters li", true);
      on("click", "#certifications-flters li", function(e) {
        e.preventDefault();
        certificationsFilters.forEach((el) => {
          el.classList.remove("filter-active");
        });
        this.classList.add("filter-active");

        certificationsIsotope.arrange({
          filter: this.getAttribute("data-filter")
        });
        certificationsIsotope.on("arrangeComplete", () => {
          AOS.refresh();
        });
      }, true);
    });
  };

  const initLightboxesAndSliders = () => {
    GLightbox({
      selector: ".certifications-lightbox"
    });

    GLightbox({
      selector: ".certifications-details-lightbox",
      width: "90%",
      height: "90vh"
    });

    new Swiper(".certifications-details-slider", {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      }
    });

    new Swiper(".testimonials-slider", {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      }
    });
  };

  const initContactForm = () => {
    const contactForm = document.getElementById("contact-form");
    const contactMessage = document.querySelector("#contact-form .sent-message");
    const errorMessage = document.querySelector("#contact-form .error-message");
    const loadingMessage = document.querySelector("#contact-form .loading");
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
    const honeypot = contactForm ? contactForm.querySelector('input[name="company_website"]') : null;
    if (!contactForm) return;

    const MIN_SUBMIT_INTERVAL_MS = 30000;
    let lastSubmittedAt = 0;

    const clearStatus = () => {
      if (errorMessage) {
        errorMessage.style.display = "none";
        errorMessage.textContent = "";
      }
      if (contactMessage) {
        contactMessage.style.display = "none";
        contactMessage.textContent = "";
      }
    };

    const setLoading = (isLoading) => {
      if (loadingMessage) {
        loadingMessage.style.display = isLoading ? "block" : "none";
      }
      if (submitButton) {
        submitButton.disabled = isLoading;
        submitButton.setAttribute("aria-disabled", String(isLoading));
      }
    };

    const showError = (message) => {
      if (!errorMessage) return;
      errorMessage.textContent = message;
      errorMessage.style.display = "block";
    };

    const showSuccess = (message) => {
      if (!contactMessage) return;
      contactMessage.textContent = message;
      contactMessage.style.display = "block";
    };

    const sendEmail = (e) => {
      e.preventDefault();
      clearStatus();

      if (honeypot && honeypot.value.trim()) {
        contactForm.reset();
        return;
      }

      const now = Date.now();
      if (now - lastSubmittedAt < MIN_SUBMIT_INTERVAL_MS) {
        showError("Please wait a bit before sending another message.");
        return;
      }

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const subject = contactForm.querySelector("#subject");
      const message = contactForm.querySelector("#message");
      if (subject && subject.value.trim().length < 3) {
        showError("Please enter a more detailed subject.");
        return;
      }
      if (message && message.value.trim().length < 10) {
        showError("Please enter a slightly longer message.");
        return;
      }

      setLoading(true);
      emailjs.sendForm("service_5wfiny6", "template_gsx9en1", "#contact-form", "iR4cVRwdc3xjdn0cT")
        .then(() => {
          lastSubmittedAt = Date.now();
          showSuccess("Your message has been sent. Thank you!");
          contactForm.reset();
        })
        .catch(() => {
          showError("Unable to send your message right now. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });

      setTimeout(() => {
        if (contactMessage && contactMessage.style.display === "block") {
          contactMessage.style.display = "none";
          contactMessage.textContent = "";
        }
      }, 5000);
    };

    contactForm.addEventListener("submit", sendEmail);
  };

  const initProjectsSeeMore = () => {
    const projectsSeeMoreBtn = document.getElementById("projects-see-more-btn");
    const projectsItems = document.querySelectorAll(".projects-item");
    const projectsFollowMessage = document.getElementById("projects-follow-message");
    if (!projectsSeeMoreBtn || !projectsFollowMessage) return;

    let visibleProjects = 6;
    for (let i = 0; i < visibleProjects; i += 1) {
      if (projectsItems[i]) {
        projectsItems[i].classList.add("visible");
      }
    }

    projectsSeeMoreBtn.addEventListener("click", () => {
      const currentVisible = visibleProjects;
      visibleProjects += 3;

      for (let i = currentVisible; i < visibleProjects; i += 1) {
        if (projectsItems[i]) {
          projectsItems[i].classList.add("visible");
        } else {
          projectsSeeMoreBtn.style.display = "none";
          projectsFollowMessage.innerHTML = `
          <p>You've reached the end of the projects. Follow me on <a href="https://github.com/TharunKumarReddyPolu" target="_blank" rel="noopener noreferrer"><i class='bx bx-link-external'></i> Github</a> for more updates!</p>
        `;
          break;
        }
      }
    });
  };

  const initBlogsSeeMoreAndFiltering = () => {
    const blogsSeeMoreBtn = document.getElementById("blogs-see-more-btn");
    const blogsFollowMessage = document.getElementById("blogs-follow-message");
    const blogContainer = document.querySelector(".blog-container");
    if (!blogsSeeMoreBtn || !blogsFollowMessage) return;

    let visibleBlogs = 3;

    const updateSeeMoreButton = (filteredItems) => {
      if (filteredItems.length <= 3) {
        blogsSeeMoreBtn.style.display = "none";
        blogsFollowMessage.innerHTML = "";
        return;
      }

      const visibleCount = Array.from(filteredItems).filter((item) => item.classList.contains("visible")).length;
      if (visibleCount >= filteredItems.length) {
        blogsSeeMoreBtn.style.display = "none";
        blogsFollowMessage.innerHTML = `
            <p>You've reached the end of the blogs. Follow me on <a href="https://medium.com/@TharunKumarReddyPolu" target="_blank" rel="noopener noreferrer"><i class='bx bx-link-external'></i> Medium</a> for more updates!</p>
          `;
      } else {
        blogsSeeMoreBtn.style.display = "block";
        blogsFollowMessage.innerHTML = "";
      }
    };

    const showInitialBlogs = (items) => {
      Array.from(items).forEach((item, index) => {
        if (index < visibleBlogs) {
          item.classList.add("visible");
        } else {
          item.classList.remove("visible");
        }
      });
    };

    const allBlogItems = document.querySelectorAll(".blog-item");
    showInitialBlogs(allBlogItems);
    updateSeeMoreButton(allBlogItems);

    if (blogContainer) {
      const blogFilters = document.querySelectorAll("#blog-flters li");
      blogFilters.forEach((filter) => {
        filter.addEventListener("click", function(e) {
          e.preventDefault();

          blogFilters.forEach((el) => {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          const filterValue = this.getAttribute("data-filter");
          const blogItems = document.querySelectorAll(".blog-item");
          visibleBlogs = 3;

          blogItems.forEach((item) => {
            item.classList.remove("visible", "filter-hide", "filter-show");
            if (filterValue === "*" || item.classList.contains(filterValue.substring(1))) {
              item.classList.add("filter-show");
            } else {
              item.classList.add("filter-hide");
            }
          });

          const filteredItems = Array.from(blogItems).filter((item) =>
            filterValue === "*" || item.classList.contains(filterValue.substring(1))
          );
          showInitialBlogs(filteredItems);
          updateSeeMoreButton(filteredItems);
        });
      });
    }

    blogsSeeMoreBtn.addEventListener("click", () => {
      const activeFilter = document.querySelector("#blog-flters li.filter-active");
      const filterValue = activeFilter.getAttribute("data-filter");
      const blogItems = document.querySelectorAll(".blog-item");
      const filteredItems = Array.from(blogItems).filter((item) =>
        filterValue === "*" || item.classList.contains(filterValue.substring(1))
      );

      const currentVisible = visibleBlogs;
      visibleBlogs += 3;
      filteredItems.forEach((item, index) => {
        if (index >= currentVisible && index < visibleBlogs) {
          item.classList.add("visible");
        }
      });

      updateSeeMoreButton(filteredItems);
    });
  };

  const initAOSAndCounters = () => {
    window.addEventListener("load", () => {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    });

    new PureCounter();
  };

  const initApp = () => {
    initDataDrivenSections();
    initNavigation();
    initHeroTyped();
    initSkillsAnimation();
    initCertificationsFilter();
    initLightboxesAndSliders();
    initContactForm();
    initProjectsSeeMore();
    initBlogsSeeMoreAndFiltering();
    initAOSAndCounters();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();