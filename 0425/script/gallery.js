// gallery.js

$(document).ready(function(){
  // 1. 변수선언
  let g_img = $('.g_list li a');
  const g_nav = $('.g_nav ul li a')
  let img_url, title;
  let n=1;
  let total_n = $('.g_list li').length;
  // 2. 이벤트
  g_img.hover(function(){ //mouseenter
    $(this).find('.caption').stop().animate({'bottom':'0px'},300);
  }, function(){ //mouseleave
    $('.caption').stop().animate({'bottom':'-40px'},100);
  });

  // 3. g_nav클릭시 act서식 적용하고 부모의 다른 형제요소의 자식요소 a에는 act 서식을 제거한다
  g_nav.click(function(e){
    e.preventDefault();
    // 해당 이벤트 발생 시, 이벤트의 전파를 막고 이벤트가 발생한 부분에서만 처리가 되게끔 만들어주는 메소드입니다.
    $(this).addClass('act').parent().siblings().find('a').removeClass('act');

    $('.g_list li').hide();
    let index = $(this).parent().index();
    if(index==0){
    // 1. 전체메뉴 클릭시 12장의 목록이 전체보여진다.
    // 기본 li목록은 무조건 숨기고, 해당하는 목록만 보여지게 한다.
    // $('.g_list li').fadeOut();
    $('.g_list li').fadeIn();
    }else if(index==1){
    // 2. 기획버튼 클릭시 .plan클래스 보여진다.
    // 기본 li목록은 무조건 숨기고, 해당하는 목록만 보여지게 한다.
    // $('.g_list li').fadeOut();
    $('.plan').fadeIn();
    }else if(index==2){
    // 3. 설계버튼 클릭시 .design클래스 보여진다.
    // 기본 li목록은 무조건 숨기고, 해당하는 목록만 보여지게 한다.
    // $('.g_list li').fadeOut();
    $('.design').fadeIn();
    }else if(index==3){
    // 4. 디자인버튼 클릭시 .ui클래스 보여진다.
    // 기본 li목록은 무조건 숨기고, 해당하는 목록만 보여지게 한다.
    // $('.g_list li').fadeOut();
    $('.ui').fadeIn();
    }else{
    // 5. 개발버튼 클릭시 .coding클래스 보여진다.
    // 기본 li목록은 무조건 숨기고, 해당하는 목록만 보여지게 한다.
    // $('.g_list li').fadeOut();
    $('.coding').fadeIn();
    }
  })

  // 4. 이미지 클릭시 모달 윈도 띄우기
  g_img.click(function(e){
    e.preventDefault();
    // 선택한 a요소의 href속성값을 변수에 저장한다.
    img_url = $(this).attr('href');
    // 저장된 img_url값을 출력해본다.
    // console.log(img_url);
    title = $(this).attr('title');
    // txt값 가져오기
    // 1. a요소의 title값 / let txt = $(this).attr('title');
    // 2. img요소의 alt값 / let txt = $(this).find('img').attr('alt');
    // 3. span의 txt값 / let txt = $(this).find('span').text();
    n = $(this).parent().index() +1;
    let modal = `
      <div class="modal">
        <div class='m_inner'>
          <h3>${title}</h3>
          <img src="${img_url}" alt="">
          <span>${n}/${total_n}</span>
          <i class="fas fa-times c_btn"></i>
          <i class="fas fa-angle-left"></i>
          <i class="fas fa-angle-right"></i>
        </div>
      </div>
    `;
    // body뒤에 모달내용을 출력한다.
    $('body').append(modal);
    // return false;
    // 좌우버튼 클릭시 '이미지' '타이틀' '페이지번호 변경
    const l_btn = $('.modal i.fa-angle-left');
    const r_btn = $('.modal i.fa-angle-right');
    l_btn.click(function(){
      // 1씩 감소
      if(n==1){
        n=total_n;
      }else{
        n--;
      }
      // 숫자변경, 타이틀 제목변경, 이미지 변경 함수
      dataChange(n);
    });
    r_btn.click(function(){
      // 1씩 증가
      if(n==total_n){
        n=1;
      }else{
        n++;
      }
      // 숫자변경, 타이틀 제목변경, 이미지 변경 함수
      dataChange(n);
    });
    let dataChange = (i)=>{
      title = g_img.eq(i-1).attr('title');
      // title = $('.g_list li').eq(i-1).find('.caption').text();
      // 1. 페이지번호 <span>$(i)/${total_n}</span>
      $('.modal span').text(`${i}/${total_n}`);
      // 2. 타이틀 제목
      $('.modal h3').text(title);
      // 3. 이미지 태그에 해당 번호를 삽입하여 이미지 변경하기
      // 방법 1. 이미지 주소값을 가져와서 이미지 변경
      img_url = g_img.eq(i-1).attr('href');
      $('.modal img').attr('src',img_url);
      // 방법 2. 변수값을 사용하여 구현
      // if(i==4||i==9||i==11){
      //   // 만약에 i가 4, 9, 11일때만 아래 내용 적용한다.
      //   $('.modal img').attr('src','./images/img'+i+'.png');
      // }else{
      //   $('.modal img').attr('src','./images/img'+i+'.jpg');
      // }
    }
    // 닫기 버튼 클릭시 모달을 숨겨라
    $('.modal .c_btn').click(function(){
      // alert('click');
      $('.modal').fadeOut();
    })
  });
});