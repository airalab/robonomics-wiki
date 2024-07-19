const captcha = require('@hcaptcha/vanilla-hcaptcha');

document.addEventListener('DOMContentLoaded', function ()  {

	const feedbackItems = document.querySelectorAll('.robo-wiki-feedback__item');
	const feedbackForms = document.querySelectorAll('.robo-wiki-feedback-form__form');
	const feedbackFormsCloseButton = document.querySelectorAll('.robo-wiki-feedback-form__close');
	const signupCaptcha = document.getElementById('signupCaptcha');

	let currForm = null;

	// remove all active statuses from reaction item
	const removeAllActive = (selector) => {
		document.querySelectorAll(selector).forEach(s => {
			s.classList.remove('active')
			s.querySelector('.robo-wiki-feedback__checkbox input').checked = false;
		})
	}

	const sendData = async (request) => {

			currForm.querySelector('.robo-wiki-feedback-form__btn-wrapper--init').classList.add('hide')
			currForm.querySelector('.robo-wiki-feedback-form__btn-wrapper--wait').classList.remove('hide')
			currForm.querySelector('.robo-wiki-feedback-form__btn').disabled = true;

			let response = await fetch( 'https://script.google.com/macros/s/' + process.env.GSCRIPT_ID + '/exec',
			{
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: request
			})

			if (response.ok) {
				currForm.querySelector('.robo-wiki-feedback-form__btn').classList.add('hide')
				currForm.closest('.robo-wiki-feedback-form__wrapper').querySelector('.robo-wiki-feedback-form__success').classList.remove('hide')
					return true
			} else {
				currForm.querySelector('.robo-wiki-feedback-form__btn').disabled = false
				return response.status
			}
	}

	// close form
	feedbackFormsCloseButton.forEach(btn => {
		btn.addEventListener('click', () => {
			removeAllActive('.robo-wiki-feedback__wrapper');
		})
	})

	feedbackItems.forEach(f => {
		f.addEventListener('click', (e) => {
			removeAllActive('.robo-wiki-feedback__wrapper');
			e.target.closest('.robo-wiki-feedback__wrapper').classList.add('active');
			e.target.closest('.robo-wiki-feedback__wrapper').querySelector('.robo-wiki-feedback__checkbox input').checked = true;

			currForm = 	e.target.closest('.robo-wiki-feedback__wrapper').querySelector('form');
		})
	})

	feedbackForms.forEach(form => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			signupCaptcha.execute();
		})
	})

	signupCaptcha.addEventListener('verified', async (e) => {
		let response = '',
				data = currForm.querySelectorAll('[data-gsp-name]');

		data.forEach(function(item, index, array) {

			if (response != '') {
				response += '&'
			}

			response += item.dataset.gspName + '=' + encodeURIComponent(item.value)

		});

	 await sendData(response)

	});

	signupCaptcha.addEventListener('error', (e) => {
			console.log('error event', {error: e.error});
	});


})
