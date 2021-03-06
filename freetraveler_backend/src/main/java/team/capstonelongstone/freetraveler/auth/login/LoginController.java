package team.capstonelongstone.freetraveler.auth.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import team.capstonelongstone.freetraveler.auth.login.dto.LoginDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author 정순범
 * 로그인 컨트롤러
 */
@Controller
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity login(@RequestBody LoginDTO loginDTO, HttpServletResponse response, HttpServletRequest request){
        return loginService.login(loginDTO,response,request);
    }

    /**
     * 로그인 체크 컨트롤러
     */
    @GetMapping("/account/check")
    public ResponseEntity checkLogin(HttpServletRequest request){
        return loginService.checkLogin(request);
    }

}
