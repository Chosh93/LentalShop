package com.kh.borrow_dream.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.kh.borrow_dream.common.Common;
import com.kh.borrow_dream.vo.MemberVO;

public class MemberDAO {
    private Connection conn = null;
    private Statement stmt = null;
    private ResultSet rs = null;
    private PreparedStatement pStmt = null;

    // 회원 여부 확인
    public boolean regMemberCheck(String id){
        boolean isNotReg = false;
        try {
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM 회원정보 WHERE CUS_ID = " + "'" + id + "'";
            rs = stmt.executeQuery(sql);
            if(rs.next()) isNotReg = false;
            else isNotReg = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(rs);
        Common.close(pStmt);
        Common.close(conn);
        return isNotReg; // 가입되어 있으면 false, 가입 안되어 있으면 true
    }
    
    // 로그인 체크
    public boolean loginCheck(String id, String pwd) {
        try {
            conn= Common.getConnection();
            stmt = conn.createStatement(); // Statement 객체 얻기
            String sql = "SELECT * FROM 회원정보 WHERE CUS_ID = " + "'" + id + "'";
            rs = stmt.executeQuery(sql);

            while(rs.next()) { // 읽을 데이터가 있으면 true
                String sqlId = rs. getString("CUS_ID"); // 쿼리문 수행 결과에서 ID값 가져옴
                String sqlPwd = rs. getString("CUS_PW");
                System.out.println("ID : " + sqlId);
                System.out.println("PWD : " + sqlPwd);
                if(id.equals((sqlId)) && pwd.equals(sqlPwd)) {
                    Common.close(rs);
                    Common.close(stmt);
                    Common.close(conn);
                    return true;
                }
            }
            Common.close(rs);
            Common.close(pStmt);
            Common.close(conn);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    // 회원정보 조회
    public List<MemberVO> memberSelect(String getid) {
        List<MemberVO> list = new ArrayList<>();
        try {
            System.out.println(getid);
            conn = Common.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM 회원정보 WHERE CUS_ID = '" + getid + "'";
            rs = stmt.executeQuery(sql);

            while(rs.next()) {
                int no = rs.getInt("CUS_NO");
                String id = rs.getString("CUS_ID");
                String pwd = rs.getString("CUS_PW");
                String name = rs.getString("CUS_NAME");
                String phone = rs.getString("CUS_TEL");
                String addr = rs.getString("CUS_ADDR");
                String email = rs.getString("CUS_EMAIL");
                Date join = rs.getDate("CUS_REGIDATE");
                int point = rs.getInt("CUS_POINT");

                MemberVO vo = new MemberVO();
                vo.setNo(no);
                vo.setId(id);
                vo.setPwd(pwd);
                vo.setName(name);
                vo.setPhone(phone);
                vo.setAddr(addr);
                vo.setEmail(email);
                vo.setJoin(join);
                vo.setPoint(point);
                list.add(vo);
            }
        
            Common.close(rs);
            Common.close(stmt);
            Common.close(conn);
        } catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }
    // 회원 가입
    public boolean memberRegister(String id, String pwd, String name, String mail) {
        int result = 0;
        String sql = "INSERT INTO 회원정보(CUS_NO, CUS_ID, CUS_PW, CUS_NAME, CUS_TEL, CUS_ADDR, CUS_EMAIL, CUS_REGIDATE, CUS_POINT) VALUES(?, ?, ?, ?, SYSDATE)";
        try {
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, id);
            pStmt.setString(2, pwd);
            pStmt.setString(3, name);
            pStmt.setString(4, mail);
            result = pStmt.executeUpdate();
            System.out.println("회원 가입 DB 결과 확인 : " + result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Common.close(pStmt);
        Common.close(conn);
        
        if(result == 1) return true;
        else return false;
    }

    public boolean memberDelete(String id) {
        int result = 0;
        String sql = "DELETE FROM 회원정보 WHERE CUS_ID = ?";
        try {
            conn = Common.getConnection();
            pStmt = conn.prepareStatement(sql);
            pStmt.setString(1, id);
            result = pStmt.executeUpdate();
        } catch(Exception e){
            e.printStackTrace();
        }
        Common.close(pStmt);
        Common.close(conn);

        if(result == 1) return true;
        else return false;
    }
}
