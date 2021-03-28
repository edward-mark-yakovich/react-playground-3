/////// --------
// check Obj empty
/////// --------
export const isEmptyObj = obj => Object.keys(obj).length === 0;

/////// --------
// check email string
/////// --------
export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;

  return re.test(email);
}

/////// --------
// log errors
/////// --------
export function logErrorRemotely(error, errorInfo = {}) {
  try {
    // an error occured
    console.log('App error - do stuff with error...');
    console.log(error);
    console.log(errorInfo);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
}

/////// --------
// fake request for login
/////// --------
export async function fakeLogin({email, password}) {
  const bodyEl = document.querySelector('body');

  bodyEl.classList.add('_request-active');

  const loginPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'ed@mycompany.com' && password === 'password') {
        resolve();
      } else {
        reject();
      }

      bodyEl.classList.remove('_request-active');
    }, 1000);
  });

  return loginPromise;
}

/////// --------
// fake request for password reset
/////// --------
export async function fakePasswordReset({email}) {
  const bodyEl = document.querySelector('body');

  bodyEl.classList.add('_request-active');

  const resetPassPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (validateEmail(email)) {
        resolve();
      } else {
        reject();
      }

      bodyEl.classList.remove('_request-active');
    }, 1000);
  });

  return resetPassPromise;
}
