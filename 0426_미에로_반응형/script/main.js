// 제이쿼리 메인페이지
$(document).ready(function(){
  //1. 변수
  let i = 0; //인덱스값
  let slide = $('.slide_wrapper div');
  let c_btn = $('.lnb li');
  // 탭메뉴 변수
  let t_mnu = $('.tab_con li a');

  //2. 이미지가 변하는 함수
  function fadeInOut(i){
    slide.fadeOut(); //보이는 이미지 전부 숨기고
    c_btn.removeClass('act'); //보이는 모든 act서식을 없앤다
    slide.eq(i).fadeIn(); // 인덱스번호에 해당하는 n번째 이미지가 나옴
    c_btn.eq(i).addClass('act'); //인덱스번호에 해당하는 콘트롤버튼에 서식 적용
  }

  // next 번호를 넘기는 함수
  function main_next(){
    if(i==2){ //만약에 인덱스값이 2라면 = 마지막 이미지라면
      i=0; //인덱스값을 1로 대입하고
    }else{ //그렇지 않으면
      i++; //1씩 더하여 다음 이미지가 나오게한다.
    }
    fadeInOut(i); //이미지를 변경한다
  }
  // prev 번호를 넘기는 함수
  function main_prev(){
    if(i==0){ //만약에 인덱스값이 2라면 = 마지막 이미지라면
      i=2; //인덱스값을 1로 대입하고
    }else{ //그렇지 않으면
      i--; //1씩 더하여 다음 이미지가 나오게한다.
    }
    fadeInOut(i); //이미지를 변경한다
  }

  //3. 매 3초마다 반복실행 => Timer
  let Timer = setInterval(main_next, 3000);

  // 4. lnb 버튼 클릭시 실행
  c_btn.click(function(){
    if(i!=$(this).index()){
      i=$(this).index(); //현재 버튼의 인덱스를 i에 넣고
      fadeInOut(i); //이미지를 변경한다
    }
  });

  // 5. 좌우 버튼 클릭시 실행
  $('.s_btn li:first-child').click(function(){
    main_prev(); // 해당 방향으로 움직이게
  });
  $('.s_btn li:last-child').click(function(){
    main_next(); // 해당 방향으로 움직이게
  });
  // 좌, 우, 콘트롤 버튼에 마우스 아웃시 자동으로 플레이 되도록 한다.
  $('.slide .s_btn li, .slide .lnb li').mouseenter(function(){
    clearInterval(Timer);
  });
  $('.slide .s_btn li, .slide .lnb li').mouseleave(function(){
    clearInterval(Timer);
    Timer = setInterval(main_next, 3000);
  });

  // <3. 탭콘텐츠> 서식
  // 탭메뉴 클릭시 a서식 지우고 내가 클릭한 메뉴만 t_act적용하기
  t_mnu.click(function(){
    $(this).addClass('t_act').parent().siblings().find('a').removeClass('t_act');
    $('.cont').hide(); //보이는 콘텐츠 모두 숨기고
    $(this).next().show(); // 해당 콘텐츠 나오게 한다

    let t_index = $(this).parent().index();
    // console.log(t_index);

    if(t_index==2){
      $('.tab_con_wrap article').height(850);
    }else{
      $('.tab_con_wrap article').height(500);
    }

    return false;
  });

  // <5. 이벤트 슬라이드> 서식
  let e_left_btn = $('.event i.fa-angle-left');
  let e_right_btn = $('.event i.fa-angle-right');
  const eslide = $('.es_wrap');

  // 1번의 앞에 3번이 오도록 위치 잡는다.
  $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');
  eslide.css('margin-left','-100%');

  // 움직이는 함수
  function e_move_left(){
    eslide.animate({'margin-left':'-200%'}, 500, function(){
      $('.es_wrap > div:first-child').insertAfter('.es_wrap > div:last-child');
      eslide.css('margin-left','-100%');
    });
  };

  function e_move_right(){
    eslide.animate({'margin-left':'0%'}, 500, function(){
      $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');
      eslide.css('margin-left','-100%');
    });
  };

  // 시간객체 - 3초마다 함수를 호출
  let eTimer = setInterval(e_move_left, 3000);

  // 버튼 클릭시 각각 해당 함수를 호출
  e_left_btn.click(function(){
    clearInterval(eTimer);
    e_move_left();
  });
  e_right_btn.click(function(){
    clearInterval(eTimer);
    e_move_right();
  });

  // 좌, 우버튼에 미우스 아웃시 다시 자동재생하도록함
  $('.event i.fas').mouseleave(function(){
    clearInterval(eTimer);
    eTimer = setInterval(e_move_left, 3000);
  });
});