const btnEdit = document.getElementById('edit-personal')
const btnSave = document.getElementById('save-personal')
const emailIpt = document.getElementById('input-email')
const phoneIpt = document.getElementById('input-phone')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const usernamePlace = document.getElementById('fullname')

document.addEventListener('DOMContentLoaded', ()=>{
    let username_display = sessionStorage.getItem('username')
    usernamePlace.innerHTML = username_display
})

btnEdit.addEventListener('click', () => {
    emailIpt.value = email.innerHTML
    phoneIpt.value = phone.innerHTML
    setTimeout(() => {
        email.classList.add('hide')
        phone.classList.add('hide')
        btnEdit.classList.add('hide')
        emailIpt.classList.remove('hide')
        phoneIpt.classList.remove('hide')
        btnSave.classList.remove('hide')
    }, 50)
})

let emailErrorText = "";
function validateEmail(email) {
    if (!email) {
        emailErrorText = "*Please enter your email!";
        return false;
    }
    email = email.trim();

    if (email.length === 0) {
        emailErrorText = "*Please enter your email!";
        return false;
    }

    const atIndex = email.indexOf('@');
    if (atIndex === -1 || email.indexOf('@', atIndex + 1) !== -1) {
        emailErrorText = "*Email must contain exactly one @ symbol!";
        return false;
    }

    const [localPart, domain] = email.split('@');

    if (localPart.length === 0 || domain.length === 0) {
        emailErrorText = "*Part before and after @ can't be empty!";
        return false;
    }

    if (localPart.includes('..') || domain.includes('..')) {
        emailErrorText = "*Email can't contain double dot(.)!";
        return false;
    }

    if (localPart.startsWith('.') || localPart.endsWith('.') || domain.startsWith('.') || domain.endsWith('.')) {
        emailErrorText = "*Email can't start or end with dot(.)!";
        return false;
    }
    // EMAILPRINTABLE CHARACTERS FROM GOOGLE
    const printableCharacters = "!#$%&'*+-/=?^_`{|}~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let char of localPart) {
        if (!printableCharacters.includes(char) && char !== '.') {
            emailErrorText = "*Email can't contain double @!";
            return false;
        }
    }

    for (let char of domain) {
        if (!printableCharacters.includes(char) && char !== '.') {
            emailErrorText = "*Email can't contain double @!";
            return false;
        }
    }

    // Check domain extension
    const validExtensions = ['.com', '.ac.id', '.co.id'];
    const domainExtension = domain.substring(domain.lastIndexOf('.'));
    if (!validExtensions.includes(domainExtension)) {
        emailErrorText = "*Invalid domain extension. Allowed extensions are .com, .ac.id, .co.id";
        return false;
    }

    return true;
}

function validateEmailComposition() {
    const emailTxt = emailIpt.value;
    const emailError = document.getElementById('error-email');
    if (!validateEmail(emailTxt) || emailTxt.charAt(0) == '@' || emailTxt.charAt(0) == '.' || !emailTxt.search("@") || emailTxt === "@.com" || emailTxt.includes("..") || emailTxt.endsWith("@") || emailTxt.endsWith(".")) {
        emailError.innerHTML = emailErrorText;
        emailError.classList.remove('hide')
        emailIpt.classList.add('errorBox')
        return false;
    } else {
        emailIpt.classList.remove('errorBox')
        emailError.classList.add('hide')
        return true;
    }
}

let phoneErrorTxt = "";
function validatePhone(phoneTxt) {
    console.log(phoneTxt)
    if (phoneTxt === "") {
        phoneErrorTxt = "*Phone number can't be empty!"
        return false
    }
    if (!(/^\d+$/.test(phoneTxt))) {
        phoneErrorTxt = "*Phone number must contain only numbers!"
        return false
    }
    if (phoneTxt.length < 8) {
        phoneErrorTxt = "*Phone number must be more than 8 digit!"
        return false
    }
    return true
}

function validatePhoneComposition() {
    const phoneTxt = phoneIpt.value;
    const phoneError = document.getElementById('error-phone');
    console.log(phoneTxt)
    console.log(phoneError)
    if (!validatePhone(phoneTxt)) {
        phoneError.innerHTML = phoneErrorTxt;
        phoneError.classList.remove('hide')
        phoneIpt.classList.add('errorBox')
        return false
    } else {
        phoneIpt.classList.remove('errorBox')
        phoneError.classList.add('hide')
        return true
    }
}

