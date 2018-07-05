//- 导航选中样式active
var $nav = $('.nav.nav-pills.flex-column');
//- 单击事件
$nav.children().click(function() {
  //- 清除所有active
  $nav.find('a.nav-link').attr({class: "nav-link"});
  //- 给当前导航添加active
  $(this).find('a.nav-link').addClass('active');
  //- 展示当前板块
  showContainer($(this));
});

//- 选择所有板块
var $userIfo = $('#userIfo');
var $usertable = $('table#userTab');
var $addAUser = $('#addAUser');
var $showList = [ $userIfo, $usertable, $addAUser ];
//- 隐藏板块
var $hideAll = function(except) {
  for(let i=except; i<$showList.length; i++) {
    $showList[i].hide();
  }
};
//- 隐藏除Home外的其他板块
$hideAll(1);

//- 显示所需板块
function showContainer($navbar) {
  var $isActive = $navbar.text();
  $hideAll(0);
  switch ($isActive) {
    case 'Home': 
      $userIfo.show();
      break;
    case 'User':
      $usertable.show();
      break;
    case 'AddAUser':
      $addAUser.show();
      break;
    default:
      $userIfo.show();
      alert('There are something error!');
  }
}