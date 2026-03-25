import { BasePage } from './base.page';

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  gender: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class RegisterPage extends BasePage {
  readonly nameField = this.page.locator('input[data-qa="signup-name"]');
  readonly emailField = this.page.locator('input[data-qa="signup-email"]');
  readonly signupButton = this.page.getByRole('button', { name: 'Signup' });

  // Account Info
  readonly genderMale = this.page.locator('#id_gender1');
  readonly genderFemale = this.page.locator('#id_gender2');
  readonly passwordField = this.page.locator('#password');
  readonly days = this.page.locator('#days');
  readonly months = this.page.locator('#months');
  readonly years = this.page.locator('#years');
  readonly checkboxNewsletter = this.page.locator('#newsletter');
  readonly checkboxOffers = this.page.locator('#optin');

  // Address Info
  readonly firstNameField = this.page.locator('#first_name');
  readonly lastNameField = this.page.locator('#last_name');
  readonly addressField = this.page.locator('#address1');
  readonly countrySelect = this.page.locator('#country');
  readonly stateField = this.page.locator('#state');
  readonly cityField = this.page.locator('#city');
  readonly zipcodeField = this.page.locator('#zipcode');
  readonly mobileNumberField = this.page.locator('#mobile_number');

  readonly createAccountButton = this.page.locator('button[data-qa="create-account"]');
  readonly accountCreatedSuccessfully = this.page.locator('h2:has-text("Account Created!")');
  readonly continueButton = this.page.locator('a[data-qa="continue-button"]');


  async registerNewUser(user: RegisterUser) {
    console.log(`Starting registration for: ${user.email}`);

    await this.navigateTo('/login');
    console.log('Navigated to login/registration page');

    await this.fill(this.nameField, user.name, 'Signup Name field');
    await this.fill(this.emailField, user.email, 'Signup Email field');
    await this.click(this.signupButton, 'Signup button');
    console.log('Submitted initial signup form');

    // Gender
    console.log('Setting gender...');
    const genderValue = user.gender?.toLowerCase().trim();
    if (genderValue === 'male') {
      await this.genderMale.check();
      console.log('Selected gender: male');
    } else if (genderValue === 'female') {
      await this.genderFemale.check();
      console.log('Selected gender: female');
    } else {
      throw new Error(
        `Invalid gender value: "${user.gender}". Expected "male" or "female".`
      );
    }

    // Account Info
    await this.passwordField.fill(user.password);
    console.log('Entered password');

    await this.days.selectOption(user.day);
    await this.months.selectOption(user.month);
    await this.years.selectOption(user.year);
    console.log(
      `Selected date of birth: ${user.day}/${user.month}/${user.year}`
    );

    await this.checkboxNewsletter.check();
    await this.checkboxOffers.check();
    console.log('Subscribed to newsletter and offers');

    // Address Info
    console.log('Filling address information...');
    await this.firstNameField.fill(user.firstName);
    await this.lastNameField.fill(user.lastName);
    await this.addressField.fill(user.address);
    await this.countrySelect.selectOption(user.country);
    await this.stateField.fill(user.state);
    await this.cityField.fill(user.city);
    await this.zipcodeField.fill(user.zipcode);
    await this.mobileNumberField.fill(user.mobileNumber);
    console.log('Address and contact information entered');

    await this.click(this.createAccountButton, 'Create Account button');
    console.log('Create Account form submitted');

    await this.expectVisible(this.accountCreatedSuccessfully, 'Account Created! message');
    console.log('Account created successfully and Continue button visible');

    await this.click(this.continueButton, 'Continue button');
    console.log('User continued to main page — Registration flow completed');
  }
}
