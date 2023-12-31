import  * as parcel from '../module/parcel.js';

let page = 1;
let searchInput = '';
let searchSelect = '';
let period = '';
let productStatus ='';

$(function (){
    searchInput = $('.search-input').val();
    searchSelect = $('.search-dropdown').val();
    period = $('input[name="period"]:checked').val();
    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect,
        "period":period,
        "productStatus":productStatus
    }
    console.log(searchVo);
    $('.selected-period').text(period);
    parcel.findParcelList(searchVo,showParcel);
})

function showError(a,b,c){ console.error(c);}

//주문리스트 띄우기 + 페이징버튼 처리
function showParcel(map) {
    if (map.parcelList.length == 0) {
        $('.empty').removeClass('none');
    } else {
        $('.empty').addClass('none');}

    let text = '';
    map.parcelList.forEach(parcel => {
            text += `
     <tr class="list">
            <form action="#">
            <td class="parcel-number">${parcel.parcelNumber}</td>
            <td>${parcel.parcelDate}</td>
            <td>
              <select name="parcel-status" id="parcel-status">
              ${parcel.parcelStatus == 0 ? '<option value="0" selected>배송준비</option>' : '<option value="0">배송준비</option>'}  
              ${parcel.parcelStatus == 1 ? '<option value="1" selected>배송중</option>' : '<option value="1">배송중</option>'}  
              ${parcel.parcelStatus == 2 ? '<option value="2" selected>배송완료</option>' : '<option value="2">배송완료</option>'}  
              </select>
            </td>
            <td>${parcel.productName}<br>옵션 : ${parcel.productOption}</td>
            <td>${parcel.paymentPrice}</td>
            ${parcel.paymentStatus == 0 ? '<td>미결제</td>' : '<td>결제완료</td>'}
            <td>${parcel.userName}</td>
            <td>${parcel.userPhoneNumber}</td>
            <td>${parcel.deliveryAddress1 + parcel.deliveryAddress2 + parcel.deliveryPostcode}</td>
            <td>
                <select name="parcel-company" id="parcel-company">
                ${parcel.parcelCompany == 'epost' ? '<option value="epost" selected>우체국</option>' : '<option value="epost">우체국</option>>'}
                ${parcel.parcelCompany == 'cj' ? '<option value="cj" selected>CJ대한통운</option>' : '<option value="cj">CJ대한통운</option>>'}
                ${parcel.parcelCompany == 'hanjin' ? '<option value="hanjin" selected>한진택배</option>' : '<option value="hanjin">한진택배</option>'}
                ${parcel.parcelCompany == 'lotte' ? '<option value="lotte" selected>롯데택배</option>' : '<option value="lotte">롯데택배</option>'}
                ${parcel.parcelCompany == 'logen' ? '<option value="logen" selected>로젠택배</option>' : '<option value="logen">로젠택배</option>'}
                </select>
              </td>
              <td><input type="text" placeholder="운송장" class="search-input parcel-invoice" name="search-input" value="${parcel.parcelInvoice}"></td>
              <td><button type="button" class="save-btn parcel-save">save</button></td>
            </form>
          </tr>
`;
        });
        //페이지버튼
        let pageBox = '';
        if (map.pageVo.prev == true) {
            pageBox += `
      <a>
          <li class="page-num prev" value="${map.pageVo.startPage - 1}>&lt</li>
        </a>
      `;
        }
        for (let i = map.pageVo.startPage; i <= map.pageVo.endPage; i++) {
            if (i == map.pageVo.criteria.page) {
                pageBox += `
          <a>
          <li class="page-num active">${i}</li>
          </a>
          `;
            } else {
                pageBox += `
          <a><li class="page-num">${i}</li></a>
          `;
            }
        }
        if (map.pageVo.next == true) {
            pageBox += `
      <a><li class="page-num next" value="${map.pageVo.endPage + 1}">&gt</li></a>
      `;
        }
        $('.parcel-list-body').html(text);
        $('.page-box').html(pageBox);
        $('.selected-period').text(period);
    }

//페이지버튼을 눌렀을 때
$('.page-box').on('click','.page-num',function(){

   if($(this).hasClass('next')){
       return;
   }
   if($(this).hasClass('prev')){
       return;
   }
   let page = $(this).text();

    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect,
        "period":period,
        "productStatus":productStatus
    }
    parcel.findParcelList(searchVo,showParcel);
    $('.selected-period').text(period);

});
// 이전버튼 눌렀을 때
$('.page-box').on('click','.prev',function(){
   let page=$(this).val();
    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect,
        "period":period,
        "productStatus":productStatus
    }
    parcel.findParcelList(searchVo,showParcel);
    $('.selected-period').text(period);
});
//다음버튼 눌렀을 때
$('.page-box').on('click','.next',function(e){
    e.preventDefault();
    let page=$(this).val();
    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect,
        "period":period,
        "productStatus":productStatus
    }
    parcel.findParcelList(searchVo,showParcel);
    $('.selected-period').text(period);
});

// 주문상태를 변경하고 저장버튼을 누르기 전
$('.parcel-list-body').on('change', '.list', function(){
    console.log(this);
    $(this).find('.parcel-save').css("background-color","#c88e8e");
});

// 주문정보 변경하고 저장버튼 눌렀을 때
$('.parcel-list-body').on('click','.parcel-save',function(){
    let $list = $(this).parents('.list');
    let parcelDto = {
        "parcelNumber":$list.find('.parcel-number').text(),
        "parcelStatus":$list.find('#parcel-status').val(),
        "parcelCompany":$list.find('#parcel-company').val(),
        "parcelInvoice":$list.find('.parcel-invoice').val()
    }
    console.log(parcelDto);
    parcel.modifyParcel(parcelDto);
    $(this).css("background-color","#8eb4c8")
});




//===================검색=================
let $search = $('.search-btn');
$search.on('click', function (){
    console.log('클릭할게요');
    searchInput = $('.search-input').val();
    searchSelect = $('.search-dropdown').val();
    period = $('input[name="period"]:checked').val();
    productStatus = $('input[name="product-status"]:checked').val();
    let searchVo ={
        "page":page,
        "searchInput":searchInput,
        "searchSelect":searchSelect,
        "period":period,
        "productStatus":productStatus
    }
    console.log(searchVo);

    parcel.findParcelList(searchVo,showParcel);
    $('.selected-period').text(period);
    $('.search-input').val('');
});

