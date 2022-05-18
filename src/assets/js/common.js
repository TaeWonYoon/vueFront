/* $.browser = {};
(function() {
    jQuery.browser.msie = false;
    $.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        $.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})(); */


/**
 * datepicker setting
 *
 */

/* $.datepicker.regional['ko'] = {
    dateFormat: 'yy.mm.dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    defaultDate: $.datepicker.formatDate('yy.mm.dd', new Date()),
    changeMonth: true,
    changeYear: true,
    yearRange: 'c-60:c+1',
    showButtonPanel: true,
    currentText: "today",
    closeText: 'close'
};
$.datepicker.setDefaults($.datepicker.regional['ko']); */



/**
 * 폼 요소 값이 비어있는지 체크하고 비어있으면 메시지를 표시한다.
 *
 * @param
 *   arr : 비어있는지 체크할 폼 요소 id, 얼럿 메시지 쌍의 배열
 *     ex) checkNotEmpty[ ["elem1","메시지1"], ["elem2","메시지2"] ] 
 *
 * @return : 값이 비어있는 폼 요소가 하나라도 있으면 false 값이 전부 입력된 경우 true
 */
function checkNotEmpty(arr) {

    for (var i = 0, len = arr.length; i < len; i++) {

        var elem = document.getElementById(arr[i][0]);
        if (elem.length <= 0) {
            continue;
        }
        var elemValue = elem.value;
        var alertMsg = arr[i][1];

        if (elemValue == "") {
            alert(alertMsg);
            elem.focus();
            return false;
        }

        /* var $elem = $('#' + arr[i][0]);
        if ($elem.length <= 0) { //not exist
            continue;
        }
        var elemValue = $.trim($elem.val());
        var alertMsg = arr[i][1];

        if (elemValue == "") {
            swal(alertMsg);
            $elem.focus();
            return false;
        } */
    }

    return true;
}

/**
 * 셀렉트박스 선택 하지 않았으면 (value 값) 메시지를 표시한다.
 *
 * @param
 *   arr : 비어있는지 체크할 폼 요소 id, 얼럿 메시지 쌍의 배열
 *     ex) checkNotValue[ ["elem1","메시지1"], ["elem2","메시지2"] ] 
 *
 * @return : 값이 비어있는 폼 요소가 하나라도 있으면 false 값이 전부 입력된 경우 true
 */
function checkNotValue(arr, value) {

    for (var i = 0, len = arr.length; i < len; i++) {

        var $elem = $('#' + arr[i][0]);
        if ($elem.length <= 0) { //not exist
            continue;
        }
        var elemValue = $.trim($elem.val());
        var alertMsg = arr[i][1];

        if (elemValue == value || elemValue == "") {
            swal(alertMsg);
            $elem.focus();
            return false;
        }
    }

    return true;
}

/**
 * 체크박스 선택 하지 않았으면 (value 값) 메시지를 표시한다.
 *
 * @param
 *   arr : 비어있는지 체크할 폼 요소 id, 얼럿 메시지 쌍의 배열
 *     ex) checkNotValue[ ["elem1","메시지1"], ["elem2","메시지2"] ] 
 *
 * @return : 값이 비어있는 폼 요소가 하나라도 있으면 false 값이 전부 입력된 경우 true
 */
function checkNotCheckBox(arr) {

    for (var i = 0, len = arr.length; i < len; i++) {

        var $elem = $('#' + arr[i][0]);
        if ($elem.length <= 0) { //not exist
            continue;
        }
        var elemValue = $elem.is(":checked");
        var alertMsg = arr[i][1];

        if (!elemValue) {
            swal(alertMsg);
            $elem.focus();
            return false;
        }
    }

    return true;
}


/**
 * 텍스트 박스에 숫자만 입력
 * onKeyDown으로만 사용 가능
 * 예) <input type="text" style="ime-mode: disabled;" onkeydown="fFilterNumber(event);">
 * 
 * @param  event Key 이벤트
 * @return true, false
 */
