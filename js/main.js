var App = {

  //
  // Инициализация
  // -------------------
  Init: function() {
    $(document).ready(function() {
      
      App.Func.slider();                                            // Слайдер новостей
      App.Func.form_valid();                                        // Валидация формы
      App.Func.form_send('#form_parts');                            // Функция отпраки формы
      App.Func.form_send('#form_outfit');                           // Функция отпраки формы
      App.Func.form_send('#form_faq');                              // Функция отпраки формы
      App.Func.menu();                                              // Главное меню
      App.Func.colapse('.faq_item','.faq_question','.faq_answer');  // Раздел faq
      App.Func.map();                                               // Карта
      App.Func.menu_scroll();                                       // Активация пунктов меню при прокрутке
      App.Func.smoof_scroll();                                      // Плавная прокрутка меню

    })
  },


  //
  // Функции
  // -------------------
  Func: {

    smoof_scroll: function() {
      
      $('#menu_out').find('a').smoothScroll({

        offset: -50

      });

    }, // <<<--- / smoof_scroll

    menu_scroll: function() {

      $('body').scrollspy({ 
        target: '.header_inner' ,
        offset: 61
      });

    }, // <<<--- / menu_scroll

    map: function() { 
      ymaps.ready(init);
      
      var myMap, 
          myPlacemark;

      function init(){ 
        myMap = new ymaps.Map("map_wrap", {
          center: [51.84462722, 55.14726491],
          zoom: 15,
        }); 

        
        myPlacemark = new ymaps.Placemark([51.8416,55.1470], {
          hintContent: 'Motoparts.me!',
          balloonContent: 'Наш офис - склад'
        });
        
        myMap.geoObjects.add(myPlacemark);
      }
    }, // <<<--- / map

    colapse: function(wrap, from, to) {
      
      $(from).click(function(event) {
        $(wrap).removeClass('__active');
        $(this)
          .closest(wrap)
          .addClass('__active');
      });

    }, // <<<--- / colapse

    menu: function() {
      var $menu_btn = $('#menu_btn'),
          $menu_out = $('#menu_out');
      $menu_btn.click(function(event) {
        menu_action();
      });
      $menu_out.click(function(event) {
        menu_action();
      });
      $('body').click(function(event) {
        
        if( event.target.id !== 'menu_btn' && event.target.id !== 'menu_out' ) {
          $menu_btn.removeClass('__open');
          $menu_out.removeClass('__open');
        }
        
      });

      function menu_action() {
        $menu_btn.toggleClass('__open');
        $menu_out.toggleClass('__open');
      }

    }, // <<<--- / menu

    slider: function() {
      
      var $slides_node = $('.slides'),
          $slides_arr = $('.slide'),
          count = $slides_arr.size(),                         // кол-во слайдов
          idx = 1,                                            // счетчик слайдов
          SLIDER_DELAY = 5000,                                // заджержка
          SLIDER_DELAY_CLICK = 8000,                          // заджержка при клике
          timer,                                              // указатель на таймер
          $control = $('.control_nav').find('li'),            // выбор слайда
          idx_control,                                        // внутрений счетчик для выбора слайда
          $dir = $('.direction_nav').find('li'),              // следующий / предыдущий слайд
          idx_dir,                                            // внутрений счетчик
          idx_active,
          slide_delay;                                        // время задержки текущего слайда

      var timer = setTimeout(slide, SLIDER_DELAY);

      // обработка выбора слайда
      $control.click(function(event) {
        $control.removeClass('active');
        $(this).addClass('active');
        idx_control = $(this).index();
        
        clearTimeout(timer);
        slide(idx_control);
      });

      // обработка кликов вперед / назад
      $dir.click(function(event) {
        idx_active = $slides_node.children('.active').index();
        if( $(this).hasClass('next') ) {
          ++idx_active >= count ? idx_dir = 0 : idx_dir = idx_active;
        }
        if( $(this).hasClass('before') ) {
          --idx_active < 0 ? idx_dir = count - 1 : idx_dir = idx_active;
        }

        clearTimeout(timer);
        slide(idx_dir, SLIDER_DELAY_CLICK);
      });

      function slide(set_idx, slide_delay) {
        !slide_delay ? slide_delay = SLIDER_DELAY : false;
        set_idx ? idx = set_idx : false;
        $slides_arr.removeClass('active');
        $control.removeClass('active');
        idx >= count ? idx = 0 : false;    
        $($control[idx]).addClass('active');
        $($slides_arr[idx++]).addClass('active');
        
        clearTimeout(timer);
        timer = setTimeout(slide, slide_delay);
      }

    }, // <<<--- / slider news

    form_valid: function() {

      //
      // Правила валидации
      // ---------------------------
      var form_parts = {
        rules: {

          bike_model: {
            required: true,
            minlength: 3,
          },
          parts: {
            required: true,
            minlength: 2,
          },
          contacts: {
            required: true,
          }

        },
        messages: {

          bike_model: {
            required: 'Укажите марку, модель и год выпуска байка',
            minlength: 'Слишком короткое название'
          },
          parts: {
            required: 'Укажите название делали или VIN',
            minlength: 'Слишком короткое название'
          },
          contacts: {
            required: 'Укажите ваш телефонный номер или email'
          }

        },
        errorElement : 'div'
      }

      var form_outfit = {
        rules: {

          type_outfit: {
            required: true,
            minlength: 3,
          },
          contacts: {
            required: true,
          }

        },
        messages: {

          type_outfit: {
            required: 'Укажите тип экипировки или аксессуара',
            minlength: 'Слишком короткое название'
          },
          contacts: {
            required: 'Укажите ваш телефонный номер или email'
          },

        },
        errorElement : 'div'
      }

      var form_faq = {
        rules: {

          question: {
            required: true,
            minlength: 10,
          },
          contacts: {
            required: true,
          }

        },
        messages: {

          question: {
            required: 'Напишите вопрос или пожелание',
            minlength: 'Слишком короткий вопрос'
          },
          contacts: {
            required: 'Укажите ваш телефонный номер или email'
          },

        },
        errorElement : 'div'
      }


      $('#form_parts').validate(form_parts);
      $('#form_outfit').validate(form_outfit);
      $('#form_faq').validate(form_faq);
    }, // <<<--- / form_valid

    form_send : function(form_id) {
      $('body').on('submit', form_id, function(event) {
        event.preventDefault();
        var thisForm = this;
        var dataSend = $(this).serialize();
        var form_action = 'mail.php';  
        var $inputs = $(thisForm).find('.form_control');

        if($(thisForm).find('input.error').length <= 0) {
          $.ajax({  
            type: "POST",
            url: form_action,
            data: dataSend,
            dataType: "json",
            beforeSend : function(){
              $(thisForm).find('input,button').attr('disabled', 'true');
            },
            complete : function(){
              $(thisForm).find('input,button').removeAttr('disabled');
            }
          })  
              .done(function(answer) {
              $(thisForm).prepend('<p class="form_answer __success">' + answer.title + '<br/>' + answer.desc + '</p>');
              $inputs.val('');
          })
              .always(function(answer) {
              $(thisForm).find('.form_answer').fadeOut(10000, function() {
                $(this).remove();
              });

          })  .fail(function() {
              $(thisForm).prepend('<p class="form_answer __error">' + answer.title + '<br/>' + answer.desc + '</p>');
          });
        }     
      });
    },  // <<<--- / form_send

  }

}

App.Init();