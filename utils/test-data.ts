export default {
  newUser: {
    name: 'Test Freeman',
    email: `testfreeman@test.com`,
    password: 'Test1234',
    gender: 'male',
    day: '10',
    month: '10',
    year: '2000',
    firstName: 'Test',
    lastName: 'Freeman',
    address: '123 Test Street',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5V1E3',
    mobileNumber: '+14165550000',
  },
  existingUser: {
    email: process.env.TEST_USER_EMAIL || 'lamineamgad@test.com',
    password: process.env.TEST_USER_PASSWORD || 'Test1234',
  },
  product: {
    keyword: 'men tshirt',
  },
  paymentData: {
    nameOnCard: 'Ahmed Sameh',
    cardNumber: '4242424242424242', 
    cvc: '311',
    expiryMonth: '11',
    expiryYear: '2028',
  }
};
