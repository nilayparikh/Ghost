// # Signup Test
// Test that signup works correctly

/*global CasperTest, casper, email */

CasperTest.emberBegin('Ghost signup fails properly', 5, function suite(test) {
    casper.thenOpenAndWaitForPageLoad('signup', function then() {
        test.assertUrlMatch(/ghost\/ember\/signup\/$/, 'Landed on the correct URL');
    });

    casper.then(function signupWithShortPassword() {
        casper.fillAndSave('#signup', {email: email, password: 'test'});
    });

    // should now throw a short password error
    casper.waitForSelector('.notification-error', function onSuccess() {
        test.assert(true, 'Got error notification');
        test.assertSelectorDoesntHaveText('.notification-error', '[object Object]');
    }, function onTimeout() {
        test.assert(false, 'No error notification :(');
    });

    casper.then(function signupWithLongPassword() {
        casper.fillAndSave('#signup', {email: email, password: 'testing1234'});
    });

    // should now throw a 1 user only error
    casper.waitForSelector('.notification-error', function onSuccess() {
        test.assert(true, 'Got error notification');
        test.assertSelectorDoesntHaveText('.notification-error', '[object Object]');
    }, function onTimeout() {
        test.assert(false, 'No error notification :(');
    });
}, true);