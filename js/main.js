// ============================================================
// Soheil Vanaee — Portfolio JS
// Mobile nav, scroll reveal, tag filtering, floating thumbnail
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  /* ---- mobile nav toggle ---- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.textContent = isOpen ? "[close]" : "[menu]";
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.textContent = "[menu]";
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ---- tag filtering on project list ---- */
  const filterButtons = document.querySelectorAll(".filters .tag");
  const projectRows = document.querySelectorAll(".project-row");
  if (filterButtons.length && projectRows.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        projectRows.forEach(row => {
          const tags = row.dataset.tags || "";
          const show = filter === "all" || tags.split(",").includes(filter);
          row.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---- floating thumbnail follows cursor on project rows (desktop only) ---- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    projectRows.forEach(row => {
      const thumb = row.querySelector(".thumb-float");
      if (!thumb) return;

      let rect = null;

      row.addEventListener("mouseenter", () => {
        rect = row.getBoundingClientRect();
        thumb.style.opacity = "1";
      });

      row.addEventListener("mousemove", (e) => {
        if (!rect) rect = row.getBoundingClientRect();
        thumb.style.top = (e.clientY - rect.top) + "px";
        thumb.style.left = (e.clientX - rect.left) + "px";
      });

      row.addEventListener("mouseleave", () => {
        thumb.style.opacity = "0";
        rect = null;
      });
    });
  }
});