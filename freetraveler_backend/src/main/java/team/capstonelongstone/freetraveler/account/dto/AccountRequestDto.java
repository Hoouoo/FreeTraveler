package team.capstonelongstone.freetraveler.account.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import team.capstonelongstone.freetraveler.account.domain.RoleType;

/**
 * @author 박성호
 * 회원가입 관련 요청 Dto
 */
@Data
public class AccountRequestDto {

    String userId;
    String userPassword;
    String userName;

    @JsonCreator
    @Builder
    public AccountRequestDto(@JsonProperty("userId") String userId,
                             @JsonProperty("userPassword") String userPassword,
                             @JsonProperty("userName") String userName) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.userName = userName;
    }
}

