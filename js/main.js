$(document).ready(function () {
  let iconMenu = document.querySelector(".icon-menu");
  let menuBody = document.querySelector(".menu__body");
  let headerRow = document.querySelector(".header__row");
  if (iconMenu) {
    iconMenu.addEventListener("click", function () {
      iconMenu.classList.toggle("active");
      menuBody.classList.toggle("active");
      headerRow.classList.toggle("active");
    });
  }

  $(".loader").addClass("hide");

  makeHeaderFixed();
  identifyActiveAnchor();

  $(".portfolio__slider").slick({
    dots: true,
    appendDots: $(".slider__dots"),
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
        },
      },
    ],
  });
  $(".loader").addClass("hide");
  $("body").removeClass("lock");

  $(".goto").click(function () {
    var el = $(this).attr("href").replace("#", "");
    var offset = -$(".header__row").height();
    $("body,html").animate(
      { scrollTop: $("." + el).offset().top + offset },
      500,
      function () {}
    );

    if ($(".menu__body").hasClass("active")) {
      $(".menu__body,.icon-menu,.header__row").removeClass("active");
      $("body").removeClass("lock");
    }
    return false;
  });

  particlesJS("particles", {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
    config_demo: {
      hide_card: false,
      background_color: "#b61924",
      background_image: "",
      background_position: "50% 50%",
      background_repeat: "no-repeat",
      background_size: "cover",
    },
  });

  AOS.init({});

  //FORMS
  function forms() {
    //FIELDS
    $("input,textarea").focus(function () {
      if ($(this).val() == $(this).attr("data-value")) {
        $(this).addClass("focus");
        $(this).parent().addClass("focus");
        if ($(this).attr("data-type") == "pass") {
          $(this).attr("type", "password");
        }
        $(this).val("");
      }
      removeError($(this));
    });
    $("input[data-value], textarea[data-value]").each(function () {
      if (this.value == "" || this.value == $(this).attr("data-value")) {
        if (
          $(this).hasClass("l") &&
          $(this).parent().find(".form__label").length == 0
        ) {
          $(this)
            .parent()
            .append(
              '<div class="form__label">' +
                $(this).attr("data-value") +
                "</div>"
            );
        } else {
          this.value = $(this).attr("data-value");
        }
      }
      if (this.value != $(this).attr("data-value") && this.value != "") {
        $(this).addClass("focus");
        $(this).parent().addClass("focus");
        if (
          $(this).hasClass("l") &&
          $(this).parent().find(".form__label").length == 0
        ) {
          $(this)
            .parent()
            .append(
              '<div class="form__label">' +
                $(this).attr("data-value") +
                "</div>"
            );
        }
      }

      $(this).click(function () {
        if (this.value == $(this).attr("data-value")) {
          if ($(this).attr("data-type") == "pass") {
            $(this).attr("type", "password");
          }
          this.value = "";
        }
      });
      $(this).blur(function () {
        if (this.value == "") {
          if (!$(this).hasClass("l")) {
            this.value = $(this).attr("data-value");
          }
          $(this).removeClass("focus");
          $(this).parent().removeClass("focus");
          if ($(this).attr("data-type") == "pass") {
            $(this).attr("type", "text");
          }
        }
        if ($(this).hasClass("vn")) {
          formValidate($(this));
        }
      });
    });
  }
  forms();

  //VALIDATE FORMS
  $("form button[type=submit]").click(function () {
    var er = 0;
    var form = $(this).parents("form");
    var ms = form.data("ms");
    $.each(form.find(".req"), function (index, val) {
      er += formValidate($(this));
    });
    if (er == 0) {
      removeFormError(form);

      if (ms != null && ms != "") {
        showMessageByClass(ms);
        return false;
      }
    } else {
      return false;
    }
  });
  function formValidate(input) {
    var er = 0;
    var form = input.parents("form");
    if (input.attr("name") == "email" || input.hasClass("email")) {
      if (input.val() != input.attr("data-value")) {
        var em = input.val().replace(" ", "");
        input.val(em);
      }
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val()) ||
        input.val() == input.attr("data-value")
      ) {
        er++;
        addError(input);
      } else {
        removeError(input);
      }
    } else {
      if (input.val() == "" || input.val() == input.attr("data-value")) {
        er++;
        addError(input);
      } else {
        removeError(input);
      }
    }
    if (input.attr("type") == "checkbox") {
      if (input.prop("checked") == true) {
        input.removeClass("err").parent().removeClass("err");
      } else {
        er++;
        input.addClass("err").parent().addClass("err");
      }
    }
    if (input.hasClass("name")) {
      if (!/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val())) {
        er++;
        addError(input);
      }
    }
    if (input.hasClass("pass-2")) {
      if (form.find(".pass-1").val() != form.find(".pass-2").val()) {
        addError(input);
      } else {
        removeError(input);
      }
    }
    return er;
  }

  function addError(input) {
    input.addClass("err");
    input.parent().addClass("err");
    input.parent().find(".form__error").remove();
    if (input.hasClass("email")) {
      var error = "";
      if (input.val() == "" || input.val() == input.attr("data-value")) {
        error = input.data("error");
      } else {
        error = input.data("error");
      }
      if (error != null) {
        input.parent().append('<div class="form__error">' + error + "</div>");
      }
    } else {
      if (
        input.data("error") != null &&
        input.parent().find(".form__error").length == 0
      ) {
        input
          .parent()
          .append('<div class="form__error">' + input.data("error") + "</div>");
      }
    }
    if (input.parents(".select-block").length > 0) {
      input.parents(".select-block").parent().addClass("err");
      input.parents(".select-block").find(".select").addClass("err");
    }
  }
  function addErrorByName(form, input__name, error_text) {
    var input = form.find('[name="' + input__name + '"]');
    input.attr("data-error", error_text);
    addError(input);
  }
  function addFormError(form, error_text) {
    form.find(".form__generalerror").show().html(error_text);
  }
  function removeFormError(form) {
    form.find(".form__generalerror").hide().html("");
  }
  function removeError(input) {
    input.removeClass("err");
    input.parent().removeClass("err");
    input.parent().find(".form__error").remove();

    if (input.parents(".select-block").length > 0) {
      input.parents(".select-block").parent().removeClass("err");
      input
        .parents(".select-block")
        .find(".select")
        .removeClass("err")
        .removeClass("active");
      //input.parents('.select-block').find('.select-options').hide();
    }
  }
  function removeFormErrors(form) {
    form.find(".err").removeClass("err");
    form.find(".form__error").remove();
  }
});

