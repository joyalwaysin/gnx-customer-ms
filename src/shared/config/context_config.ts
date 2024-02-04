/* eslint-disable prettier/prettier */

export default {
  ContextConstants : { 
    CLIENT: { 
      NAME_ADDRESS: "name_and_address", 
      CONTACT: "contact", 
      NATIONALITY: "nationality", 
      PERSONAL: "personal", 
      HEALTH_NOTE: "health_note", 
      EMPLOYMENT: "employment", 
      ATTITUDE_TO_RISK: "attitude_to_risk", 
      IDENTITY: "identity", 
      OBJECTIVES: "objectives", 
      ADMINISTRATION: "administration", 
      ADMINISTRATION_COMPLAINCE: "compliance", 
      SERVICE_TYPE: "service_type" 
    }, 
    PARTNER: { 
      NAME_ADDRESS: "partner_name_and_address", 
      CONTACT: "partner_contact", 
      NATIONALITY: "partner_nationality", 
      PERSONAL: "partner_personal", 
      HEALTH_NOTE: "partner_health_note", 
      EMPLOYMENT: "partner_employment", 
      ATTITUDE_TO_RISK: "partner_attitude_to_risk", 
      IDENTITY: "partner_identity", 
      OBJECTIVES: "partner_objectives", 
      SERVICE_TYPE: "partner_service_type", 
    }, 
    INCOME: "income", 
    OUTGOINGS: "outgoings", 
    ADDRESS_BOOK: "address_book", 
    DEPENDANTS: "dependants", 
    ASSET: { 
      INVESTMENT : { 
        ASSET: "asset_investment_asset", 
        REVIEW: "asset_investment_review", 
        CONTRACT_ENQUIRY: "asset_investment_contract_enquiry",
        FUND: "asset_investment_fund", 
        PAYMENT: "asset_investment_payment", 
        PAYMENT_COMMISSION: "asset_investment_payment_commission", 
        PAYMENT_COMPLAINCE: "asset_investment_payment_complaince", 
        WITHDRAWALS: "asset_investment_withdrawals", 
        ACTIONS: "asset_investment_actions", 
        VALUATION: "asset_investment_valuation", 
      }, 
      SHARE_HOLDINGS : { 
        ASSET: "asset_share_holdings_asset", 
        REVIEW: "asset_share_holdings_review", 
        PAYMENT: "asset_share_holdings_payment", 
        PAYMENT_COMPLAINCE: "asset_share_holdings_complaince", 
        PAYMENT_COMMISSION: "asset_share_holdings_commission", 
        WITHDRAWALS: "asset_share_holdings_withdrawals", 
        VALUATION: "asset_share_holdings_valuation", 
      }, 
      HOME_PERSONAL: { 
        ASSET: "asset_home_personal_asset", 
        REVIEW: "asset_home_personal_review", 
        VALUATION: "asset_home_personal_valuation", 
      },
      BANKS_BUILDING_SOCIETIES:{ 
      ASSET: "asset_banks_building_societies_asset", 
      REVIEW: "asset_banks_building_societies_review", 
      PAYMENT: "asset_banks_building_societies_payment", 
      PAYMENT_COMMISSION: "asset_banks_building_societies_payment_commission", 
      COMPLAINCE: "asset_banks_building_societies_complaince", 
      WITHDRAWALS: "asset_banks_building_societies_withdrawals", 
      VALUATION: "asset_banks_building_societies_valuation", 
      } 
    }, 
  LIABILITIES:{ 
  MORTGAGES:{ 
  LIABILITY:"liabilities_mortgages_liability", 
  REVIEW:"liabilities_mortgages_review", 
  PAYMENT:"liabilities_mortgages_payment", 
  PAYMENT_COMPLAINCE:"liabilities_mortgages_payment_complaince", 
  PAYMENT_COMMISSION:"liabilities_mortgages_payment_commission", 
  }, 
  LOAN_HIRE_PURCHASE:{ 
  LIABILITY:"liabilities_loan_hire_purchase_liability", 
  REVIEW:"liabilities_loan_hire_purchase_review", 
  PAYMENTS:"liabilities_loan_hire_purchase_payments", 
  PAYMENTS_COMPLAINCE:"liabilities_loan_hire_purchase_payments_complaince", 
  PAYMENTS_COMMISSION:"liabilities_loan_hire_purchase_payments_commission", 
  ACTION:"liabilities_loan_hire_purchase_payments_action", 
  }, 
  CREDIT_CARDS:{ 
  LIABILITY:"liabilities_credit_cards_liability", 
  REVIEW:"liabilities_credit_cards_review", 
  PAYMENTS:"liabilities_credit_cards_payments", 
  PAYMENTS_COMPLAINCE:"liabilities_credit_cards_payments_complaince", 
  PAYMENTS_COMMISSION:"liabilities_credit_cards_payments_commission", 
  },}, 
   POLICIES: {
      LIFE_ASSURANCE: {
        POLICY: "policies_life_assurance_policy",
        REVIEW: "policies_life_assurance_review",
        CONTRACT_ENQUIRY: "policies_life_assurance_contract_enquiry",
        FUNDS: "policies_life_assurance_funds",
        PAYMENT: "policies_life_assurance_payment",
        WITHDRAWALS: "policies_life_assurance_withdrawals",
        ACTIONS: "policies_life_assurance_actions",
        VALUATION: "policies_life_assurance_valuation"
      },
      PENSIONS: {
        POLICY: "policies_pensions_policy",
        REVIEW: "policies_pensions_review",
        CONTRACT_ENQUIRY: "policies_pensions_contract_enquiry",
        FUNDS: "policies_pensions_funds",
        PAYMENT: "policies_pensions_payment",
        WITHDRAWALS: "policies_pensions_withdrawals",
        ACTIONS: "policies_pensions_actions",
        VALUATION: "policies_pensions_valuation"
      },
      INVESTMENTS: {
        POLICY: "policies_investments_policy",
        REVIEW: "policies_investments_review",
        CONTRACT_ENQUIRY: "policies_investments_contract_enquiry",
        FUNDS: "policies_investments_funds",
        PAYMENT: "policies_investments_payments",
        WITHDRAWALS: "policies_investments_withdrawals",
        ACTIONS: "policies_investments_actions",
        VALUATION: "policies_investments_valuation"
      },
      SAVINGS_PLANS: {
        POLICY: "policies_savings_plans_policy",
        REVIEW: "policies_savings_plans_review",
        CONTRACT_ENQUIRY: "policies_savings_plans_contract_enquiry",
        FUNDS: "policies_savings_plans_funds",
        PAYMENT: "policies_savings_plans_payment",
        WITHDRAWALS: "policies_savings_plans_withdrawals",
        ACTIONS: "policies_savings_plans_actions",
        VALUATION: "policies_savings_plans_valuation"
      },
      INCOME_PROTECTION: {
        POLICY: "policies_income_protection_policy",
        REVIEW: "policies_income_protection_review",
        CONTRACT_ENQUIRY: "policies_income_protection_contract_enquiry",
        FUNDS: "policies_income_protection_funds",
        PAYMENT: "policies_income_protection_payment",
        WITHDRAWALS: "policies_income_protection_withdrawals",
        ACTIONS: "policies_income_protection_actions",
        VALUATION: "policies_income_protection_valuation"
      },
      HEALTH_ASSURANCE: {
        POLICY: "policies_health_assurance_policy",
        REVIEW: "policies_health_assurance_review",
        CONTRACT_ENQUIRY: "policies_health_assurance_contract_enquiry",
        FUNDS: "policies_health_assurance_funds",
        PAYMENT: "policies_health_assurance_payment",
        WITHDRAWALS: "policies_health_assurance_withdrawals",
        ACTIONS: "policies_health_assurance_actions",
        VALUATION: "policies_health_assurance_valuation"
      },
      GENERAL: {
        POLICY: "policies_general_policy",
        REVIEW: "policies_general_review",
        CONTRACT_ENQUIRY: "policies_general_contract_enquiry",
        FUNDS: "policies_general_funds",
        PAYMENT: "policies_general_payment",
        WITHDRAWALS: "policies_general_withdrawals",
        ACTIONS: "policies_general_actions",
        VALUATION: "policies_general_valuation"
      }
    },
    FACT_FIND_NOTES: "fact_find_notes",
    FEES_CHARGES: "fees_charges",

    CONTACTS:{
      CLIENT_ACTION: "contacts_client_action",
      NOTES: "contacts_notes",
      TIME_ALLOCATION: "contacts_time_allocation"
    },
    DOCUMENTS: "documents"
  }
}
