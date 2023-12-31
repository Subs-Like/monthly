package com.example.monthly.mapper;

import com.example.monthly.dto.UserDto;
import com.example.monthly.vo.DeliveryVo;
import com.example.monthly.vo.UserVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Mapper
public interface UserMapper {
    // 회원가입
    public void insert(UserVo userVo);
    public void insertAddress(UserVo userVo);

    // 네이버 로그인
    public void insertNaver(UserVo userVo);

    // 카카오 로그인
    public void insertKakao(UserVo userVo);

    // 회원가입 아이디 중복 검사
    public int checkId(String userId);

    // 로그인
    public Long userLogin(@Param("userId")String userId,
                                 @Param("userPassword")String userPassword);

    // api 로그인
    public Long apiUserLogin(@Param("userId") String userId);

   // 아이디 찾기
    public UserVo findId(UserVo userVo);

    // 비밀번호 찾기
    public UserVo findPw(UserVo userVo);


    DeliveryVo selectAll(Long userNumber);

    void updatePassword(UserDto userDto);

    void userWithdraw(Long userNumber);
}
