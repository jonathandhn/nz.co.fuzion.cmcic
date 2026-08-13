(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var config = CRM.vars.cmcicHostedFields;
    var submit = document.getElementById('cmcic-hosted-fields-submit');
    var error = document.getElementById('cmcic-hosted-fields-error');
    if (!window.MoneticoPaiement || !config || !submit) {
      return;
    }

    var hostedFields = MoneticoPaiement.HostedFields();
    if (!hostedFields.initialize(config.pointOfSale, config.token)) {
      error.textContent = CRM.ts('nz.co.fuzion.cmcic')('Unable to initialize the secure card fields.');
      error.hidden = false;
      return;
    }

    var style = {
      baseClass: {
        backgroundColorProperty: '#fff',
        borderProperty: '1px solid #8a8a8a',
        borderRadiusProperty: '4px',
        colorProperty: '#222',
        fontSizeProperty: '16px',
        paddingProperty: '10px'
      },
      focusedClass: { borderProperty: '2px solid #0b6efd' },
      invalidClass: { borderProperty: '2px solid #b00020' }
    };
    var fields = [
      ['cardNumber', 'cmcic-card-number', ['Card number']],
      ['cardExpDate', 'cmcic-card-expiry', ['MM', 'YY']],
      ['cardCvx', 'cmcic-card-cvx', ['CVV']],
      ['cardHolderName', 'cmcic-cardholder-name', ['Name on card']]
    ];
    fields.forEach(function (definition) {
      hostedFields.createField(definition[0], {
        placeholder: definition[2],
        style: style
      }).generate(definition[1]);
    });

    hostedFields.addEventListener('change', function (event) {
      submit.disabled = !event.detail.complete;
      if (event.detail.error) {
        error.textContent = CRM.ts('nz.co.fuzion.cmcic')('Please check the card details.');
        error.hidden = false;
      }
      else {
        error.hidden = true;
      }
    });

    document.getElementById('cmcic-hosted-fields-form').addEventListener('submit', function () {
      document.getElementById('cmcic-browser-info').value = JSON.stringify({
        java_enabled: typeof navigator.javaEnabled === 'function' ? navigator.javaEnabled() : false,
        language: navigator.language || 'fr-FR',
        color_depth: window.screen.colorDepth,
        screen_height: window.screen.height,
        screen_width: window.screen.width,
        timezone: new Date().getTimezoneOffset()
      });
      submit.disabled = true;
    });
  });
})();
