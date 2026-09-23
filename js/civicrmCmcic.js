(function ($, Drupal, ts) {
  'use strict';

  function normaliseHttpUrl(value) {
    try {
      var url = new URL(value, window.location.href);
      return /^https?:$/.test(url.protocol) ? url : null;
    }
    catch (error) {
      return null;
    }
  }

  function getAjaxForm(ajax) {
    if (!ajax || !ajax.element) {
      return null;
    }
    if (ajax.element.form) {
      return ajax.element.form;
    }
    if (typeof ajax.element.closest === 'function') {
      return ajax.element.closest('form');
    }
    return null;
  }

  function showRedirectFallback(rawUrl, ajax) {
    var url = normaliseHttpUrl(rawUrl);
    if (!url) {
      return;
    }

    var existing = document.getElementById('cmcic-secure-redirect');
    if (existing) {
      existing.remove();
    }

    var panel = document.createElement('section');
    panel.id = 'cmcic-secure-redirect';
    panel.className = 'crm-block messages status no-popup';
    panel.setAttribute('role', 'status');
    panel.setAttribute('aria-live', 'polite');
    var title = document.createElement('h2');
    title.textContent = ts('Secure redirect');
    var message = document.createElement('p');
    message.textContent = ts('You are being redirected to Monetico to complete your payment securely.');
    var linkParagraph = document.createElement('p');
    var link = document.createElement('a');
    link.className = 'button crm-button btn btn-primary';
    link.href = url.href;
    link.target = '_top';
    link.rel = 'noopener';
    link.textContent = ts('Continue to secure payment');
    linkParagraph.appendChild(link);
    var warning = document.createElement('p');
    warning.hidden = true;
    warning.textContent = ts('The automatic redirect appears to be blocked. Use the button above to continue.');
    panel.appendChild(title);
    panel.appendChild(message);
    panel.appendChild(linkParagraph);
    panel.appendChild(warning);
    var form = getAjaxForm(ajax);
    if (form) {
      form.hidden = true;
      form.setAttribute('aria-hidden', 'true');
    }
    document.body.insertBefore(panel, document.body.firstChild);

    window.onbeforeunload = null;
    $(window).off('beforeunload');
    window.setTimeout(function () {
      try {
        window.top.location.href = url.href;
      }
      catch (error) {
        warning.hidden = false;
      }
    }, 200);
    window.setTimeout(function () {
      warning.hidden = false;
    }, 4000);
  }

  if (Drupal && Drupal.AjaxCommands) {
    Drupal.AjaxCommands.prototype.cmcicRedirect = function (ajax, response) {
      if (response.url) {
        showRedirectFallback(response.url, ajax);
      }
    };
  }
}(CRM.$, window.Drupal, CRM.ts('nz.co.fuzion.cmcic')));
