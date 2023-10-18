const loginIdValidator = new FieldValidator('txtLoginId', function (val) {
  if (!val) {
    return '请填写账号';
  }
});

const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
  if (!val) {
    return '请填写密码';
  }
});

const form = $('.user-form');
form.onsubmit = async (e) => {
  e.preventDefault();
  const result = await FieldValidator.validate(
    loginIdValidator,
    loginPwdValidator
  );
  if (!result) {
    return; // 验证未通过
  }
  const formdata = new FormData(form);
  const data = Object.fromEntries(formdata.entries());

  const resp = await API.login(data);
  if (resp.code === 0) {
    alert('登录成功，点击确定，跳转到首页');
    location.href = '/talk/index.html';
  }else{
    loginIdValidator.p.innerText = '账号或者密码错误，请重新输入';
    loginPwdValidator.input.value = "";
  }
}