function fFilterNumber(event) {



    var code = event.keyCode;
    console.log('keyCode...' + code);

    // 숫자 허용
    if (code > 47 && code < 58) return;

    // 숫자 허용(숫자 패드)
    if (code > 95 && code < 106) return;

    // 단축키 허용
    if (event.ctrlKey || event.altKey) return;

    // 주요 특수키 허용
    if (code === 9 || code === 36 || code === 35 || code === 37 ||
        code === 39 || code === 8 || code === 46) return;

    return event.preventDefault();
}


/**
 * 텍스트 박스에 영문, 숫자만 입력
 * onKeyDown으로만 사용 가능
 * 예) <input type="text" style="ime-mode:disabled;" onkeydown="fFilterAlphaNumber(event);">
 * 
 * @param  event Key 이벤트
 * @return true, false
 */
function fFilterAlphaNumber(event) {
    var code = event.keyCode;

    // 영문 허용
    if (code >= 65 && code <= 90) return;

    // 숫자 허용
    if (code >= 48 && code <= 57) return;

    // 숫자 허용(숫자 패드)
    if (code > 95 && code < 106) return;

    // 단축키 허용
    if (event.ctrlKey || event.altKey) return;

    // 주요 특수키 허용
    if (code === 9 || code === 36 || code === 35 || code === 37 ||
        code === 39 || code === 8 || code === 46) return;

    return event.preventDefault();
}

/**
 * 텍스트 박스에 입력된 값이 날짜 형식인지 체크 한다
 * onKeyDown 또는 onKeyUp으로 사용 가능
 * 예) <input type="text" onKeyUp="javascript:g_fFilterDate(this);">
 * 확장 예)<input type="text" maxlength="10" onKeyDown="javascript:fFilterNumber(event);" onKeyUp="javascript:g_fFilterDate(this);" />
 * @param  this object
 * @return -
 */
