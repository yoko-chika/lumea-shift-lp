const stickyCta = document.getElementById('stickyCta');
const fv = document.getElementById('fv');
const price = document.getElementById('price');
const finalCta = document.getElementById('finalCta');

let fvOut = false;
let priceIn = false;
let finalIn = false;

function updateSticky() {
  if (fvOut && !priceIn && !finalIn) {
    stickyCta.classList.add('is-show');
    stickyCta.setAttribute('aria-hidden', 'false');
  } else {
    stickyCta.classList.remove('is-show');
    stickyCta.setAttribute('aria-hidden', 'true');
  }
}

const fvObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    fvOut = !entry.isIntersecting;
    updateSticky();
  });
}, { threshold: 0 });
fvObserver.observe(fv);

const priceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    priceIn = entry.isIntersecting;
    updateSticky();
  });
}, { threshold: 0.16 });
priceObserver.observe(price);

const finalObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    finalIn = entry.isIntersecting;
    updateSticky();
  });
}, { threshold: 0.2 });
finalObserver.observe(finalCta);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.rv').forEach((el) => revealObserver.observe(el));

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item').forEach((faq) => {
      faq.classList.remove('is-open');
      faq.querySelector('button').setAttribute('aria-expanded', 'false');
      faq.querySelector('button span').textContent = '＋';
    });
    if (!isOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('span').textContent = '×';
    }
  });
});

/* ========================================
   申込フォーム モーダル
======================================== */

const formModal = document.getElementById('formModal');

const formOpenButtons =
  document.querySelectorAll('.js-open-form');

const formCloseButtons =
  document.querySelectorAll('[data-modal-close]');


function openFormModal(event) {

  if (event) {
    event.preventDefault();
  }

  formModal.classList.add('is-open');

  formModal.setAttribute(
    'aria-hidden',
    'false'
  );

  document.body.classList.add(
    'modal-open'
  );

}


function closeFormModal() {

  formModal.classList.remove('is-open');

  formModal.setAttribute(
    'aria-hidden',
    'true'
  );

  document.body.classList.remove(
    'modal-open'
  );

}


formOpenButtons.forEach(function (button) {

  button.addEventListener(
    'click',
    openFormModal
  );

});


formCloseButtons.forEach(function (button) {

  button.addEventListener(
    'click',
    closeFormModal
  );

});


document.addEventListener(
  'keydown',
  function (event) {

    if (
      event.key === 'Escape' &&
      formModal.classList.contains('is-open')
    ) {

      closeFormModal();

    }

  }
);


const GAS_URL = 'https://script.google.com/macros/s/AKfycbz4C4BlLSvZMlUvq7LmfYPr1N_uZ4SrBIKff5ikiaPmFRZX--8kQMna04edx52yuZpe2A/exec';

/* ========================================
   申込フォーム バリデーション
======================================== */

const orderForm =
  document.getElementById('orderForm');

const formSubmit =
  document.getElementById('formSubmit');

const formStatus =
  document.getElementById('formStatus');


function showFormError(
  field,
  message
) {

  field.classList.add(
    'is-error'
  );

  const errorElement =
    document.querySelector(
      `[data-error-for="${field.id}"]`
    );

  if (errorElement) {
    errorElement.textContent =
      message;
  }

}


function clearFormError(field) {

  field.classList.remove(
    'is-error'
  );

  const errorElement =
    document.querySelector(
      `[data-error-for="${field.id}"]`
    );

  if (errorElement) {
    errorElement.textContent = '';
  }

}


