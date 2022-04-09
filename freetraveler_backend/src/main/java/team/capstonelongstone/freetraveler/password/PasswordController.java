package team.capstonelongstone.freetraveler.password;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import team.capstonelongstone.freetraveler.password.PasswordService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author 정순범
 * 비밀번호 변경 요청 컨트롤러
 */
@Controller
public class PasswordController {

    private final PasswordService passwordService;

    @Autowired
    public PasswordController(PasswordService passwordService) {
        this.passwordService = passwordService;
    }

    @PostMapping("changePassword")
    public ResponseEntity changePwdController(HttpServletRequest request, HttpServletResponse response, String password){
        return passwordService.changePassword(request, response, password);
    }

}
