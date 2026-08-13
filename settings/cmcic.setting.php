<?php

return [
  'cmcic_checkout_mode' => [
    'group_name' => 'Monetico Settings',
    'group' => 'cmcic',
    'name' => 'cmcic_checkout_mode',
    'type' => 'String',
    'html_type' => 'select',
    'default' => 'hosted_page',
    'add_to_setting_form' => FALSE,
    'is_domain' => 1,
    'is_contact' => 0,
    'title' => 'Checkout mode',
    'description' => 'Select the Monetico checkout experience shared by all CiviCRM payment forms.',
    'pseudoconstant' => [
      'callback' => 'CRM_Cmcic_CheckoutMode::getOptions',
    ],
  ],
  'cmcic_enable_refunds' => [
    'group_name' => 'Monetico Settings',
    'group' => 'cmcic',
    'name' => 'cmcic_enable_refunds',
    'type' => 'Boolean',
    'default' => FALSE,
    'add_to_setting_form' => FALSE,
    'is_domain' => 1,
    'is_contact' => 0,
    'description' => 'Enable online refund support via Monetico recredit_paiement API.',
    'help_text' => 'Requires merchant server IP whitelisting with Monetico.',
  ],
];
