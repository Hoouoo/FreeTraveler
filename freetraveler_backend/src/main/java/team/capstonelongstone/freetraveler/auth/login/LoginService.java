package team.capstonelongstone.freetraveler.auth.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.auth.login.dto.LoginDTO;
import team.capstonelongstone.freetraveler.utils.SHA256PasswordEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @author 정순범
 * 로그인시 입력폼에서 가져올 값 DTO
 */
@Service
public class LoginService {

    private final LoginRepository loginRepository;

    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    /**
     * 로그인 로직
     */
    public ResponseEntity login(@RequestBody LoginDTO loginDTO, HttpServletResponse response, HttpServletRequest request){
        Account account = loginRepository.findByUserId(loginDTO.getUserId());
        SHA256PasswordEncoder passwordEncoder = new SHA256PasswordEncoder();

        Map userId=new HashMap<String,LoginDTO>(); //JSON변환
        userId.put("userId",account.getUserId());

        if (Objects.isNull(account)){ //아이디 없을 때
            return new ResponseEntity("회원 아이디 없음",HttpStatus.BAD_REQUEST);
        }

        else{
             if(passwordEncoder.encode(loginDTO.getUserPassword()).equals(account.getUserPassword())) { //로그인 성공
                HttpSession session=request.getSession();
                session.setAttribute("account",account);
                return new ResponseEntity(userId,HttpStatus.OK); //로그인 성공시 userId 넘김
            }
            else{ //로그인 실패
                return new ResponseEntity("로그인 실패",HttpStatus.BAD_REQUEST);
            }
        }
    }

    /**
     * 로그인 체크 여부 로직
     */
    public ResponseEntity checkLogin(HttpServletRequest request,HttpServletResponse response){
        HttpSession session=request.getSession();
        Account account = (Account) session.getAttribute("account");

        Map userId=new HashMap<String,LoginDTO>(); //JSON변환
        userId.put("userId",account.getUserId());

        if(Objects.isNull(account)){
            return new ResponseEntity("세션이 없습니다.", HttpStatus.valueOf(401));
        }
        else{
            return new ResponseEntity(userId, HttpStatus.OK); //로그인 성공시 userId 넘김
        }

    }
}