// Multilang
const select = document.querySelector("select");
const allLang = ["en", "ru"];

select.addEventListener("change", changeURLLanguage);

// перенаправить на url с указанием языка
function changeURLLanguage() {
  let lang = select.value;
  location.href = window.location.pathname + "#" + lang;
  location.reload();
}

function changeLanguage() {
  let hash = window.location.hash;
  hash = hash.substr(1);
  console.log(hash);
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + "#en";
    location.reload();
  }

  select.value = hash;
  for (let key in langArr) {
    let elem = document.querySelector(".lng-" + key);
    if (elem) {
      elem.innerHTML = langArr[key][hash];
    }
  }

  let i = 0;
  let txt;

  if (hash == "en") {
    txt = "     Rasul";
  } else {
    txt = "     Расул";
  }
  setInterval(() => {
    const el = document.getElementById("name");
    el.append(txt.charAt(i));
    i++;
  }, 100);
}

changeLanguage();

function makeHeaderFixed() {
  window.addEventListener("scroll", function () {
    const navScroll = document.getElementById("header");

    navScroll.classList.toggle("fixed", window.scrollY > 5);
  });
}

function identifyActiveAnchor() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".menu__link").forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href").replace("#", "") ===
                entry.target.className
            );
          });
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  document
    .querySelectorAll("section")
    .forEach((section) => observer.observe(section));
}
