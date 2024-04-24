// gallery.js

$(document).ready(function(){
  // 1. 변수선언
  let g_img = $('.g_list li a');
  let img_url;
  // 2. 이벤트
  g_img.hover(function(){ //mouseenter
    $(this).find('.caption').stop().animate({'bottom':'0px'},300);
  }, function(){ //mouseleave
    $('.caption').stop().animate({'bottom':'-40px'},100);
  });

  // 3. 이미지 클릭시 모달 윈도 띄우기
  g_img.click(function(e){
    e.preventDefault();
    // 선택한 a요소의 href속성값을 변수에 저장한다.
    img_url = $(this).attr('href');
    // 저장된 img_url값을 출력해본다.
    // console.log(img_url);
    let modal = `
      <div class="modal">
        <div class='m_inner'>
          <img src="${img_url}" alt="">
          <input type="button" value="닫기" class="c_btn">
        </div>
      </div>
    `;
    // body뒤에 모달내용을 출력한다.
    $('body').append(modal);
    // return false;
    // 닫기 버튼 클릭시 모달을 숨겨라
    $('.modal .c_btn').click(function(){
      // alert('click');
      $('.modal').fadeOut();
    })
  });
});