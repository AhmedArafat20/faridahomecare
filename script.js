
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const contactForm = document.getElementById("contactForm");
  const year = document.getElementById("year");

  // تحديث السنة تلقائيًا
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // فتح وإغلاق قائمة الموبايل
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "إغلاق القائمة" : "فتح القائمة"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // إغلاق القائمة بعد اختيار أي رابط
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "فتح القائمة");
        menuToggle.textContent = "☰";
      });
    });

    // إغلاق القائمة عند الضغط خارجها
    document.addEventListener("click", (event) => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "فتح القائمة");
        menuToggle.textContent = "☰";
      }
    });
  }

  // إرسال نموذج الطلب عبر واتساب
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const city = document.getElementById("city").value.trim();
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value.trim();

      const whatsappMessage = [
        "السلام عليكم، أرغب في طلب خدمة من فريدة للرعاية والتمريض المنزلي.",
        "",
        `الاسم: ${fullName}`,
        `رقم الجوال: ${phone}`,
        `المدينة أو الحي: ${city}`,
        `الخدمة المطلوبة: ${service}`,
        `تفاصيل إضافية: ${message || "لا توجد تفاصيل إضافية"}`
      ].join("\n");

      const whatsappURL =
        "https://wa.me/966563193385?text=" +
        encodeURIComponent(whatsappMessage);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }
});