btnSave.addEventListener('click', () => {
    let validEmail = validateEmailComposition();
    let validPhone = validatePhoneComposition();
    if (validEmail && validPhone) {
        email.innerHTML = emailIpt.value
        phone.innerHTML = phoneIpt.value
        setTimeout(() => {
            email.classList.remove('hide')
            phone.classList.remove('hide')
            btnEdit.classList.remove('hide')
            emailIpt.classList.add('hide')
            phoneIpt.classList.add('hide')
            btnSave.classList.add('hide')
        }, 50)
    }
})

function togglePopup() {
    const overlay = document.getElementById('popupEditAdr');
    overlay.classList.toggle('show');
}

const form = document.querySelector(".form-container");
const btnCancelAdr = document.getElementById("btnCancel-adrForm");
const btnRequest = document.getElementById("btnReq-adrForm");

btnCancelAdr.addEventListener("click", function (event) {
    event.preventDefault();
    closeForm();
    togglePopup();
});

function isEmpty(str){
    return (!str)
}

function checkForm(){
    const province = document.getElementById('provinsi').value
    const kota = document.getElementById('kota').value
    const kecamatan = document.getElementById('kecamatan').value
    const kelurahan = document.getElementById('kelurahan').value
    const jalan = document.getElementById('jalan').value

    if(isEmpty(province) || isEmpty(kota) || isEmpty(kecamatan)|| isEmpty(kelurahan)||isEmpty(jalan)){
        return False;
    } else {
        requestSent();
    }
}

function requestSent(){
    closeForm();
    togglePopup();
    document.querySelector('.popup').style.visibility = 'visible';
    setTimeout(() => {
       window.location.href = 'profileUser.html';
    }, 1000);
}

// btnRequest.addEventListener("click", function (event){
//     closeForm();
//     document.querySelector('.popup').style.visibility = 'visible';
//     setTimeout(() => {
//        window.location.href = 'profileUser.html';
//     }, 2000);
// })

function closeForm() {
    const popupBox = document.querySelector(".popup-box");
    popupBox.classList.add("fadeOutDown");
    setTimeout(() => {
        popupBox.classList.remove("fadeOutDown");
    }, 500);
}

function submitForm() {
    // You can perform any additional validation here before submitting the form

    form.submit();
}

let checkCancel = false;
const btnCancelList = document.querySelectorAll(".btnRecentMd.btnCancel");
const btnCancelFormAddress = document.querySelector(".btn2.btnCancel")
// const btnSubmitFormAddress = document.querySelector(".btn2.btnRequest")
// console.log(btnCancelFormAddress)
const cancelPopUp = document.querySelector(".cancelPopUp.popUpPeminjaman");
const cancelPopUpForm = document.querySelector(".cancelPopUp.popUpForm");

btnCancelList.forEach(btn => {
  btn.addEventListener("click", () => {
    cancelPopUp.style.zIndex = "9999";
    cancelPopUp.style.visibility = "visible";
  });
});

btnCancelFormAddress.addEventListener("click", () => {
    cancelPopUpForm.style.zIndex = "9999";
    cancelPopUpForm.style.visibility = "visible";
});

const popUpIya = document.querySelector(".popUpIya");
const popUpTidak = document.querySelector(".popUpTidak");

popUpIya.addEventListener("click", () => {
  cancelPopUp.style.visibility = "collapse";
  cancelPopUp.style.zIndex = "-1000";
  checkCancel = false;
});

popUpTidak.addEventListener("click", () => {
  cancelPopUp.style.zIndex = "-1000";
  cancelPopUp.style.visibility = "collapse";
  checkCancel = false;
});

const popUpIyaForm = document.querySelector('.popUpIya.popSelect.popForm');
const popUpTidakForm = document.querySelector('.popUpTidak.popSelect.popForm');

popUpIyaForm.addEventListener("click", () => {
    cancelPopUpForm.style.visibility = "collapse";
    cancelPopUpForm.style.zIndex = "-1000";
    checkCancel = false;
    form.reset();
});

popUpTidakForm.addEventListener("click", () => {
    cancelPopUpForm.style.zIndex = "-1000";
    cancelPopUpForm.style.visibility = "collapse";
    checkCancel = false;
    togglePopup();
});



// LOGOUT
function logout(){
    sessionStorage.setItem('username', "");
    window.location.href = "index.html";
}