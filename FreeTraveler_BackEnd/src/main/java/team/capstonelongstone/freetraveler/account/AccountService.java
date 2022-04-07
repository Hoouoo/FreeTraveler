package team.capstonelongstone.freetraveler.account;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.account.domain.RoleType;
import team.capstonelongstone.freetraveler.account.dto.AccountRequestDto;

import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor

/**
 * @author 박성호
 * 설명~~~
 */
public class AccountService {

    private final AccountRepository accountRepository;

    /**
     * 아이디 중복 조회
     */
    public boolean isUsedId(String userId){
        String targetUserId = accountRepository.findByUserId(userId).getUserId();

        if (Objects.isNull(targetUserId)) {
            return true;
        }
        return false;
    }

    /**
     * 입력한 비밀번호 유효성 체크
     */
    public boolean isValidPassword(String password){

        // 영문자, 특수문자, 숫자 포함 8자 이상
        String pattern = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$";
        Pattern passwordPattern = Pattern.compile(pattern);
        Matcher matcherPattern = passwordPattern.matcher(password);

        return matcherPattern.find();
    }

    /**
     * 회원가입 기능
     */

    public void createAccount(AccountRequestDto accountRequestDto){

        Account account = Account.builder().userId(accountRequestDto.getUserId())
                .userPassword(accountRequestDto.getUserPassword()).roleType(RoleType.USER).build();
        accountRepository.save(account);

    }
}