function validateOrderForm() {

  let isValid = true;

  const name =
    document.getElementById('name');

  const kana =
    document.getElementById('kana');

  const email =
    document.getElementById('email');

  const tel =
    document.getElementById('tel');

  const postalCode =
    document.getElementById('postalCode');

  const prefecture =
    document.getElementById('prefecture');

  const address =
    document.getElementById('address');

  const agreement =
    document.getElementById('agreement');


  /* お名前 */

  clearFormError(name);

  if (!name.value.trim()) {

    showFormError(
      name,
      'お名前を入力してください。'
    );

    isValid = false;

  }


  /* フリガナ */

  clearFormError(kana);

  const kanaPattern =
    /^[ァ-ヶー\s]+$/;

  if (!kana.value.trim()) {

    showFormError(
      kana,
      'フリガナを入力してください。'
    );

    isValid = false;

  } else if (
    !kanaPattern.test(
      kana.value.trim()
    )
  ) {

    showFormError(
      kana,
      'フリガナはカタカナで入力してください。'
    );

    isValid = false;

  }


  /* メール */

  clearFormError(email);

  if (!email.value.trim()) {

    showFormError(
      email,
      'メールアドレスを入力してください。'
    );

    isValid = false;

  } else if (
    !email.checkValidity()
  ) {

    showFormError(
      email,
      '正しいメールアドレスを入力してください。'
    );

    isValid = false;

  }


  /* 電話番号 */

  clearFormError(tel);

  const telValue =
    tel.value.replace(
      /-/g,
      ''
    );

  const telPattern =
    /^\d{10,11}$/;

  if (!telValue) {

    showFormError(
      tel,
      '電話番号を入力してください。'
    );

    isValid = false;

  } else if (
    !telPattern.test(telValue)
  ) {

    showFormError(
      tel,
      '電話番号は10〜11桁の数字で入力してください。'
    );

    isValid = false;

  }


  /* 郵便番号 */

  clearFormError(postalCode);

  const postalValue =
    postalCode.value.replace(
      /-/g,
      ''
    );

  if (!postalValue) {

    showFormError(
      postalCode,
      '郵便番号を入力してください。'
    );

    isValid = false;

  } else if (
    !/^\d{7}$/.test(
      postalValue
    )
  ) {

    showFormError(
      postalCode,
      '郵便番号は7桁の数字で入力してください。'
    );

    isValid = false;

  }


  /* 都道府県 */

  clearFormError(prefecture);

  if (!prefecture.value) {

    showFormError(
      prefecture,
      '都道府県を選択してください。'
    );

    isValid = false;

  }


  /* 住所 */

  clearFormError(address);

  if (!address.value.trim()) {

    showFormError(
      address,
      '住所を入力してください。'
    );

    isValid = false;

  }


  /* 規約 */

  const agreementError =
    document.querySelector(
      '[data-error-for="agreement"]'
    );

  agreementError.textContent = '';

  if (!agreement.checked) {

    agreementError.textContent =
      'プライバシーポリシーへの同意が必要です。';

    isValid = false;

  }


  return isValid;

}

/* ========================================
   GASへ申込データを送信
======================================== */

orderForm.addEventListener(
  'submit',
  async function (event) {

    event.preventDefault();

    formStatus.textContent = '';

    formStatus.className =
      'form-status';


    /* 入力チェック */

    const isValid =
      validateOrderForm();

    if (!isValid) {

      formStatus.textContent =
        '入力内容をご確認ください。';

      formStatus.classList.add(
        'is-error'
      );

      const firstError =
        orderForm.querySelector(
          '.is-error'
        );

      if (firstError) {

        firstError.focus();

      }

      return;

    }


    /* 送信中 */

    formSubmit.disabled = true;

    formSubmit
      .querySelector('span')
      .textContent =
      '送信しています…';


    try {

      const formData =
        new FormData(orderForm);


      await fetch(
        GAS_URL,
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        }
      );


      /* 成功 */

      formStatus.textContent =
        'お申し込みを受け付けました。ありがとうございます。';

      formStatus.classList.add(
        'is-success'
      );


      orderForm.reset();


      formSubmit
        .querySelector('span')
        .textContent =
        'お申し込み完了';


    } catch (error) {

      console.error(error);


      formStatus.textContent =
        '送信に失敗しました。時間をおいてもう一度お試しください。';

      formStatus.classList.add(
        'is-error'
      );


      formSubmit.disabled = false;

      formSubmit
        .querySelector('span')
        .textContent =
        '申し込みを確定する';

    }

  }
);

