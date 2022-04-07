package team.capstonelongstone.freetraveler.account.dto;

import lombok.Getter;
import lombok.Setter;
import team.capstonelongstone.freetraveler.account.domain.RoleType;

@Getter
@Setter
public class AccountRequestDto {

    String userId;
    String userPassword;
}

