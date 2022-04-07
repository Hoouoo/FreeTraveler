package team.capstonelongstone.freetraveler.account;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.capstonelongstone.freetraveler.account.dto.AccountRequestDto;

@Controller
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/account")
    public void joinAccount(AccountRequestDto accountRequestDto) {

        
        accountService.createAccount(accountRequestDto);
    }
}
