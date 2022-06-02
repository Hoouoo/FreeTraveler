package team.capstonelongstone.freetraveler.account;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.account.dto.AccountRequestDto;
import team.capstonelongstone.freetraveler.auth.login.dto.LoginDTO;
import team.capstonelongstone.freetraveler.interceptor.CheckSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 박성호,정순범
 * 회원가입 관련 Controller
 */
@Controller
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/account")
    public ResponseEntity joinAccount(@RequestBody AccountRequestDto accountRequestDto) {
        return accountService.createAccount(accountRequestDto);
    }

    @GetMapping("/account")
    @ResponseBody
    public ResponseEntity getAccount(HttpServletRequest request){
        HttpSession session=request.getSession();
        Account account = (Account) session.getAttribute("account");

        Map retAccount=new HashMap<String, String>(); //JSON변환
        retAccount.put("id",account.getUserId());
        retAccount.put("name",account.getUserName());
        return new ResponseEntity(retAccount, HttpStatus.OK);
    }

    @CheckSession
    @PostMapping("/account/change")
    public ResponseEntity changeAccount(@RequestBody HashMap<String,String> newAccount){
        return accountService.changeAccount(newAccount);
    }

}
