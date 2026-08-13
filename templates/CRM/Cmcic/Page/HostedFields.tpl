<div class="crm-block crm-form-block crm-cmcic-hosted-fields-form-block">
  <h1>{ts}Secure card payment{/ts}</h1>
  <p>{ts 1=$amount}Amount: %1{/ts}</p>
  {if $isTest}
    <div class="messages status no-popup">{ts}Monetico sandbox: no real payment will be collected.{/ts}</div>
  {/if}
  {if $paymentError}
    <div class="messages error no-popup">{$paymentError|escape}</div>
  {/if}

  {if $nextStep}
    <p>{ts}Authentication with your bank is required to complete this payment.{/ts}</p>
    {if $nextStep.step == 'technical_information_collecting'}
      <iframe name="cmcic-3ds-method" style="width:0;height:0;border:0" title=""></iframe>
      <form method="post" action="{$nextStep.url|escape}" target="cmcic-3ds-method" id="cmcic-next-step-form">
        {foreach from=$nextStep.data key=name item=value}
          <input type="hidden" name="{$name|escape}" value="{$value|escape}">
        {/foreach}
      </form>
      <form method="post" id="cmcic-technical-complete-form">
        <input type="hidden" name="technical_complete" value="1">
      </form>
      {literal}<script>
        document.getElementById('cmcic-next-step-form').submit();
        window.setTimeout(function () {
          document.getElementById('cmcic-technical-complete-form').submit();
        }, 10000);
      </script>{/literal}
    {else}
      <form method="post" action="{$nextStep.url|escape}" id="cmcic-next-step-form">
        {foreach from=$nextStep.data key=name item=value}
          <input type="hidden" name="{$name|escape}" value="{$value|escape}">
        {/foreach}
        <button type="submit" class="crm-form-submit default">{ts}Continue authentication{/ts}</button>
      </form>
      {literal}<script>document.getElementById('cmcic-next-step-form').submit();</script>{/literal}
    {/if}
  {else}
  <form method="post" id="cmcic-hosted-fields-form">
    <input type="hidden" name="browser_info" id="cmcic-browser-info" value="">
    <div class="crm-section">
      <div class="label"><label>{ts}Card number{/ts}</label></div>
      <div class="content"><div class="cmcic-hosted-field" id="cmcic-card-number"></div></div>
    </div>
    <div class="crm-section">
      <div class="label"><label>{ts}Expiry date{/ts}</label></div>
      <div class="content"><div class="cmcic-hosted-field" id="cmcic-card-expiry"></div></div>
    </div>
    <div class="crm-section">
      <div class="label"><label>{ts}Security code{/ts}</label></div>
      <div class="content"><div class="cmcic-hosted-field" id="cmcic-card-cvx"></div></div>
    </div>
    <div class="crm-section">
      <div class="label"><label>{ts}Name on card{/ts}</label></div>
      <div class="content"><div class="cmcic-hosted-field" id="cmcic-cardholder-name"></div></div>
    </div>
    <div id="cmcic-hosted-fields-error" class="messages error no-popup" hidden></div>
    <div class="crm-submit-buttons">
      <button type="submit" id="cmcic-hosted-fields-submit" class="crm-form-submit default" disabled>{ts}Pay securely{/ts}</button>
      <a class="button" href="{$cancelUrl|escape}">{ts}Cancel{/ts}</a>
    </div>
  </form>
  {/if}
</div>

{literal}
<style>
  .cmcic-hosted-field { min-height: 44px; max-width: 32rem; }
  .crm-cmcic-hosted-fields-form-block .crm-section { margin-bottom: 1rem; }
</style>
{/literal}
