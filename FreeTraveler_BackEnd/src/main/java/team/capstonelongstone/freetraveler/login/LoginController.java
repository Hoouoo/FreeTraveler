package team.capstonelongstone.freetraveler.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import team.capstonelongstone.freetraveler.login.dto.LoginDTO;

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
    public ResponseEntity login(LoginDTO loginDTO, HttpServletResponse response, HttpServletRequest request){
        return loginService.login(loginDTO,response,request);
    }

}
