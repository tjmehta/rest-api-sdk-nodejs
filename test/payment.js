/* Copyright 2013 PayPal */
"use strict";

var chai = require('chai'),
	expect = chai.expect,
	should = chai.should();

var paypal_sdk = require('../');


var config_opts = {
	'host': 'api.sandbox.paypal.com',
	'port': '',
	'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
	'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
};


var create_payment_json_card = {
	"intent": "sale",
	"payer": {
		"payment_method": "credit_card",
		"funding_instruments": [{
			"credit_card": {
				"type": "visa",
				"number": "4417119669820331",
				"expire_month": "11",
				"expire_year": "2018",
				"cvv2": "874",
				"first_name": "Joe",
				"last_name": "Shopper",
				"billing_address": {
					"line1": "52 N Main ST",
					"city": "Johnstown",
					"state": "OH",
					"postal_code": "43210",
					"country_code": "US"
				}
			}
		}]
	},
	"transactions": [{
		"amount": {
			"total": "7",
			"currency": "USD",
			"details": {
				"subtotal": "5",
				"tax": "1",
				"shipping": "1"
			}
		},
		"description": "This is the payment transaction description."
	}]
};



describe('SDK', function () {
	describe('#createpaymentusingcard', function () {
		it('payment should be created', function (done) {


			paypal_sdk.payment.create(create_payment_json_card, config_opts, function (err, res) {
				if (err) {
					throw err;
				}

				if (res) {
					expect(res.id).to.contain('PAY-');
					paypal_sdk.payment.get(res.id, config_opts, function (get_err, get_res) {
						if (get_err) {
							throw get_res;
						}

						if (get_res) {
							expect(get_res.state).to.contain('approved');
							done();
						}

					});
				}
			});

		});
	});
});


var create_payment_json_savedcard = {
	"intent": "sale",
	"payer": {
		"payment_method": "credit_card",
		"funding_instruments": [{
			"credit_card_token": {
				"credit_card_id": "CARD-3SP328368F401020AKFKCYUQ"
			}
		}]
	},
	"transactions": [{
		"amount": {
			"total": "7",
			"currency": "USD",
			"details": {
				"subtotal": "5",
				"tax": "1",
				"shipping": "1"
			}
		},
		"description": "This is the payment transaction description."
	}]
};

describe('SDK', function () {
	describe('#createpaymentusingsavedcard', function () {
		it('payment should be created', function (done) {

			paypal_sdk.payment.create(create_payment_json_savedcard, config_opts, function (err, res) {
				if (err) {
					throw err;
				}

				if (res) {
					expect(res.id).to.contain('PAY-');
					done();
				}
			});

		});
	});
});


var create_payment_json_paypal = {
	"intent": "sale",
	"payer": {
		"payment_method": "paypal"
	},
	"transactions": [{
		"amount": {
			"total": "7",
			"currency": "USD",
			"details": {
				"subtotal": "5",
				"tax": "1",
				"shipping": "1"
			}
		},
		"description": "This is the payment transaction description."
	}],
	"redirect_urls": {
		"return_url": "http://localhost/paymentwithpaypal?guid=b64644f236ed484fb047ec3439fb7a3f",
		"cancel_url": "http://localhost/paymentwithpaypal?guid=b64644f236ed484fb047ec3439fb7a3f"
	}
};

describe('SDK', function () {
	describe('#createpaymentusingpaypal', function () {
		it('payment should be created', function (done) {


			paypal_sdk.payment.create(create_payment_json_paypal, config_opts, function (err, res) {
				if (err) {
					throw err;
				}

				if (res) {
					expect(res.id).to.contain('PAY-');
					done();
				}
			});

		});
	});
});