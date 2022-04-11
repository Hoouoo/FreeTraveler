package team.capstonelongstone.freetraveler.auth.logout;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @author 정순범
 * 로그아웃 컨트롤러
 */
@Controller
public class LogoutController {

    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.removeAttribute("account"); //account 세션 삭제
        return new ResponseEntity("로그아웃 성공", HttpStatus.OK);
    }

}
