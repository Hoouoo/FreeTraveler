package team.capstonelongstone.freetraveler.account;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.account.domain.RoleType;
import team.capstonelongstone.freetraveler.account.dto.AccountRequestDto;
import team.capstonelongstone.freetraveler.utils.SHA256PasswordEncoder;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor

/**
 * @author 박성호
 * 회원가입 관련 Service
 */
public class AccountService {

    private final AccountRepository accountRepository;

    /**
     * 아이디 중복 조회 <br/>
     * 아이디가 없는 경우 : return true <br/>
     * 아이디가 있는 경우 : return false
     */
    public boolean isUsedId(String userId){
        Account targetUser = accountRepository.findByUserId(userId);
        return Objects.isNull(targetUser);
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

    public ResponseEntity createAccount(AccountRequestDto accountRequestDto){
        SHA256PasswordEncoder passwordEncoder = new SHA256PasswordEncoder();
        if(isUsedId(accountRequestDto.getUserId())){
            if (isValidPassword(accountRequestDto.getUserPassword())) {
                String targetPassword = passwordEncoder.encode(accountRequestDto.getUserPassword());

                if(targetPassword.equals("405")){
                    return new ResponseEntity("비밀번호 암호화 오류", HttpStatus.BAD_REQUEST);
                }
                Account account = Account.builder().userId(accountRequestDto.getUserId()).userName(accountRequestDto.getUserName())
                        .userPassword(targetPassword).roleType(RoleType.USER).build();
                accountRepository.save(account);
                return new ResponseEntity(accountRequestDto.getUserId(),HttpStatus.OK);
            }else{
                return new ResponseEntity("비밀번호 유효성 오류", HttpStatus.BAD_REQUEST);

            }
        }else{
            return new ResponseEntity("중복되는 아이디", HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 회원 정보 변경
     */
    public ResponseEntity changeAccount(HashMap<String,String> newAccount){
        System.out.println(newAccount.toString());
        String userId = newAccount.get("userId");
        Account byUserId = accountRepository.findByUserId(userId);
        if(Objects.isNull(byUserId)){
            return new ResponseEntity("존재하지 않는 아이디 입니다.", HttpStatus.BAD_REQUEST);
        }
        else{
            SHA256PasswordEncoder passwordEncoder = new SHA256PasswordEncoder();
            String oldPassword = passwordEncoder.encode(newAccount.get("oldPassword"));
            System.out.println(oldPassword);
            if (!byUserId.getUserPassword().equals(oldPassword)){
                return new ResponseEntity("현재 비밀번호와 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
            }

            if(!newAccount.get("password").equals(newAccount.get("passwordConfirm"))){
                return new ResponseEntity("확인 비밀번호와 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
            }
            String pattern = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,20}$";

            if(! Pattern.matches(pattern, newAccount.get("password"))){
                return new ResponseEntity("8자 이상, 영문자, 특수문자, 숫자 포함해야 합니다.", HttpStatus.BAD_REQUEST);
            }
            else{
                byUserId.changeName(newAccount.get("name"));
                byUserId.changePassword(passwordEncoder.encode(newAccount.get("password")));
                accountRepository.save(byUserId);
                return new ResponseEntity("계정 정보가 성공적으로 변경 되었습니다.", HttpStatus.OK);
            }

        }
    }

}
