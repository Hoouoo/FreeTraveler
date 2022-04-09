package team.capstonelongstone.freetraveler.account.dto;

import lombok.Getter;
import lombok.Setter;
import team.capstonelongstone.freetraveler.account.domain.RoleType;

/**
 * @author 박성호
 * 회원가입 관련 요청 Dto
 */
@Getter
@Setter
public class AccountRequestDto {

    String userId;
    String userPassword;
}

