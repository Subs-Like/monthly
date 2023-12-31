package com.example.monthly.service.order;

import com.example.monthly.dto.*;
import com.example.monthly.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderMapper orderMapper;

    public DeliveryDto findDelivery(Long userNumber){
        if (userNumber == null) {
            throw  new IllegalArgumentException("회원 번호 누락");
        }
        return orderMapper.select(userNumber);
    }

    public void registerDelivery(DeliveryDto deliveryDto){
        if (deliveryDto == null) {
            throw new IllegalArgumentException("배송지 정보 누락");
        }
        orderMapper.insert(deliveryDto);
    }

    public void changeDelivery(DeliveryDto deliveryDto){
        if (deliveryDto == null) {
            throw new IllegalArgumentException("배송지 정보 누락");
        }
        orderMapper.update(deliveryDto);
    }

    //구독 추가
    public void subsRegister(SubsDto subsDto){
        if (subsDto == null) {
            throw new IllegalArgumentException("구독 정보 누락");
        }

        orderMapper.subsInsert(subsDto);
    }

//    카카오결제 정보 추가
    public void kakapayRegister(KakaoDto kakaoDto){
        if (kakaoDto == null) {
            throw new IllegalArgumentException("카카오 결제 정보 누락");
        }
        orderMapper.kakaoPay(kakaoDto);
    }

//    카드 정보 추가
    public void cardRegister(CardDto cardDto){
        if (cardDto == null) {
            throw new IllegalArgumentException("카드정보 누락");
        }
        orderMapper.cardInsert(cardDto);
    }

    //결제 정보 추가
    public void paymentRegister(PaymentDto paymentDto){
        if (paymentDto == null) {
            throw new IllegalArgumentException("결제 정보 누락");
        }
        orderMapper.paymentInsert(paymentDto);
    }

//    배송주문 추가
    public void parcelRegister(ParcelDto parcelDto){
        if (parcelDto == null) {
            throw new IllegalArgumentException("배송주문 정보 누락");
        }

        orderMapper.parcelInsert(parcelDto);
    }

    //구독 정보 회원 번호,상품 번호로 조회
    @Transactional(readOnly = true)
    public SubsDto subsFindAll(Long userNumber, Long productNumber){
        if (userNumber == null) {
            throw new IllegalArgumentException("회원 번호 누락");
        }
        if (productNumber == null){
            throw new IllegalArgumentException("상품 번호 누락");
        }
        return orderMapper.subsSelect(userNumber,productNumber);

    }

    //같은 회원 번호로 카드 번호 결제 번호 조회
    public Long payCardFind(Long productNumber,Long userNumber){
        if (productNumber == null) {
            throw new IllegalArgumentException("회원 번호 누락");
        }

        return orderMapper.payCardSelect(productNumber,userNumber);
    }



}