document.addEventListener('DOMContentLoaded', function () {
  const fvVideos = document.querySelectorAll('.fv-media .fv-video');

  if (fvVideos.length > 1) {
    let currentIndex = 0;
    const switchInterval = 10000;

    setInterval(function () {
      fvVideos[currentIndex].classList.remove('active');

      currentIndex = (currentIndex + 1) % fvVideos.length;

      fvVideos[currentIndex].classList.add('active');
      fvVideos[currentIndex].currentTime = 0;
      fvVideos[currentIndex].play();
    }, switchInterval);
  }
});


/* ========================================
   プライバシーポリシー モーダル
======================================== */

const privacyModal = document.getElementById('privacyModal');
const privacyOpenButtons = document.querySelectorAll('.js-privacy-open');
const privacyCloseButton = privacyModal.querySelector('.legal-modal__close');
const privacyOverlay = privacyModal.querySelector('.legal-modal__overlay');


/* モーダルを開く */
function openPrivacyModal(event) {
  event.preventDefault();

  privacyModal.classList.add('is-open');
  privacyModal.setAttribute('aria-hidden', 'false');

  document.body.style.overflow = 'hidden';
}


/* モーダルを閉じる */
function closePrivacyModal() {
  privacyModal.classList.remove('is-open');
  privacyModal.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';
}


/* プライバシーポリシーを押したら開く */
privacyOpenButtons.forEach(function (button) {
  button.addEventListener('click', openPrivacyModal);
});


/* ×を押したら閉じる */
privacyCloseButton.addEventListener('click', closePrivacyModal);


/* モーダル外の暗い部分を押しても閉じる */
privacyOverlay.addEventListener('click', closePrivacyModal);


/* Escキーでも閉じる */
document.addEventListener('keydown', function (event) {
  if (
    event.key === 'Escape' &&
    privacyModal.classList.contains('is-open')
  ) {
    closePrivacyModal();
  }
});

/* ========================================
   特定商取引法 モーダル
======================================== */

const lawModal = document.getElementById('lawModal');
const lawOpenButtons = document.querySelectorAll('.js-law-open');
const lawCloseButton = lawModal.querySelector('.legal-modal__close');
const lawOverlay = lawModal.querySelector('.legal-modal__overlay');


/* モーダルを開く */
function openLawModal(event) {
  event.preventDefault();

  lawModal.classList.add('is-open');
  lawModal.setAttribute('aria-hidden', 'false');

  document.body.style.overflow = 'hidden';
}


/* モーダルを閉じる */
function closeLawModal() {
  lawModal.classList.remove('is-open');
  lawModal.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';
}


/* 「特定商取引法に基づく表記」を押したら開く */
lawOpenButtons.forEach(function (button) {
  button.addEventListener('click', openLawModal);
});


/* ×で閉じる */
lawCloseButton.addEventListener('click', closeLawModal);


/* 暗い背景を押して閉じる */
lawOverlay.addEventListener('click', closeLawModal);


/* Escキーで閉じる */
document.addEventListener('keydown', function (event) {
  if (
    event.key === 'Escape' &&
    lawModal.classList.contains('is-open')
  ) {
    closeLawModal();
  }
});

/* ========================================
   運営会社 モーダル
======================================== */

const companyModal = document.getElementById('companyModal');
const companyOpenButtons = document.querySelectorAll('.js-company-open');
const companyCloseButton = companyModal.querySelector('.legal-modal__close');
const companyOverlay = companyModal.querySelector('.legal-modal__overlay');


function openCompanyModal(event) {
  event.preventDefault();

  companyModal.classList.add('is-open');
  companyModal.setAttribute('aria-hidden', 'false');

  document.body.style.overflow = 'hidden';
}


function closeCompanyModal() {
  companyModal.classList.remove('is-open');
  companyModal.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';
}


companyOpenButtons.forEach(function (button) {
  button.addEventListener('click', openCompanyModal);
});


companyCloseButton.addEventListener('click', closeCompanyModal);


companyOverlay.addEventListener('click', closeCompanyModal);


document.addEventListener('keydown', function (event) {
  if (
    event.key === 'Escape' &&
    companyModal.classList.contains('is-open')
  ) {
    closeCompanyModal();
  }
});