function g_fFilterDate(obj) {

    var str = $(obj).val().replace(/[^\d]+/g, '');
    var strLen = str.length;

    if (strLen >= 5 && strLen <= 6) {
        $(obj).val(str.substr(0, 4) + "-" + str.substr(4, 2));
    } else if (strLen > 6) {
        $(obj).val(str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + str.substr(6, 2));
    }

    if (strLen == 8) {
        /*var format = /^(19[5-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;*/
        var format = /^(19[7-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

        if (!format.test(str)) {
            swal("날짜 형식이 맞지 않습니다.");
            $(obj).focus();
        }
    }
}


/**
 * 텍스트 박스에 입력된 값이 날짜 형식인지 체크 한다
 * onKeyDown 또는 onKeyUp으로 사용 가능
 * 예) <input type="text" onKeyUp="javascript:g_fFilterDate(this);">
 * 확장 예)<input type="text" maxlength="10" onKeyDown="javascript:fFilterNumber(event);" onKeyUp="javascript:g_fFilterDate(this);" />
 * @param  this object
 * @return -
 */
function g_fCheckDateFormat(value) {

    var str = value.replace(/[^\d]+/g, '');
    var strLen = str.length;

    if (strLen == 8) {
        var format = /^(19[5-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
        return format.test(str);
    } else {
        return false;
    }
}



/**
 * replace
 * @param  str, 바꿀대상문자, 바꾼 문자  
 * @return str
 */
function replaceAll(str, searchStr, replaceStr) {
    if (str == null) {
        return "";
    }
    return str.split(searchStr).join(replaceStr);
}

/**
 * replace
 * @param  바꿀대상문자  
 * @return 콤마문자
 */
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
/**
 * replace
 * @param  바꿀대상문자  
 * @return 콤마제거문자
 */
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

/**
 * replace
 * @return 값입력시 콤마 찍기 onkeyup="inputNumberFormat(this);"
 */
function inputNumberFormat(obj) {
    obj.value = comma(uncomma(obj.value));
}

/**
 * Serialize form 값 변경
 * @param  form, value, changevalue  
 * @return value
 */
function changeSerialize(values, k, v) {
    var found = false;
    for (i = 0; i < values.length && !found; i++) {
        if (values[i].name == k) {
            values[i].value = v;
            found = true;
        }
    }
    if (!found) {
        values.push({
            name: k,
            value: v
        });
    }
    return values;
}

/**
 * 파일 사이즈 포멧
 * @param bytes
 * @returns {String}
 */
function g_fFormatSizeUnits(bytes) {
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + ' GB'; } else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + ' MB'; } else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + ' KB'; } else if (bytes > 1) { bytes = bytes + ' bytes'; } else if (bytes == 1) { bytes = bytes + ' byte'; } else { bytes = '0 byte'; }
    return bytes;
}


/**
 * 로그아웃
 * @param
 * @returns 
 */
function fLogOut() {
    location.href = "/loginOut.do";
}


/**
 * 파일내용 팝업으로 보기
 * @param file url, param
 * @returns
 */
function fShowPopupImg(url, param) {
    //form 생성
    var targetFrm = 'popForm';
    var frmHtml = [];
    frmHtml.push('<form id="' + targetFrm + '" name="' + targetFrm + '" action="' + url + '" >');
    _.each(param, function(v, k) {
        frmHtml.push('<input type="hidden" name="' + k + '" value="' + v + '" />');
    });
    frmHtml.push('</form>');
    $('#' + targetFrm).remove(); //기존에 있는 form 이 있다면 삭제
    $('body').append(frmHtml.join(""));

    var pop_title = "showPopup";
    var width = 450;
    var height = 450;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var myWin = window.open('', pop_title, "left=" + left + ",top=" + top);

    myWin.focus();
    var frmData = document.popForm;
    frmData.method = "POST";
    frmData.target = pop_title;
    frmData.submit();
}

/**
 * 이미지사이즈로 팝업창을 resize
 * @param param
 * @returns
 */
function fOnloadImg(param) {
    var resultCallback = function(data) {
        fOnloadImgResult(data);
    };
    callAjax("/image/selectImgSize.do", "post", "json", false, param, resultCallback);
}
/**
 * fOnloadImg 콜백함수
 * @param data
 * @returns
 */
function fOnloadImgResult(data) {
    var width = data.width;
    var height = data.height;
    if (width >= screen.width) {
        width = screen.width;
    }
    if (height >= screen.height) {
        height = screen.height;
    }
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var OpenWindow = window.open('', 'showPopup', 'left=' + left + ',top=' + top + ',width=' + width + ', height=' + height + ', menubars=no, scrollbars=auto');
    OpenWindow.document.title = "fOnloadImgResult";
    OpenWindow.document.write("<style>body{margin:0px;}</style><img src='/image/showImg.do?fileName=" + data.url + "'>");
    OpenWindow.document.write("<title>onloadImage</title>");
}

/**
 * saveCookie
 * 쿠키 정보 저장
 * @param name, id
 */
function saveCookie(name, id, day) {
    if (id != "") {
        // userid 쿠키에 id 값을 7일간 저장
        setSave(name, id, day);
    } else {
        // userid 쿠키 삭제
        setSave(name, id, -1);
    }
}

/**
 * setSave
 * Cookie에 value를 저장
 * @param name
 * @param value
 * @param expiredays
 */
function setSave(name, value, expiredays) {
    var today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString() + ";"
}

/**
 * getCookie
 * 쿠키값을 가져온다.
 * @returns {String}
 */
function getCookie(name) {
    // userid 쿠키에서 id 값을 가져온다.
    var cook = document.cookie + ";";
    var idx = cook.indexOf(name, 0);
    var val = "";

    if (idx != -1) {
        cook = cook.substring(idx, cook.length);
        begin = cook.indexOf("=", 0) + 1;
        end = cook.indexOf(";", begin);
        val = unescape(cook.substring(begin, end));
    }
    return val;
}

/**
 * fChkId
 * 아이디는 영문, 숫자를 포함한 7자리이상 20자리 미만의 값 만 가질수 있다.
 * @param value
 * @returns boolean
 * 
 */
function fChkId(tmp) {

    if (tmp.length < 7 || tmp.length >= 20) { //7자리이상 20자리 미만의 값
        return false;
    }

    var tmp2 = /[a-z]|[0-9]/gi; // 정규식 - 알파벳과 숫자만 지정
    tmp = tmp.replace(tmp2, ''); // 지정한 정규식에서 알파벳과 숫자만 공백으로 바꾼다
    if (tmp != '') {
        return false;
    }
    return true;
}

/** 우편번호 찾기 powered by DAUM */
function fOpenWinZipCod(id, zcd, adrs, dtlAdrs) {


    if (zcd == null || zcd == undefined || zcd == "") {
        zcd = "zcd";
    }

    if (adrs == null || adrs == undefined || adrs == "") {
        adrs = "adrs";
    }

    if (dtlAdrs == null || dtlAdrs == undefined || dtlAdrs == "") {
        dtlAdrs = "dtl_adrs";
    }


    // 우편번호 찾기 화면을 넣을 element
    var element_layer = document.getElementById(id);
    new daum.Postcode({
        oncomplete: function(data) {

            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullAddr = data.address; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수


            // 기본 주소가 도로명 타입일때 조합한다.
            if (data.addressType === 'R') {
                //법정동명이 있을 경우 추가한다.
                if (data.bname !== '') {
                    extraAddr += data.bname;
                }
                // 건물명이 있을 경우 추가한다.
                if (data.buildingName !== '') {
                    extraAddr += (extraAddr !== '' ? ', ' +
                        data.buildingName : data.buildingName);
                }
                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                fullAddr += (extraAddr !== '' ? ' (' + extraAddr +
                    ')' : '');
            }

            if (id == "zipFrame") {
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById(zcd).value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById(adrs).value = fullAddr;
                document.getElementById(dtlAdrs).value = '';
                document.getElementById(dtlAdrs).focus();
                //document.getElementById('sample2_addressEnglish').value = data.addressEnglish;
            } else {
                document.getElementById("nmpsido").value = data.sido;
                document.getElementById("nmpgugun").value = data.sigungu;
            }
            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            $('#' + id).hide();

        },
        width: '100%',
        height: '100%',
        maxSuggestItems: 5
    }).embed(element_layer);

    // iframe을 넣은 element를 보이게 한다.
    $('#' + id).show();

    // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
    initLayerPosition(id);
}

function closeDaumPostcode(id) {
    // iframe을 넣은 element를 안보이게 한다.
    $('#' + id).hide();
}

// 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
// resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
// 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
/* function initLayerPosition(id){
    var width = 400; //우편번호서비스가 들어갈 element의 width
    var height = 500; //우편번호서비스가 들어갈 element의 height
    var borderWidth = 3; //샘플에서 사용하는 border의 두께

    // 위에서 선언한 값들을 실제 element에 넣는다.
    $('#' + id).css('width',width + 'px');
    $('#' + id).css('height',height + 'px');
    $('#' + id).css('border',borderWidth + 'px solid');
    // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
    $('#' + id).css('left',(((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px');
    $('#' + id).css('top',(((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px');
}
 */


/**
 * fConverDateString
 * @return 날짜 형식 return"
 */
function fConverDateString(dt, gbn) {
    return dt.getFullYear() + gbn + fAddZero(eval(dt.getMonth() + 1)) + gbn + fAddZero(dt.getDate());
}
/**
 * fAddZero
 * @return 1자리수 날앞에 0 붙이기"
 */
function fAddZero(i) {
    var rtn = i + 100;
    return rtn.toString().substring(1, 3);
}

/**
 * 정수형 문자열을 숫자로 변환
 * - 숫자를 제외한 모든 문자 삭제 후 변환
 * @param str
 * @returns {Number}
 */
function g_fStrToInt(str) {

    var ret;
    ret = parseInt(uncomma(str));
    if (isNaN(ret)) {
        ret = 0;
    }

    return ret;
}