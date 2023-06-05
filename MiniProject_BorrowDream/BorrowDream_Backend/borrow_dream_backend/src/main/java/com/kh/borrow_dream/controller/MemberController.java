package com.kh.borrow_dream.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kh.borrow_dream.dao.MemberDAO;
import com.kh.borrow_dream.vo.MemberVO;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // 8111포트가 아닌 다른 포트 이므로 웹서버에서 차단할 가능성이 있어 3000번 포트는 차단을 제외하겠다라는 의미.
@RestController // Restful api를 사용하는건 RestController로 받겠다.
public class MemberController {

    // GET : 회원 조회
    @GetMapping("/member")
    public ResponseEntity<List<MemberVO>> memberList(@RequestParam String id) {
        MemberDAO dao = new MemberDAO();
        List<MemberVO> list = dao.memberSelect(id); 
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // POST : 로그인
    @PostMapping("/login")
    public ResponseEntity<Boolean> memberLogin(@RequestBody Map<String, String> loginData) {
        String user = loginData.get("id");
        String pwd = loginData.get("pwd");
        MemberDAO dao = new MemberDAO();
        boolean result = dao.loginCheck(user, pwd);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // GET : 가입 여부 확인
    @GetMapping("/check")
    public ResponseEntity<Boolean> memberCheck(@RequestParam String id) {
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.regMemberCheck(id);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }

    // POST : 회원 가입
    @PostMapping("/new")
    public ResponseEntity<Boolean> memberRegister(@RequestBody Map<String, String> regData) {
        String getId = regData.get("id");
        String getPwd = regData.get("pwd");
        String getName = regData.get("name");
        String getMail = regData.get("mail");
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.memberRegister(getId, getPwd, getName, getMail);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }

    // POST : 회원 탈퇴
    @PostMapping("/del")
    public ResponseEntity<Boolean> memberDelete(@RequestBody Map<String, String> delData) {
        String getId = delData.get("id");
        MemberDAO dao = new MemberDAO();
        boolean isTrue = dao.memberDelete(getId);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }
}