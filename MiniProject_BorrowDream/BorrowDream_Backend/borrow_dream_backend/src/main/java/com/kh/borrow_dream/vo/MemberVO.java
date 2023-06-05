package com.kh.borrow_dream.vo;


import lombok.Getter;
import lombok.Setter;
import java.sql.Date;

@Getter
@Setter
public class MemberVO {
    private int no;
    private String id;
    private String pwd;
    private String name;
    private String email;
    private String phone;
    private String addr;
    private Date join;
    private int point;
}