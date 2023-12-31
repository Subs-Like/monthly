package com.example.monthly.mapper;

import com.example.monthly.dto.DeliveryDto;
import com.example.monthly.dto.KakaoDto;
import com.example.monthly.dto.SubsDto;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
class OrderMapperTest {

    @Autowired
    private OrderMapper orderMapper;

    private DeliveryDto deliveryDto;
    private SubsDto subsDto =new SubsDto();
    private KakaoDto kakaoDto = new KakaoDto();

    @Autowired
    void setUp(){
        deliveryDto = new DeliveryDto();
        deliveryDto.setDeliveryPostcode("강남");
        deliveryDto.setDeliveryAddress1("평택시");
        deliveryDto.setDeliveryAddress2("서정동");
        deliveryDto.setUserNumber(1L);
    }

    @Test
    void insert() {
        orderMapper.insert(deliveryDto);

        assertThat(orderMapper.select(deliveryDto.getUserNumber()).getDeliveryAddress2()).isEqualTo(deliveryDto.getDeliveryAddress2());
    }

    @Test
    void select() {
    }

    @Test
    void update() {
        orderMapper.insert(deliveryDto);

        deliveryDto.setDeliveryPostcode("강서");
        orderMapper.update(deliveryDto);
        assertThat(orderMapper.select(deliveryDto.getUserNumber()).getDeliveryPostcode()).isEqualTo("강서");
    }

    @Test
    void subsInsert(){
        subsDto.setUserNumber(1L);
        subsDto.setProductNumber(1L);
        orderMapper.subsInsert(subsDto);

        SubsDto subs =  orderMapper.subsSelect(subsDto.getUserNumber() ,subsDto.getProductNumber());

        assertThat(subs.getProductNumber()).isEqualTo(subsDto.getProductNumber());
    }

    @Test
    void subsSelect(Long userNumber, Long productNumber){
        subsDto.setProductNumber(1L);
        subsDto.setUserNumber(1L);
        orderMapper.subsInsert(subsDto);

    }


}