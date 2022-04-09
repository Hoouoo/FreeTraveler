package team.capstonelongstone.freetraveler.password;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.login.LoginRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.regex.Pattern;

/**
 * @author 정순범
 * 비밀번호 유효성 검증 및 변경 로직
 */
@Service
public class PasswordService {

    private final LoginRepository loginRepository;

    @Autowired
    public PasswordService (LoginRepository loginRepository){
        this.loginRepository=loginRepository;
    }

    @Transactional
    public ResponseEntity changePassword(HttpServletRequest request, HttpServletResponse response,String password){
        // 영문자, 특수문자, 숫자 포함 8자 이상
        String pattern = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$";

        if(! Pattern.matches(pattern, password)){
            return new ResponseEntity("8자 이상, 영문자, 특수문자, 숫자 포함해야 합니다.", HttpStatus.BAD_REQUEST);
        }
        else{
            HttpSession session = request.getSession();
            Account account = (Account) session.getAttribute("account");
            loginRepository.passwordUpdate(account.getUserId(),password);
            return new ResponseEntity("비밀번호 변경 성공",HttpStatus.OK);
        }
    }
}
