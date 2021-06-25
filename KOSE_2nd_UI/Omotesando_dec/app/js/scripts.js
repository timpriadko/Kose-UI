'use strict';

$(document).ready(function () {
  //disable context
  $(document).bind("contextmenu", function (e) {
    return false;
  });

  /* custom keyboard layouts */
  var normalLayout = [
    ' 1 2 3 4 5 6 7 8 9 0 -',
    '@ q w e r t y u i o p',
    ' a s d f g h j k l {bksp}',
    '~ z x c v b n m . \' _',
    '{accept} {cancel}',
  ];

  // var shiftLayout = [
  //   '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
  //   '{tab} Q W E R T Y U I O P { } |',
  //   'A S D F G H J K L : " {accept}',
  //   '{shift} Z X C V B N M < > ? {shift}',
  //   '{alt} {space} {cancel}'
  // ];
  //
  // var altLayout = [
  //   '~ \u00a1 \u00b2 \u00b3 \u00a4 \u20ac \u00bc \u00bd \u00be \u2018 \u2019 \u00a5 \u00d7 {bksp}',
  //   '{tab} \u00e4 \u00e5 \u00e9 \u00ae \u00fe \u00fc \u00fa \u00ed \u00f3 \u00f6 \u00ab \u00bb \u00ac',
  //   '\u00e1 \u00df \u00f0 f g h j k \u00f8 \u00b6 \u00b4 {accept}',
  //   '{shift} \u00e6 x \u00a9 v b \u00f1 \u00b5 \u00e7 > \u00bf {shift}',
  //   '@ {alt} {space} {alt} {cancel}'
  // ];
  //
  // var altShitlayout = [
  //   '~ \u00b9 \u00b2 \u00b3 \u00a3 \u20ac \u00bc \u00bd \u00be \u2018 \u2019 \u00a5 \u00f7 {bksp}',
  //   '{tab} \u00c4 \u00c5 \u00c9 \u00ae \u00de \u00dc \u00da \u00cd \u00d3 \u00d6 \u00ab \u00bb \u00a6',
  //   '\u00c4 \u00a7 \u00d0 F G H J K \u00d8 \u00b0 \u00a8 {accept}',
  //   '{shift} \u00c6 X \u00a2 V B \u00d1 \u00b5 \u00c7 . \u00bf {shift}',
  //   '{alt} {space} {alt} {cancel}'
  // ]
  /* custom keyboard layouts */

  if (window.innerWidth > 560) {
    // init https://mottie.github.io/Keyboard/
    if ($('#first_name, #last_name').length > 0) {
      $('#first_name, #last_name').keyboard({
        layout: 'custom',
        position: {
          // null = attach to input/textarea;
          // use $(sel) to attach elsewhere
          of: '#email',
          my: 'center top',
          // at: 'center top',
          // used when "usePreview" is false
          at2: 'center bottom'
        },
        usePreview: false,
        customLayout: {
          normal: normalLayout,
          // shift: shiftLayout,
          // alt: altLayout,
          // 'alt-shift': altShitlayout,
        },
        visible: function (e, keyboard) {
          keyboard.$keyboard.find('.ui-keyboard-accept').text('Done')
        },
        autoAccept: true,
        appendTo: $('.keyboard'),
      });
    }

    if ($('#email').length > 0) {
      $('#email').keyboard({
        layout: 'custom',
        position: {
          of: null,
          my: 'center top',
          // at: 'center top',
          at2: 'center bottom'
        },
        usePreview: false,
        customLayout: {
          normal: normalLayout,
          // shift: shiftLayout,
          // alt: altLayout,
          // 'alt-shift': altShitlayout,
        },
        visible: function (e, keyboard) {
          keyboard.$keyboard.find('.ui-keyboard-accept').text('Done')
          keyboard.$keyboard.find('.ui-keyboard-bksp').text('Del');

          $('.promocode-page').addClass('keyboard-email-active');
        },
        hidden: function (e, keyboard, el) {
          $('.promocode-page').removeClass('keyboard-email-active');
        },
        autoAccept: true,
        appendTo: $('.keyboard-email'),
      });
    }

    if ($('#promo').length > 0) {
      $('#promo').keyboard({
        layout: 'custom',
        position: {
          of: null,
          my: 'center top',
          // at: 'center top',
          at2: 'center bottom'
        },
        usePreview: false,
        customLayout: {
          normal: normalLayout,
          // shift: shiftLayout,
          // alt: altLayout,
          // 'alt-shift': altShitlayout,
        },
        visible: function (e, keyboard) {
          keyboard.$keyboard.find('.ui-keyboard-accept').text('Done');
          keyboard.$keyboard.find('.ui-keyboard-bksp').text('Del');

          $('.promocode-page').addClass('keyboard-promo-active');
        },
        hidden: function (e, keyboard, el) {
          $('.promocode-page').removeClass('keyboard-promo-active');
        },
        autoAccept: true,
        appendTo: $('.keyboard-promo'),
      });
    }
  }

  //validate email

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return regex.test(email);
  };


  // validate Terms agreement
  var email = $('#email');
  var promo = $('#promo');
  var termsSubmitLabel = $('#formSubmitLabel');
  var termsSubmit = $('#formSubmit');
  var termsBtn = $('.terms-btn');
  var terms = $('#terms');

  var form_validation = function () {
    // promo validation
    const promocode = 'NEWBIE';

    // email validaton
    if (isEmail(email.val()) &&
      !email.hasClass('required') &&
      promo.val().length > 0 &&
      promo.val().toUpperCase() === promocode &&
      $(terms).is(':checked')) {
      termsSubmit.removeAttr('disabled');
      termsSubmitLabel.removeClass('disabled');
    } else {
      termsSubmit.attr('disabled', 'disabled');
      termsSubmitLabel.addClass('disabled');
    }
  };

  email.change(function () {
    form_validation()
  });

  promo.change(function () {
    form_validation()
  });

  terms.change(function () {
    form_validation()
  });

  termsBtn.on('click', function () {
    policyModal.addClass('show');
  });

  /* setup modal */
  var termsBtn = $('.terms-btn');
  var policyBtn = $('.policy-btn');
  var informationProvided = $('.information-provided');
  var termsModal = $('#modal-terms');
  var policyModal = $('#modal-policy');
  var modalInformation = $('#modal-information');
  var closeBtn = $('.ui-close-modal');

  termsBtn.on('click', function () {
    termsModal.addClass('show');
  });

  policyBtn.on('click', function () {
    policyModal.addClass('show');
  });

  informationProvided.on('click', function () {
    modalInformation.addClass('show');
  });

  closeBtn.on('click', function () {
    termsModal.removeClass('show');
    policyModal.removeClass('show');
    modalInformation.removeClass('show');
  });

  // close modal by clicking outside the modal window
  $('.modal-wrap').click(function (e) {
    if (e.target === $('.modal-wrap.show')[0]) {
      $('.modal-wrap').removeClass('show');
    }
  })
  /* end modal */

  // move to step 2 when user scans the QT-code
  if (window.location.pathname.includes('/index.html')) {

    if (odoreConfig) {
      const {
        isMobile,
      } = odoreConfig;

      if (isMobile === true) {
        location.href = "step_1.html";
      }
    }
  }

  // promocode step
  function enableControls() {
    const elements = document.querySelectorAll('button, input');
    const links = document.querySelectorAll('a');

    Array.from(elements).forEach(element => {
      element.disabled = false;
    })
    Array.from(links).forEach(link => {
      link.addEventListener('click', (e) => { return false })
    })
  }

  if (window.location.pathname.includes('/step_7.html')) {
    if (odoreConfig) {
      const {
        deviceId,
        pollSessionId,
      } = odoreConfig;

      // close session
      fetch(
        `${window.location.protocol}//${window.location.host}/mobile/devices/${deviceId}/${pollSessionId}/qr`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: 'mobile',
            event: {
              type: 'session_over',
            }
          }),
        }
      )
    }

    // enable controls
    setTimeout(function () {
      enableControls();
    }, 500)
  };


  // product page functionality
  var answer_inputs = $('input[name="answer"]');
  var question = $('input[data-question="question"]').closest('form').find('input[name="question"]').val();
  var last_question = $('input[data-last="last_question"]');
  var q_1_1 = 'grass';
  var q_1_2 = 'flowers';
  var q_1_3 = 'sunset';
  var q_2_1 = 'Cool & Sophisticated';
  var q_2_2 = 'Lovely & Cheerful';
  var q_2_3 = 'Classy & Mature';
  var q_3_1 = 'Time spent studying or working';
  var q_3_2 = 'Quality time with loved ones and friends';
  var q_3_3 = 'When devoting myself to a hobby';

  function hideBloks() {
    $('.to-hide').addClass('hide');
  }

  function displayBlocks() {
    $('.to-show').removeClass('hide');
  }

  // load animation
  function loadAnimation() {
    hideBloks();
    displayBlocks();
    setTimeout(function () {
      $('.analysis-bar').addClass('w-100');
    }, 200)
  }

  if (window.location.pathname.includes('/step_5-animation.html')) {

    loadAnimation();

    var answer_1 = sessionStorage.getItem('Select the one that you are instantly and instinctively drawn towards');
    var answer_2 = sessionStorage.getItem('How would you describe yourself?');
    var answer_3 = sessionStorage.getItem('Which do you value the most in your life?');

    setTimeout(function () {
      if (answer_1 === q_1_1 && answer_2 === q_2_1 && answer_3 === q_3_1) {
        // console.log('Cherry Blossom')
        document.location.replace("step_6-product_1.html", '_self');
      }
      if (answer_1 === q_1_1 && answer_2 === q_2_1 && answer_3 === q_3_2) {
        // console.log('Cherry Blossom')
        document.location.replace("step_6-product_1.html", '_self');
      }
      if (answer_1 === q_1_1 && answer_2 === q_2_1 && answer_3 === q_3_3) {
        // console.log('Sensual Jasmine')
        document.location.replace("step_6-product_2.html", '_self');
      }
      if (answer_1 === q_1_1 && answer_2 === q_2_2 && answer_3 === q_3_1) {
        // console.log('Cherry Blossom')
        document.location.replace("step_6-product_1.html", '_self');
      }
      if (answer_1 === q_1_1 && answer_2 === q_2_2 && answer_3 === q_3_2) {
        // console.log('Sensual Jasmine')
        document.location.replace("step_6-product_2.html", '_self');
      }
      if (answer_1 === q_1_1 && answer_2 === q_2_2 && answer_3 === q_3_3) {
        // console.log('Sensual Jasmine')
        document.location.replace("step_6-product_2.html", '_self');
      }
      if (answer_1 === q_1_1 && answer_2 === q_2_3 && answer_3 === q_3_1) {
        // console.log('French Rose')
        document.location.replace("step_6-product_3.html", '_self');
      }
      if (answer_1 === q_1_1 && answer_2 === q_2_3 && answer_3 === q_3_2) {
        // console.log('French Rose')
        document.location.replace("step_6-product_3.html", '_self');
      }
      if (answer_1 === q_1_1 && answer_2 === q_2_3 && answer_3 === q_3_3) {
        // console.log('Sensual Jasmine')
        document.location.replace("step_6-product_2.html", '_self');
      }
      if (answer_1 === q_1_2 && answer_2 === q_2_1 && answer_3 === q_3_1) {
        // console.log('Cherry Blossom')
        document.location.replace("step_6-product_1.html", '_self');
      }
      if (answer_1 === q_1_2 && answer_2 === q_2_1 && answer_3 === q_3_2) {
        // console.log('Sensual Jasmine')
        document.location.replace("step_6-product_2.html", '_self');
      }
      if (answer_1 === q_1_2 && answer_2 === q_2_1 && answer_3 === q_3_3) {
        // console.log('Sensual Jasmine')
        document.location.replace("step_6-product_2.html", '_self');
      }
      if (answer_1 === q_1_2 && answer_2 === q_2_2 && answer_3 === q_3_1) {
        // console.log('Sensual Jasmine')
        document.location.replace("step_6-product_2.html", '_self');
      }
      if (answer_1 === q_1_2 && answer_2 === q_2_2 && answer_3 === q_3_2) {
        // console.log('French Rose')
        document.location.replace("step_6-product_3.html", '_self');
      }
      if (answer_1 === q_1_2 && answer_2 === q_2_2 && answer_3 === q_3_3) {
        // console.log('French Rose')
        document.location.replace("step_6-product_3.html", '_self');
      }
      if (answer_1 === q_1_2 && answer_2 === q_2_3 && answer_3 === q_3_1) {
        // console.log('Sweet Osmanthus')
        document.location.replace("step_6-product_4.html", '_self');
      }
      if (answer_1 === q_1_2 && answer_2 === q_2_3 && answer_3 === q_3_2) {
        // console.log('Sweet Osmanthus')
        document.location.replace("step_6-product_4.html", '_self');
      }
      if (answer_1 === q_1_2 && answer_2 === q_2_3 && answer_3 === q_3_3) {
        // console.log('Sweet Osmanthus')
        document.location.replace("step_6-product_4.html", '_self');
      }
      if (answer_1 === q_1_3 && answer_2 === q_2_1 && answer_3 === q_3_1) {
        // console.log('Sensual Jasmine')
        document.location.replace("step_6-product_2.html", '_self');
      }
      if (answer_1 === q_1_3 && answer_2 === q_2_1 && answer_3 === q_3_2) {
        // console.log('French Rose')
        document.location.replace("step_6-product_3.html", '_self');
      }
      if (answer_1 === q_1_3 && answer_2 === q_2_1 && answer_3 === q_3_3) {
        // console.log('French Rose')
        document.location.replace("step_6-product_3.html", '_self');
      }
      if (answer_1 === q_1_3 && answer_2 === q_2_2 && answer_3 === q_3_1) {
        // console.log('Sensual Jasmine')
        document.location.replace("step_6-product_2.html", '_self');
      }
      if (answer_1 === q_1_3 && answer_2 === q_2_2 && answer_3 === q_3_2) {
        // console.log('Sweet Osmanthus')
        document.location.replace("step_6-product_4.html", '_self');
      }
      if (answer_1 === q_1_3 && answer_2 === q_2_2 && answer_3 === q_3_3) {
        // console.log('Sweet Osmanthus')
        document.location.replace("step_6-product_4.html", '_self');
      }
      if (answer_1 === q_1_3 && answer_2 === q_2_3 && answer_3 === q_3_1) {
        // console.log('Sweet Osmanthus')
        document.location.replace("step_6-product_4.html", '_self');
      }
      if (answer_1 === q_1_3 && answer_2 === q_2_3 && answer_3 === q_3_2) {
        // console.log('Sweet Osmanthus')
        document.location.replace("step_6-product_4.html", '_self');
      }
      if (answer_1 === q_1_3 && answer_2 === q_2_3 && answer_3 === q_3_3) {
        // console.log('Sweet Osmanthus')
        document.location.replace("step_6-product_4.html", '_self');
      }
    }, 2200)
  }

  function answerInputHandler(e) {

    sessionStorage.setItem(question, this.value);

    $(this).closest('form').submit();
  }

  if ($('input[data-question="question"]').length > 0 && answer_inputs.length > 0) {
    answer_inputs.click(answerInputHandler);
  }

});